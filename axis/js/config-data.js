/*
 * Axis canonical configuration data layer (Phase 1)
 * -------------------------------------------------
 * This file centralizes configuration metadata so the monolithic index.html
 * can progressively consume one source of truth before any redesign/refactor.
 */
(function initAxisConfigs(global){
  const AXIS_CONFIGS = {
    single: {
      id: 'single',
      displayName: 'Single',
      shortName: 'Single',
      description: 'Original 42′ × 12′ single-story module — the baseline Axis unit.',
      dimensionsLabel: '42′ × 12′',
      widthFt: 12,
      lengthFt: 42,
      grossAreaSf: 504,
      floors: 1,
      bedrooms: 1,
      bathrooms: 1,
      modules: [
        { id: 'module-1', bay: 'primary', floor: 1, lengthFt: 42, widthFt: 12, areaSf: 504 }
      ],
      rooms: [
        { id: 'single-room-1', name: 'Living / Entry', floor: 1, moduleId: 'module-1', xFt: 0, yFt: 0, lengthFt: 18, widthFt: 12, areaSf: 216, type: 'living', needsReview: true },
        { id: 'single-room-2', name: 'Kitchen / Dining', floor: 1, moduleId: 'module-1', xFt: 18, yFt: 0, lengthFt: 10, widthFt: 12, areaSf: 120, type: 'kitchen', needsReview: true },
        { id: 'single-room-3', name: 'Bedroom', floor: 1, moduleId: 'module-1', xFt: 28, yFt: 0, lengthFt: 10, widthFt: 12, areaSf: 120, type: 'bedroom', needsReview: true },
        { id: 'single-room-4', name: 'Bath', floor: 1, moduleId: 'module-1', xFt: 38, yFt: 0, lengthFt: 4, widthFt: 12, areaSf: 48, type: 'bathroom', needsReview: true }
      ],
      moduleCount: 1,
      foundationType: 'Helical piers',
      wallSystem: 'SIP panels',
      roofSystem: 'Flat roof + parapet',
      renderStem: 'single',
      blueprintSheets: ['S-101','S-102','S-201','S-202','S-301','A-101','A-102','A-201','A-301','A-302','A-303','A-304','A-305','A-306','A-401','P-501','M-101','M-601','M-602'],
      notes: ['Baseline module used for BOM scaling (504 SF reference).'],
      legacy: { sfForCfgMeta: 504 }
    },
    stacked: {
      id: 'stacked',
      displayName: 'Stacked',
      shortName: 'Stacked (2-Story)',
      description: 'Two single modules stacked — interior stair, shared mechanical.',
      dimensionsLabel: '42′ × 12′ footprint, 2-storey',
      widthFt: 12,
      lengthFt: 42,
      grossAreaSf: 1008,
      floors: 2,
      bedrooms: 2,
      bathrooms: 2,
      modules: [
        { id: 'module-1', bay: 'primary-lower', floor: 1, lengthFt: 42, widthFt: 12, areaSf: 504 },
        { id: 'module-2', bay: 'primary-upper', floor: 2, lengthFt: 42, widthFt: 12, areaSf: 504 }
      ],
      rooms: [
        { id: 'stacked-l1-room-1', name: 'Level 1 Living', floor: 1, moduleId: 'module-1', xFt: 0, yFt: 0, lengthFt: 22, widthFt: 12, areaSf: 264, type: 'living', needsReview: true },
        { id: 'stacked-l1-room-2', name: 'Level 1 Kitchen', floor: 1, moduleId: 'module-1', xFt: 22, yFt: 0, lengthFt: 14, widthFt: 12, areaSf: 168, type: 'kitchen', needsReview: true },
        { id: 'stacked-l1-room-3', name: 'Level 1 Bath', floor: 1, moduleId: 'module-1', xFt: 36, yFt: 0, lengthFt: 6, widthFt: 12, areaSf: 72, type: 'bathroom', needsReview: true },
        { id: 'stacked-l2-room-1', name: 'Level 2 Bedroom 1', floor: 2, moduleId: 'module-2', xFt: 0, yFt: 0, lengthFt: 16, widthFt: 12, areaSf: 192, type: 'bedroom', needsReview: true },
        { id: 'stacked-l2-room-2', name: 'Level 2 Bedroom 2', floor: 2, moduleId: 'module-2', xFt: 16, yFt: 0, lengthFt: 16, widthFt: 12, areaSf: 192, type: 'bedroom', needsReview: true },
        { id: 'stacked-l2-room-3', name: 'Level 2 Hall / Stairs', floor: 2, moduleId: 'module-2', xFt: 32, yFt: 0, lengthFt: 6, widthFt: 12, areaSf: 72, type: 'circulation', needsReview: true },
        { id: 'stacked-l2-room-4', name: 'Level 2 Bath', floor: 2, moduleId: 'module-2', xFt: 38, yFt: 0, lengthFt: 4, widthFt: 12, areaSf: 48, type: 'bathroom', needsReview: true }
      ],
      moduleCount: 2,
      foundationType: 'Helical piers',
      wallSystem: 'SIP panels',
      roofSystem: 'Flat roof + parapet',
      renderStem: 'stacked',
      blueprintSheets: ['S-101','S-102','S-201','S-202','S-301','A-101','A-102','A-201','A-301','A-302','A-303','A-304','A-305','A-306','A-401','A-402','P-501','M-101','M-601','M-602'],
      notes: ['Includes interior stair / upper-floor blueprint pages in viewer mode.'],
      legacy: { sfForCfgMeta: 1008 }
    },
    bungalow: {
      id: 'bungalow',
      displayName: 'Bungalow',
      shortName: 'Bungalow',
      description: 'Two singles side-by-side with connecting roof — wide-footprint plan.',
      dimensionsLabel: '42′ × 24′',
      widthFt: 24,
      lengthFt: 42,
      grossAreaSf: 1008,
      floors: 1,
      bedrooms: 2,
      bathrooms: 2,
      modules: [
        { id: 'module-1', bay: 'primary', floor: 1, lengthFt: 42, widthFt: 12, areaSf: 504 },
        { id: 'module-2', bay: 'secondary', floor: 1, lengthFt: 42, widthFt: 12, areaSf: 504 }
      ],
      rooms: [
        { id: 'bungalow-m1-room-1', name: 'Module 1 Living', floor: 1, moduleId: 'module-1', xFt: 0, yFt: 0, lengthFt: 20, widthFt: 12, areaSf: 240, type: 'living', needsReview: true },
        { id: 'bungalow-m1-room-2', name: 'Module 1 Kitchen', floor: 1, moduleId: 'module-1', xFt: 20, yFt: 0, lengthFt: 10, widthFt: 12, areaSf: 120, type: 'kitchen', needsReview: true },
        { id: 'bungalow-m1-room-3', name: 'Module 1 Hall', floor: 1, moduleId: 'module-1', xFt: 30, yFt: 0, lengthFt: 8, widthFt: 12, areaSf: 96, type: 'circulation', needsReview: true },
        { id: 'bungalow-m1-room-4', name: 'Module 1 Bath', floor: 1, moduleId: 'module-1', xFt: 38, yFt: 0, lengthFt: 4, widthFt: 12, areaSf: 48, type: 'bathroom', needsReview: true },
        { id: 'bungalow-m2-room-1', name: 'Module 2 Bedroom 1', floor: 1, moduleId: 'module-2', xFt: 0, yFt: 0, lengthFt: 14, widthFt: 12, areaSf: 168, type: 'bedroom', needsReview: true },
        { id: 'bungalow-m2-room-2', name: 'Module 2 Bedroom 2', floor: 1, moduleId: 'module-2', xFt: 14, yFt: 0, lengthFt: 14, widthFt: 12, areaSf: 168, type: 'bedroom', needsReview: true },
        { id: 'bungalow-m2-room-3', name: 'Module 2 Flex', floor: 1, moduleId: 'module-2', xFt: 28, yFt: 0, lengthFt: 10, widthFt: 12, areaSf: 120, type: 'flex', needsReview: true },
        { id: 'bungalow-m2-room-4', name: 'Module 2 Bath', floor: 1, moduleId: 'module-2', xFt: 38, yFt: 0, lengthFt: 4, widthFt: 12, areaSf: 48, type: 'bathroom', needsReview: true }
      ],
      moduleCount: 2,
      foundationType: 'Helical piers',
      wallSystem: 'SIP panels',
      roofSystem: 'Flat roof + parapet',
      renderStem: 'bungalow',
      blueprintSheets: ['S-101','S-102','S-201','S-202','S-301','A-101','A-102','A-201','A-301','A-302','A-303','A-304','A-305','A-306','A-401','P-501','M-101','M-601','M-602'],
      notes: ['Side-by-side single-story layout.'],
      legacy: { sfForCfgMeta: 1008 }
    },
    duplex: {
      id: 'duplex',
      displayName: 'Duplex',
      shortName: 'Duplex',
      description: 'Two bungalows joined — rental-ready two-unit configuration.',
      dimensionsLabel: '42′ × 24′',
      widthFt: 24,
      lengthFt: 42,
      grossAreaSf: 2016,
      floors: 2,
      bedrooms: 4,
      bathrooms: 2,
      modules: [
        { id: 'module-1', bay: 'primary-lower', floor: 1, lengthFt: 42, widthFt: 12, areaSf: 504 },
        { id: 'module-2', bay: 'secondary-lower', floor: 1, lengthFt: 42, widthFt: 12, areaSf: 504 },
        { id: 'module-3', bay: 'primary-upper', floor: 2, lengthFt: 42, widthFt: 12, areaSf: 504 },
        { id: 'module-4', bay: 'secondary-upper', floor: 2, lengthFt: 42, widthFt: 12, areaSf: 504 }
      ],
      rooms: [
        { id: 'duplex-l1-m1-room-1', name: 'Level 1 Module 1 Living', floor: 1, moduleId: 'module-1', xFt: 0, yFt: 0, lengthFt: 18, widthFt: 12, areaSf: 216, type: 'living', needsReview: true },
        { id: 'duplex-l1-m1-room-2', name: 'Level 1 Module 1 Kitchen', floor: 1, moduleId: 'module-1', xFt: 18, yFt: 0, lengthFt: 10, widthFt: 12, areaSf: 120, type: 'kitchen', needsReview: true },
        { id: 'duplex-l1-m1-room-3', name: 'Level 1 Module 1 Bedroom', floor: 1, moduleId: 'module-1', xFt: 28, yFt: 0, lengthFt: 10, widthFt: 12, areaSf: 120, type: 'bedroom', needsReview: true },
        { id: 'duplex-l1-m1-room-4', name: 'Level 1 Module 1 Bath', floor: 1, moduleId: 'module-1', xFt: 38, yFt: 0, lengthFt: 4, widthFt: 12, areaSf: 48, type: 'bathroom', needsReview: true },
        { id: 'duplex-l1-m2-room-1', name: 'Level 1 Module 2 Living', floor: 1, moduleId: 'module-2', xFt: 0, yFt: 0, lengthFt: 18, widthFt: 12, areaSf: 216, type: 'living', needsReview: true },
        { id: 'duplex-l1-m2-room-2', name: 'Level 1 Module 2 Kitchen', floor: 1, moduleId: 'module-2', xFt: 18, yFt: 0, lengthFt: 10, widthFt: 12, areaSf: 120, type: 'kitchen', needsReview: true },
        { id: 'duplex-l1-m2-room-3', name: 'Level 1 Module 2 Bedroom', floor: 1, moduleId: 'module-2', xFt: 28, yFt: 0, lengthFt: 10, widthFt: 12, areaSf: 120, type: 'bedroom', needsReview: true },
        { id: 'duplex-l1-m2-room-4', name: 'Level 1 Module 2 Bath', floor: 1, moduleId: 'module-2', xFt: 38, yFt: 0, lengthFt: 4, widthFt: 12, areaSf: 48, type: 'bathroom', needsReview: true },
        { id: 'duplex-l2-m3-room-1', name: 'Level 2 Module 1 Bedroom 1', floor: 2, moduleId: 'module-3', xFt: 0, yFt: 0, lengthFt: 14, widthFt: 12, areaSf: 168, type: 'bedroom', needsReview: true },
        { id: 'duplex-l2-m3-room-2', name: 'Level 2 Module 1 Bedroom 2', floor: 2, moduleId: 'module-3', xFt: 14, yFt: 0, lengthFt: 14, widthFt: 12, areaSf: 168, type: 'bedroom', needsReview: true },
        { id: 'duplex-l2-m3-room-3', name: 'Level 2 Module 1 Loft', floor: 2, moduleId: 'module-3', xFt: 28, yFt: 0, lengthFt: 10, widthFt: 12, areaSf: 120, type: 'flex', needsReview: true },
        { id: 'duplex-l2-m3-room-4', name: 'Level 2 Module 1 Bath', floor: 2, moduleId: 'module-3', xFt: 38, yFt: 0, lengthFt: 4, widthFt: 12, areaSf: 48, type: 'bathroom', needsReview: true },
        { id: 'duplex-l2-m4-room-1', name: 'Level 2 Module 2 Bedroom 1', floor: 2, moduleId: 'module-4', xFt: 0, yFt: 0, lengthFt: 14, widthFt: 12, areaSf: 168, type: 'bedroom', needsReview: true },
        { id: 'duplex-l2-m4-room-2', name: 'Level 2 Module 2 Bedroom 2', floor: 2, moduleId: 'module-4', xFt: 14, yFt: 0, lengthFt: 14, widthFt: 12, areaSf: 168, type: 'bedroom', needsReview: true },
        { id: 'duplex-l2-m4-room-3', name: 'Level 2 Module 2 Loft', floor: 2, moduleId: 'module-4', xFt: 28, yFt: 0, lengthFt: 10, widthFt: 12, areaSf: 120, type: 'flex', needsReview: true },
        { id: 'duplex-l2-m4-room-4', name: 'Level 2 Module 2 Bath', floor: 2, moduleId: 'module-4', xFt: 38, yFt: 0, lengthFt: 4, widthFt: 12, areaSf: 48, type: 'bathroom', needsReview: true }
      ],
      moduleCount: 4,
      foundationType: 'Helical piers',
      wallSystem: 'SIP panels',
      roofSystem: 'Flat roof + parapet',
      renderStem: 'duplex',
      blueprintSheets: ['S-101','S-102','S-201','S-202','S-301','A-101','A-102','A-201','A-301','A-302','A-303','A-304','A-305','A-306','A-401','A-402','P-501','M-101','M-601','M-602'],
      notes: ['Stacked + side-by-side arrangement.', 'Bath count standardized to 2; prior 3-bath references treated as outdated copy.'],
      legacy: { sfForCfgMeta: 2016 }
    },
    ushape: {
      id: 'ushape',
      displayName: 'U-Shape',
      shortName: 'U-Shape Courtyard',
      description: 'Three modules in a U around a sheltered courtyard.',
      dimensionsLabel: '45′ × 57′',
      widthFt: 45,
      lengthFt: 57,
      grossAreaSf: 1620,
      floors: 1,
      bedrooms: 2,
      bathrooms: 2,
      modules: [
        { id: 'module-1', bay: 'north-connector', floor: 1, geometryPendingReview: true },
        { id: 'module-2', bay: 'west-wing', floor: 1, geometryPendingReview: true },
        { id: 'module-3', bay: 'east-wing', floor: 1, geometryPendingReview: true }
      ],
      rooms: [],
      moduleCount: 3,
      foundationType: 'Helical piers',
      wallSystem: 'SIP panels',
      roofSystem: 'Flat roof + parapet',
      renderStem: 'ushape',
      blueprintSheets: ['S-101','S-102','S-201','S-202','S-301','A-101','A-101U','A-102','A-103','A-201','A-301','A-302','A-303','A-304','A-305','A-306','A-401','P-501','M-101','M-601','M-602'],
      notes: [
        'Courtyard target area appears as ≈945 SF in titlebar copy.',
        'Needs module-by-module footprint confirmation before U-shape dimensions/SF can be treated as final canonical values.'
      ],
      needsReview: true,
      conflicts: [
        'U-shape area conflict: 1512 SF in legacy references vs 1620 SF in current viewer metadata.',
        'U-shape dimensions conflict: 54′ × 42′ in legacy references vs 45′ × 57′ in current viewer metadata.'
      ],
      legacy: { sfForCfgMeta: 1512 }
    }
  };

  global.AXIS_CONFIGS = AXIS_CONFIGS;
})(window);
