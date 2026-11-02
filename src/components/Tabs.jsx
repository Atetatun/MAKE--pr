import { useState } from 'react';

export function Tabs({ tabs, defaultTab = 0, onChange }) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleTabChange = (index) => {
    setActiveTab(index);
    onChange?.(index);
  };

  const handleKeyDown = (e, index) => {
    let nextIndex = index;
    
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      nextIndex = index === 0 ? tabs.length - 1 : index - 1;
      handleTabChange(nextIndex);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      nextIndex = index === tabs.length - 1 ? 0 : index + 1;
      handleTabChange(nextIndex);
    } else if (e.key === 'Home') {
      e.preventDefault();
      handleTabChange(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      handleTabChange(tabs.length - 1);
    }
  };

  return (
    <div>
      <div className="flex border-b border-border" role="tablist">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => handleTabChange(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={`px-4 py-4 text-base font-semibold transition-all duration-150 relative ${
              activeTab === index
                ? 'text-navy'
                : 'text-text-muted hover:text-text-primary'
            }`}
            role="tab"
            aria-selected={activeTab === index}
            aria-controls={`tabpanel-${index}`}
            id={`tab-${index}`}
          >
            {tab.label}
            {activeTab === index && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan transition-all duration-150" />
            )}
          </button>
        ))}
      </div>
      <div className="pt-6" id={`tabpanel-${activeTab}`} role="tabpanel" aria-labelledby={`tab-${activeTab}`}>
        {tabs[activeTab]?.content}
      </div>
    </div>
  );
}
