import { useState } from 'react';

export function Tabs({ tabs, defaultTab = 0, onChange }) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleTabChange = (index) => {
    setActiveTab(index);
    onChange?.(index);
  };

  return (
    <div>
      <div className="flex border-b border-border">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => handleTabChange(index)}
            className={`px-4 py-4 text-base font-semibold transition-all duration-200 relative ${
              activeTab === index
                ? 'text-navy'
                : 'text-text-muted hover:text-text-primary'
            }`}
          >
            {tab.label}
            {activeTab === index && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-cyan" />
            )}
          </button>
        ))}
      </div>
      <div className="pt-6">
        {tabs[activeTab]?.content}
      </div>
    </div>
  );
}
