export const AssetEvents = [
  {
    category: "crop-lifecycle",
    types: [
      "planting",
      "germination",
      "fertilizer-application",
      "pesticide-application",
      "irrigation",
      "weeding",
      "flowering",
      "harvest"
    ]
  },
  {
    category: "animal-lifecycle",
    types: [
      "birth",
      "tagging",
      "feeding",
      "vaccination",
      "medication",
      "weighing",
      "health-check",
      "breeding"
    ]
  },
  {
    category: "mortality",
    types: [
      "death",
      "culling"
    ]
  },
  {
    category: "movement",
    types: [
      "transfer",
      "transport",
      "relocation"
    ]
  },
  {
    category: "processing",
    types: [
      "slaughter",
      "milking",
      "egg-collection",
      "processing",
      "packaging"
    ]
  },
  {
    category: "quality-compliance",
    types: [
      "inspection",
      "lab-test",
      "certification"
    ]
  },
  {
    category: "storage",
    types: [
      "storage",
      "drying",
      "cleaning",
      "sorting"
    ]
  },
  {
    category: "export-chain",
    types: [
      "batch-created",
      "shipment-prepared",
      "shipped"
    ]
  }
]

export const assetStatuses = ['active', 'growing', 'ready-for-harvest', 'harvested', 'slaughtered', 'sold', 'transferred', 'lost', 'dead', 'closed']

export const statusColorMap = {
  active: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-400', border: 'border-green-300 dark:border-green-700' },
  growing: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-400', border: 'border-blue-300 dark:border-blue-700' },
  'ready-for-harvest': { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-700 dark:text-yellow-400', border: 'border-yellow-300 dark:border-yellow-700' },
  harvested: { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-700 dark:text-purple-400', border: 'border-purple-300 dark:border-purple-700' },
  slaughtered: { bg: 'bg-gray-100 dark:bg-gray-900/30', text: 'text-gray-700 dark:text-gray-400', border: 'border-gray-300 dark:border-gray-700' },
  sold: { bg: 'bg-emerald-100 dark:bg-emerald-900/30', text: 'text-emerald-700 dark:text-emerald-400', border: 'border-emerald-300 dark:border-emerald-700' },
  transferred: { bg: 'bg-cyan-100 dark:bg-cyan-900/30', text: 'text-cyan-700 dark:text-cyan-400', border: 'border-cyan-300 dark:border-cyan-700' },
  lost: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-400', border: 'border-red-300 dark:border-red-700' },
  dead: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-400', border: 'border-red-300 dark:border-red-700' },
  closed: { bg: 'bg-gray-100 dark:bg-gray-900/30', text: 'text-gray-700 dark:text-gray-400', border: 'border-gray-300 dark:border-gray-700' },
}