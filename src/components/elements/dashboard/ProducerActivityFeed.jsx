import React, { useState } from 'react'
import TruckIcon from '../icons/TruckIcon'
import CheckBadgeIcon from '../icons/CheckBadgeIcon'
import CalendarIcon from '../icons/CalendarIcon'
import ExclamationTriangleIcon from '../icons/ExclamationTriangleIcon'
import MapPinIcon from '../icons/MapPinIcon'
import DocumentIcon from '../icons/DocumentIcon'
import BoxIcon from '../icons/BoxIcon'
import ClipboardDocumentCheckIcon from '../icons/ClipboardDocumentCheckIcon'
import SquaresStackIcon from '../icons/SquaresStackIcon'
import ClockIcon from '../icons/ClockIcon'

const recentEvents = [
    {
        id: 1,
        icon: CheckBadgeIcon,
        iconBg: 'bg-green-500/10 dark:bg-green-400/10',
        iconColor: 'text-green-600 dark:text-green-400',
        title: 'Batch #BT-2041 Approved',
        description: 'Export batch for Arabica Coffee was approved by the regulator.',
        time: '2 hours ago',
        badge: 'Approved',
        badgeColor: 'bg-green-50 dark:bg-green-400/10 text-green-600 dark:text-green-400',
    },
    {
        id: 2,
        icon: TruckIcon,
        iconBg: 'bg-blue-500/10 dark:bg-blue-400/10',
        iconColor: 'text-blue-600 dark:text-blue-400',
        title: 'Shipment Dispatched',
        description: 'Batch #BT-2039 (Cassava Flour) has been dispatched to Lagos port.',
        time: '5 hours ago',
        badge: 'In Transit',
        badgeColor: 'bg-blue-50 dark:bg-blue-400/10 text-blue-600 dark:text-blue-400',
    },
    {
        id: 3,
        icon: ExclamationTriangleIcon,
        iconBg: 'bg-red-500/10 dark:bg-red-400/10',
        iconColor: 'text-red-600 dark:text-red-400',
        title: 'Risk Alert Raised',
        description: 'Pesticide residue levels exceeded threshold on Farm Plot C-07.',
        time: 'Yesterday, 3:14 PM',
        badge: 'Risk',
        badgeColor: 'bg-red-50 dark:bg-red-400/10 text-red-600 dark:text-red-400',
    },
    {
        id: 4,
        icon: MapPinIcon,
        iconBg: 'bg-purple-500/10 dark:bg-purple-400/10',
        iconColor: 'text-purple-600 dark:text-purple-400',
        title: 'New Location Added',
        description: 'Farm location "Ogun State Plot B-12" was successfully registered.',
        time: 'Yesterday, 10:00 AM',
        badge: 'Location',
        badgeColor: 'bg-purple-50 dark:bg-purple-400/10 text-purple-600 dark:text-purple-400',
    },
    {
        id: 5,
        icon: BoxIcon,
        iconBg: 'bg-amber-500/10 dark:bg-amber-400/10',
        iconColor: 'text-amber-600 dark:text-amber-400',
        title: 'Product Harvest Logged',
        description: '320kg of Yam (Variety: Puna) harvested and recorded in the system.',
        time: '2 days ago',
        badge: 'Harvest',
        badgeColor: 'bg-amber-50 dark:bg-amber-400/10 text-amber-600 dark:text-amber-400',
    },
    {
        id: 6,
        icon: DocumentIcon,
        iconBg: 'bg-gray-500/10 dark:bg-gray-400/10',
        iconColor: 'text-gray-600 dark:text-gray-400',
        title: 'Compliance Report Submitted',
        description: 'Q2 2026 compliance report submitted for regulatory review.',
        time: '3 days ago',
        badge: 'Report',
        badgeColor: 'bg-gray-100 dark:bg-gray-400/10 text-gray-600 dark:text-gray-400',
    },
]

const upcomingTasks = [
    {
        id: 7,
        icon: ClipboardDocumentCheckIcon,
        iconBg: 'bg-blue-500/10 dark:bg-blue-400/10',
        iconColor: 'text-blue-600 dark:text-blue-400',
        title: 'Schedule Inspection — Plot A-03',
        description: 'Pre-export inspection due for Soybean farm plot A-03.',
        dueDate: 'Jun 27, 2026',
        badge: 'Inspection',
        badgeColor: 'bg-blue-50 dark:bg-blue-400/10 text-blue-600 dark:text-blue-400',
    },
    {
        id: 8,
        icon: SquaresStackIcon,
        iconBg: 'bg-amber-500/10 dark:bg-amber-400/10',
        iconColor: 'text-amber-600 dark:text-amber-400',
        title: 'Batch #BT-2043 Packaging',
        description: 'Finalise packaging and labelling for Cocoa export batch.',
        dueDate: 'Jun 29, 2026',
        badge: 'Packaging',
        badgeColor: 'bg-amber-50 dark:bg-amber-400/10 text-amber-600 dark:text-amber-400',
    },
    {
        id: 9,
        icon: CalendarIcon,
        iconBg: 'bg-green-500/10 dark:bg-green-400/10',
        iconColor: 'text-green-600 dark:text-green-400',
        title: 'Renew Organic Certification',
        description: 'Annual organic certification renewal deadline for all crop assets.',
        dueDate: 'Jul 5, 2026',
        badge: 'Certification',
        badgeColor: 'bg-green-50 dark:bg-green-400/10 text-green-600 dark:text-green-400',
    },
    {
        id: 10,
        icon: ClockIcon,
        iconBg: 'bg-red-500/10 dark:bg-red-400/10',
        iconColor: 'text-red-600 dark:text-red-400',
        title: 'Resolve Risk Alert — Plot C-07',
        description: 'Address pesticide residue issue and submit corrective action report.',
        dueDate: 'Jul 1, 2026',
        badge: 'Urgent',
        badgeColor: 'bg-red-50 dark:bg-red-400/10 text-red-600 dark:text-red-400',
    },
]

const ActivityCard = ({ item, isTask = false }) => {
    const Icon = item.icon
    return (
        <div className="flex items-start gap-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-at-dark-gray/10 transition duration-150">
            <div className={`shrink-0 w-9 h-9 rounded-lg flex items-center justify-center ${item.iconBg}`}>
                <Icon className={`w-4 h-4 ${item.iconColor}`} />
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-x-2">
                    <p className="text-sm font-medium text-at-black dark:text-white leading-tight">{item.title}</p>
                    <span className={`shrink-0 text-[10px] font-medium px-2 py-0.5 rounded-full ${item.badgeColor}`}>
                        {item.badge}
                    </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-snug">{item.description}</p>
                <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1 flex items-center gap-x-1">
                    <ClockIcon className="w-3 h-3" />
                    {isTask ? `Due: ${item.dueDate}` : item.time}
                </p>
            </div>
        </div>
    )
}

const ProducerActivityFeed = () => {
    const activityTabs = [  
        { label: 'Recent Events' },
        { label: 'Upcoming Tasks' },
    ]

    const [activeTab, setActiveTab] = useState(0)

    const activities = activeTab === 0 ? recentEvents : upcomingTasks

    return (
        <div className="p-1 rounded-xl bg-white dark:bg-at-dark-gray/5 shadow-xl shadow-black/5">
            <div className="w-full flex items-center justify-between p-1 rounded-lg gap-x-2">
                {activityTabs.map((tab, tabIndex) => (
                    <button 
                        className={`w-full px-4 py-3 text-sm rounded-[5px] transition duration-200 ${activeTab === tabIndex ? 'bg-at-white dark:bg-at-dark-gray/10' : 'bg-transparent'}`} 
                        key={tabIndex}
                        onClick={() => setActiveTab(tabIndex)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="min-h-60 divide-y divide-gray-100 dark:divide-gray-700/30">
                {activities.map((item) => (
                    <ActivityCard key={item.id} item={item} isTask={activeTab === 1} />
                ))}
            </div>
        </div>
    )
}

export default ProducerActivityFeed