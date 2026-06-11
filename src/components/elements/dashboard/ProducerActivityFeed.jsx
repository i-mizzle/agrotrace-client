import React, { useState } from 'react'

const ProducerActivityFeed = () => {
    const activityTabs = [  
        {label: 'Recent Events'},
        {label: 'Upcoming Tasks'}
    ]

    const [activeTab, setActiveTab] = useState(0)
    return (
        <div className="p-1 rounded-xl bg-white dark:bg-at-dark-gray/5 shadow-xl shadow-black/5">
            <div className="w-full flex items-center justify-between p-1 rounded-lg gap-x-2">
                {activityTabs.map((tab, tabIndex) => (
                    <button 
                        className={`w-full p-4 text-sm rounded-[5px] transition duration-200 ${activeTab === tabIndex ? 'bg-at-white dark:bg-at-dark-gray/10' : 'bg-transparent'}`} 
                        key={tabIndex}
                        onClick={()=>{setActiveTab(tabIndex)}}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default ProducerActivityFeed