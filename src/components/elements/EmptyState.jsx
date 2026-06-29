import React from 'react'

const EmptyState = ({ emptyStateTitle = 'No data', emptyStateText = 'Nothing to show right now.' }) => {
  return (
    <div className="w-full rounded-lg border border-dashed border-gray-300/80 bg-white dark:border-slate-700/50 dark:bg-at-dark-gray/5 px-6 py-10 text-center">
      <h3 className="text-sm font-semibold text-at-dark-gray dark:text-gray-100">{emptyStateTitle}</h3>
      <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">{emptyStateText}</p>
    </div>
  )
}

export default EmptyState