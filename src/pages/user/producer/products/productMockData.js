export const productTypes = [
  {
    category: 'grain-products',
    types: ['bagged-grain', 'cleaned-grain', 'graded-grain'],
  },
  {
    category: 'oilseed-exports',
    types: ['cleaned-sesame', 'sorted-sesame', 'cocoa-beans'],
  },
  {
    category: 'livestock-outputs',
    types: ['live-animal', 'carcass', 'cut-meat', 'processed-meat'],
  },
  {
    category: 'poultry',
    types: ['eggs', 'dressed-chicken'],
  },
  {
    category: 'dairy',
    types: ['raw-milk', 'processed-dairy'],
  },
  {
    category: 'fish',
    types: ['fresh-fish', 'frozen-fish', 'smoked-fish'],
  },
  {
    category: 'other',
    types: ['other'],
  },
]

export const productCategoryColorMap = {
  'grain-products': { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-700 dark:text-yellow-400' },
  'oilseed-exports': { bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-700 dark:text-amber-400' },
  'livestock-outputs': { bg: 'bg-rose-100 dark:bg-rose-900/30', text: 'text-rose-700 dark:text-rose-400' },
  poultry: { bg: 'bg-orange-100 dark:bg-orange-900/30', text: 'text-orange-700 dark:text-orange-400' },
  dairy: { bg: 'bg-sky-100 dark:bg-sky-900/30', text: 'text-sky-700 dark:text-sky-400' },
  fish: { bg: 'bg-cyan-100 dark:bg-cyan-900/30', text: 'text-cyan-700 dark:text-cyan-400' },
  other: { bg: 'bg-gray-100 dark:bg-gray-900/30', text: 'text-gray-700 dark:text-gray-400' },
}

export const placeholderProducts = [
  {
    id: 'product-009',
    name: 'Dried Tomato Flakes Lot A',
    batch: 'batch-001',
    category: 'grain-products',
    type: 'bagged-grain',
    wholeBatch: false,
    quantity: { amount: 42, unit: 'bags' },
    processingMethod: 'Solar drying and sieve grading',
    yieldPercentage: 78,
    storageCondition: 'Cool, dry, and ventilated warehouse',
    packingType: 'Multi-layer kraft paper sacks',
    labelCode: 'PRD-009-ATN-2024',
    qrScanCount: 147,
    createdBy: 'user-104',
    createdByName: 'Greenhouse Tech',
    createdAt: '2024-06-13T13:20:00.000Z',
    updatedAt: '2024-06-20T09:30:00.000Z',
  },
  {
    id: 'product-041',
    name: 'Trimmed Beef Pack',
    batch: 'batch-003',
    category: 'livestock-outputs',
    type: 'cut-meat',
    wholeBatch: false,
    quantity: { amount: 90, unit: 'cartons' },
    processingMethod: 'Cold-cut trimming and vacuum sealing',
    yieldPercentage: 84,
    storageCondition: 'Frozen at -18C',
    packingType: 'Food-grade vacuum packs in export cartons',
    labelCode: 'PRD-041-BEEF-2024',
    qrScanCount: 92,
    createdBy: 'user-104',
    createdByName: 'Processing Supervisor',
    createdAt: '2024-06-21T10:25:00.000Z',
    updatedAt: '2024-06-22T14:15:00.000Z',
  },
  {
    id: 'product-042',
    name: 'Vacuum Beef Cuts',
    batch: 'batch-003',
    category: 'livestock-outputs',
    type: 'processed-meat',
    wholeBatch: false,
    quantity: { amount: 120, unit: 'cartons' },
    processingMethod: 'Blast chilling and vacuum packing',
    yieldPercentage: 81,
    storageCondition: 'Frozen chain with monitored humidity',
    packingType: 'Export cartons with insulated liners',
    labelCode: 'PRD-042-BEEF-2024',
    qrScanCount: 65,
    createdBy: 'user-104',
    createdByName: 'Processing Supervisor',
    createdAt: '2024-06-21T16:00:00.000Z',
    updatedAt: '2024-06-22T14:15:00.000Z',
  },
]

export const getProductById = (productId) => {
  return placeholderProducts.find((product) => product.id === productId)
}