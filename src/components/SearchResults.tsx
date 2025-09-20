import React from 'react';
import { Widget as WidgetType } from '../types/dashboard';
import Widget from './Widget';
import { useDashboard } from '../context/DashboardContext';

interface SearchResultsProps {
  searchQuery: string;
  onClose: () => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ searchQuery, onClose }) => {
  const { searchWidgets, dashboardData, removeWidget } = useDashboard();
  const results = searchWidgets(searchQuery);

  const handleRemoveWidget = (widgetId: string) => {
    // Find which category the widget belongs to
    for (const category of dashboardData.categories) {
      if (category.widgets.some(w => w.id === widgetId)) {
        removeWidget(category.id, widgetId);
        break;
      }
    }
  };

  if (!searchQuery.trim()) {
    return null;
  }

  return (
    <div className="bg-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          Search Results for "{searchQuery}" ({results.length} found)
        </h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 px-3 py-1 border rounded"
        >
          Back to Dashboard
        </button>
      </div>
      
      {results.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No widgets found matching your search.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map((widget) => (
            <Widget
              key={widget.id}
              widget={widget}
              onRemove={() => handleRemoveWidget(widget.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;