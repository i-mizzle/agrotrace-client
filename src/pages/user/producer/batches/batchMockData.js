export const batchStatusColorMap = {
  draft: { bg: 'bg-gray-100 dark:bg-gray-900/30', text: 'text-gray-700 dark:text-gray-400', border: 'border-gray-300 dark:border-gray-700' },
  'in-progress': { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-400', border: 'border-blue-300 dark:border-blue-700' },
  'quality-check': { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-700 dark:text-yellow-400', border: 'border-yellow-300 dark:border-yellow-700' },
  'ready-for-export': { bg: 'bg-emerald-100 dark:bg-emerald-900/30', text: 'text-emerald-700 dark:text-emerald-400', border: 'border-emerald-300 dark:border-emerald-700' },
  'in-transit': { bg: 'bg-cyan-100 dark:bg-cyan-900/30', text: 'text-cyan-700 dark:text-cyan-400', border: 'border-cyan-300 dark:border-cyan-700' },
  delivered: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-400', border: 'border-green-300 dark:border-green-700' },
  closed: { bg: 'bg-slate-100 dark:bg-slate-900/30', text: 'text-slate-700 dark:text-slate-400', border: 'border-slate-300 dark:border-slate-700' },
}

export const placeholderBatches = [
  {
    id: 'batch-001',
    producer: 'producer-001',
    batchCode: 'BT2406100012',
    type: 'crop',
    createdBy: 'user-101',
    createdByName: 'John Farmer',
    status: 'ready-for-export',
    statusHistory: [
      { status: 'ready-for-export', date: '2024-06-20T09:30:00.000Z', changedBy: 'user-102', changedByName: 'Field Supervisor' },
      { status: 'quality-check', date: '2024-06-16T12:05:00.000Z', changedBy: 'user-105', changedByName: 'Quality Officer' },
      { status: 'in-progress', date: '2024-06-12T08:10:00.000Z', changedBy: 'user-101', changedByName: 'John Farmer' },
      { status: 'draft', date: '2024-06-10T06:00:00.000Z', changedBy: 'user-101', changedByName: 'John Farmer' },
    ],
    assetContributions: [
      {
        asset: 'asset-001',
        contribution: {
          quantity: 1200,
          unit: 'kg',
          date: '2024-06-11T09:30:00.000Z',
        },
      },
      {
        asset: 'asset-003',
        contribution: {
          quantity: 860,
          unit: 'kg',
          date: '2024-06-12T10:15:00.000Z',
        },
      },
    ],
    productContributions: [
      {
        asset: 'product-009',
        productName: 'Dried Tomato Flakes Lot A',
        contribution: {
          quantity: 42,
          unit: 'bags',
          date: '2024-06-13T13:20:00.000Z',
        },
      },
    ],
    quantity: {
      total: 2102,
      unit: 'kg',
    },
    aggregation: {
      aggregated: true,
      sources: [
        { source: 'Farm Cluster North', total: 1260, unit: 'kg' },
        { source: 'Greenhouse Unit 2', total: 842, unit: 'kg' },
      ],
    },
    storageLocation: 'location-001',
    expiryDate: '2024-10-30T00:00:00.000Z',
    qualityGrade: 'A',
    labelCode: 'BATCH-001-BT2406100012',
    qrScanCount: 203,
    createdAt: '2024-06-10T06:00:00.000Z',
    updatedAt: '2024-06-20T09:30:00.000Z',
  },
  {
    id: 'batch-002',
    producer: 'producer-001',
    batchCode: 'BT2406110048',
    type: 'live-animal',
    createdBy: 'user-103',
    createdByName: 'Livestock Vet',
    status: 'in-transit',
    statusHistory: [
      { status: 'in-transit', date: '2024-06-19T05:45:00.000Z', changedBy: 'user-106', changedByName: 'Transport Lead' },
      { status: 'quality-check', date: '2024-06-17T11:10:00.000Z', changedBy: 'user-103', changedByName: 'Livestock Vet' },
      { status: 'in-progress', date: '2024-06-11T07:20:00.000Z', changedBy: 'user-103', changedByName: 'Livestock Vet' },
    ],
    assetContributions: [
      {
        asset: 'asset-002',
        contribution: {
          quantity: 45,
          unit: 'head',
          date: '2024-06-12T08:00:00.000Z',
        },
      },
      {
        asset: 'asset-004',
        contribution: {
          quantity: 120,
          unit: 'head',
          date: '2024-06-12T09:00:00.000Z',
        },
      },
    ],
    productContributions: [],
    quantity: {
      total: 165,
      unit: 'head',
    },
    aggregation: {
      aggregated: false,
      sources: [],
    },
    storageLocation: 'location-002',
    expiryDate: null,
    qualityGrade: 'B+',
    labelCode: 'BATCH-002-BT2406110048',
    qrScanCount: 117,
    createdAt: '2024-06-11T07:20:00.000Z',
    updatedAt: '2024-06-19T05:45:00.000Z',
  },
  {
    id: 'batch-003',
    producer: 'producer-001',
    batchCode: 'BT2406180201',
    type: 'meat',
    createdBy: 'user-104',
    createdByName: 'Processing Supervisor',
    status: 'quality-check',
    statusHistory: [
      { status: 'quality-check', date: '2024-06-22T14:15:00.000Z', changedBy: 'user-105', changedByName: 'Quality Officer' },
      { status: 'in-progress', date: '2024-06-18T09:10:00.000Z', changedBy: 'user-104', changedByName: 'Processing Supervisor' },
      { status: 'draft', date: '2024-06-18T08:55:00.000Z', changedBy: 'user-104', changedByName: 'Processing Supervisor' },
    ],
    assetContributions: [
      {
        asset: 'asset-002',
        contribution: {
          quantity: 350,
          unit: 'kg',
          date: '2024-06-20T06:35:00.000Z',
        },
      },
    ],
    productContributions: [
      {
        asset: 'product-041',
        productName: 'Trimmed Beef Pack',
        contribution: {
          quantity: 90,
          unit: 'cartons',
          date: '2024-06-21T10:25:00.000Z',
        },
      },
      {
        asset: 'product-042',
        productName: 'Vacuum Beef Cuts',
        contribution: {
          quantity: 120,
          unit: 'cartons',
          date: '2024-06-21T16:00:00.000Z',
        },
      },
    ],
    quantity: {
      total: 210,
      unit: 'cartons',
    },
    aggregation: {
      aggregated: true,
      sources: [
        { source: 'Processing Line 1', total: 120, unit: 'cartons' },
        { source: 'Processing Line 2', total: 90, unit: 'cartons' },
      ],
    },
    storageLocation: 'location-003',
    expiryDate: '2024-08-15T00:00:00.000Z',
    qualityGrade: 'A-',
    labelCode: 'BATCH-003-BT2406180201',
    qrScanCount: 88,
    createdAt: '2024-06-18T08:55:00.000Z',
    updatedAt: '2024-06-22T14:15:00.000Z',
  },
]

export const getBatchById = (batchId) => {
  return placeholderBatches.find((batch) => batch.id === batchId)
}