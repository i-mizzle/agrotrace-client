export const waterSourceTypes = [
  'rain-fed',
  'borehole',
  'well',
  'river',
  'stream',
  'lake',
  'dam',
  'irrigation-canal',
  'municipal-supply',
  'harvested-rainwater',
  'pond',
  'other',
]

export const soilTypes = [
  'sandy',
  'loamy',
  'silty',
  'sandy-loam',
  'clay-loam',
  'silt-loam',
  'peaty',
  'chalky',
  'laterite',
  'organic',
  'mixed',
  'unknown',
  'other',
]

export const waterSourceOptions = waterSourceTypes.map((source) => ({ label: source, value: source }))

export const soilTypeOptions = soilTypes.map((soil) => ({ label: soil, value: soil }))

export const locationTypes = [
  'farm',
  'processing-plant',
  'warehouse',
  'distribution-center',
  'retail-outlet',
  'other',
]

export const locationTypeOptions = locationTypes.map((type) => ({ label: type, value: type }))
