/*
 * Axis configuration validator (developer diagnostics)
 * ----------------------------------------------------
 * Lightweight runtime checks for AXIS_CONFIGS consistency.
 * Does not change UI or block app behavior, except when AXIS_CONFIGS is missing.
 */
(function initAxisConfigValidator(global){
  'use strict';

  if (!global.AXIS_CONFIGS) {
    throw new Error('[Axis][ConfigValidator] AXIS_CONFIGS is missing. Ensure js/config-data.js loads before app scripts.');
  }

  const REQUIRED_IDS = ['single', 'stacked', 'bungalow', 'duplex', 'ushape'];
  const REQUIRED_FIELDS = [
    'id', 'displayName', 'dimensionsLabel', 'widthFt', 'lengthFt', 'grossAreaSf',
    'floors', 'bedrooms', 'bathrooms', 'modules', 'moduleCount', 'renderStem', 'blueprintSheets'
  ];

  function axisValidateConfigs() {
    const report = {
      ok: true,
      errors: [],
      warnings: [],
      configs: {}
    };

    const cfgRoot = global.AXIS_CONFIGS;

    if (!cfgRoot || typeof cfgRoot !== 'object') {
      report.ok = false;
      report.errors.push('AXIS_CONFIGS is missing or not an object.');
      return report;
    }

    REQUIRED_IDS.forEach(id => {
      const cfg = cfgRoot[id];
      const cfgReport = { errors: [], warnings: [] };
      report.configs[id] = cfgReport;

      if (!cfg || typeof cfg !== 'object') {
        const msg = `Missing required config: ${id}`;
        cfgReport.errors.push(msg);
        report.errors.push(msg);
        return;
      }

      REQUIRED_FIELDS.forEach(field => {
        const val = cfg[field];
        const missing = val === undefined || val === null || (typeof val === 'string' && val.trim() === '');
        if (missing) {
          const msg = `${id}: missing required field "${field}"`;
          cfgReport.errors.push(msg);
          report.errors.push(msg);
        }
      });

      if (cfg.id && cfg.id !== id) {
        const msg = `${id}: field "id" does not match key (${cfg.id})`;
        cfgReport.errors.push(msg);
        report.errors.push(msg);
      }

      if (!Array.isArray(cfg.modules)) {
        const msg = `${id}: "modules" must be an array`;
        cfgReport.errors.push(msg);
        report.errors.push(msg);
      }

      if (!Array.isArray(cfg.blueprintSheets)) {
        const msg = `${id}: "blueprintSheets" must be an array`;
        cfgReport.errors.push(msg);
        report.errors.push(msg);
      }

      if (cfg.needsReview === true) {
        const msg = `${id}: needsReview=true`;
        cfgReport.warnings.push(msg);
        report.warnings.push(msg);
      }

      if (Array.isArray(cfg.conflicts)) {
        cfg.conflicts.forEach((c, i) => {
          const msg = `${id}: conflict[${i}] ${String(c)}`;
          cfgReport.warnings.push(msg);
          report.warnings.push(msg);
        });
      }
    });

    if (Array.isArray(cfgRoot.__globalConflicts)) {
      cfgRoot.__globalConflicts.forEach((entry, i) => {
        const text = entry && typeof entry === 'object' ? (entry.conflict || JSON.stringify(entry)) : String(entry);
        report.warnings.push(`globalConflict[${i}]: ${text}`);
      });
    }

    // We intentionally do not validate BP_SHEETS contents at validator load time.
    // If BP_SHEETS is not available yet, we only note that in the report.
    if (!Array.isArray(global.BP_SHEETS)) {
      report.warnings.push('BP_SHEETS is not available at validator load time; blueprint routing checks are deferred.');
    }
    report.ok = report.errors.length === 0;
    return report;
  }


  function axisValidateBlueprintRegistry() {
    const report = {
      ok: true,
      errors: [],
      warnings: [],
      sheets: {
        bpSheetsCount: 0,
        componentBlueprintCount: 0,
        duplicateKeys: [],
        duplicateFiles: [],
        perConfigVisibleSheets: {},
        zeroSheetConfigs: [],
        ushapeHasA101U: false,
        ushapeHasA103: false
      }
    };

    const bpSheets = global.BP_SHEETS;
    if (!Array.isArray(bpSheets)) {
      report.ok = false;
      report.errors.push('BP_SHEETS is missing or not an array.');
      return report;
    }

    report.sheets.bpSheetsCount = bpSheets.length;

    const keyCount = new Map();
    const fileCount = new Map();
    const byKey = new Map();
    const bySheetNumber = new Map();

    bpSheets.forEach((s, idx) => {
      if (!s || typeof s !== 'object') {
        report.errors.push(`BP_SHEETS[${idx}] is not an object.`);
        return;
      }
      ['k', 'n', 'title', 'disc', 'file'].forEach(field => {
        const v = s[field];
        if (v === undefined || v === null || (typeof v === 'string' && v.trim() === '')) {
          report.errors.push(`BP_SHEETS[${idx}] missing required field "${field}".`);
        }
      });

      if (s.k) {
        keyCount.set(s.k, (keyCount.get(s.k) || 0) + 1);
        byKey.set(s.k, s);
      }
      if (s.n) bySheetNumber.set(s.n, s);
      if (s.file) fileCount.set(s.file, (fileCount.get(s.file) || 0) + 1);
    });

    report.sheets.duplicateKeys = Array.from(keyCount.entries()).filter(([, c]) => c > 1).map(([k]) => k);
    report.sheets.duplicateFiles = Array.from(fileCount.entries()).filter(([, c]) => c > 1).map(([f]) => f);
    report.sheets.duplicateKeys.forEach(k => report.errors.push(`Duplicate BP_SHEETS key: ${k}`));
    report.sheets.duplicateFiles.forEach(f => report.errors.push(`Duplicate BP_SHEETS file: ${f}`));

    const cfgRoot = global.AXIS_CONFIGS;
    if (cfgRoot && typeof cfgRoot === 'object') {
      Object.entries(cfgRoot).forEach(([cfgId, cfg]) => {
        if (!cfg || cfgId.startsWith('__')) return;
        const refs = Array.isArray(cfg.blueprintSheets) ? cfg.blueprintSheets : [];
        refs.forEach(ref => {
          const ok = bySheetNumber.has(ref) || byKey.has(ref) || Array.from(bySheetNumber.values()).some(s => s.file === ref);
          if (!ok) report.errors.push(`${cfgId}: blueprintSheets reference not found in BP_SHEETS (${ref})`);
        });

        let projected = [];
        if (typeof global.getBlueprintSheetsForConfig === 'function') {
          try {
            projected = global.getBlueprintSheetsForConfig(cfgId) || [];
          } catch (_) { projected = []; }
        } else {
          const refSet = new Set(refs.map(r => String(r).trim()).filter(Boolean));
          projected = bpSheets.filter(s => s && (refSet.has(String(s.k || '').trim()) || refSet.has(String(s.n || '').trim()) || refSet.has(String(s.file || '').trim())));
          if (!projected.length) projected = bpSheets.slice();
        }

        report.sheets.perConfigVisibleSheets[cfgId] = projected.map(s => s.n || s.k || s.file || '?');
        if (!projected.length) report.sheets.zeroSheetConfigs.push(cfgId);
      });

      const ushapeRefs = (cfgRoot.ushape && Array.isArray(cfgRoot.ushape.blueprintSheets))
        ? cfgRoot.ushape.blueprintSheets
        : [];
      report.sheets.ushapeHasA101U = ushapeRefs.includes('A-101U');
      report.sheets.ushapeHasA103 = ushapeRefs.includes('A-103');
      ['A-101U', 'A-103'].forEach(n => {
        if (!bySheetNumber.has(n)) report.errors.push(`Missing U-shape BP_SHEETS entry: ${n}`);
        if (!ushapeRefs.includes(n)) report.errors.push(`AXIS_CONFIGS.ushape.blueprintSheets missing ${n}`);
      });
    } else {
      report.warnings.push('AXIS_CONFIGS unavailable; config cross-check skipped.');
    }

    const compMap = global.COMPONENT_BLUEPRINTS;
    if (compMap && typeof compMap === 'object') {
      const entries = Object.entries(compMap);
      report.sheets.componentBlueprintCount = entries.length;
      entries.forEach(([k, bp]) => {
        const src = byKey.get(k);
        if (!src) {
          report.warnings.push(`COMPONENT_BLUEPRINTS key not found in BP_SHEETS: ${k}`);
          return;
        }
        if (bp.file && src.file && bp.file !== src.file) {
          report.warnings.push(`COMPONENT_BLUEPRINTS file mismatch for ${k}: ${bp.file} vs ${src.file}`);
        }
        if (bp.sheet && src.n && bp.sheet !== src.n) {
          report.warnings.push(`COMPONENT_BLUEPRINTS sheet mismatch for ${k}: ${bp.sheet} vs ${src.n}`);
        }
      });
    } else {
      report.warnings.push('COMPONENT_BLUEPRINTS unavailable; component mapping cross-check skipped.');
    }

    if (report.sheets.zeroSheetConfigs.length) {
      report.warnings.push('Configs with zero visible sheets under filtering: ' + report.sheets.zeroSheetConfigs.join(', '));
    }

    report.ok = report.errors.length === 0;
    return report;
  }

  function logReport(report) {
    report.errors.forEach(msg => console.error('[Axis][ConfigValidator]', msg));
    report.warnings.forEach(msg => console.warn('[Axis][ConfigValidator]', msg));
  }

  global.axisValidateConfigs = axisValidateConfigs;
  global.axisValidateBlueprintRegistry = axisValidateBlueprintRegistry;

  // Developer diagnostics only; non-blocking unless AXIS_CONFIGS is missing.
  logReport(axisValidateConfigs());
})(window);
