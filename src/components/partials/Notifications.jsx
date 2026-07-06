import React from 'react'
import EmptyState from '../elements/EmptyState';

const Notifications = () => {
  return (
    <div className="w-full">
      <div className="mt-20">
        <EmptyState emptyStateText="There are no notifications on your account yet. Any new notifications will show up here" emptyStateTitle="No notifications yet" />
      </div>
    </div>
  )
}

export default Notifications