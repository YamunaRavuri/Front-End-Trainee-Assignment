import React, { useState } from 'react';
import { Plus, Search, RefreshCw, MoreVertical, Clock } from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';
import Widget from './Widget';
import AddWidgetModal from './AddWidgetModal';
import SearchResults from './SearchResults';

const Dashboard: React.FC = () => {
  const { dashboardData, addWidget, removeWidget } = useDashboard();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);

  const handleAddWidget = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    setIsModalOpen(true);
  };

  const handleModalAdd = (widgetData: { name: string; text: string; type: 'chart' | 'text' | 'metric' }) => {
    addWidget(selectedCategoryId, widgetData);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSearchResults(true);
    }
  };

  const selectedCategory = dashboardData.categories.find(cat => cat.id === selectedCategoryId);

  if (showSearchResults) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <SearchResults
            searchQuery={searchQuery}
            onClose={() => {
              setShowSearchResults(false);
              setSearchQuery('');
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="py-4 border-b border-gray-200 bg-white mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-900">CNAPP Dashboard</h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleAddWidget('cspm-executive')}
                className="flex items-center space-x-1 px-3 py-1.5 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
              >
                <Plus size={14} />
                <span>Add Widget</span>
              </button>
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search anything..."
                  className="w-64 px-3 py-2 pl-9 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={14} />
              </form>
              <button className="p-2 text-gray-500 hover:text-gray-700">
                <RefreshCw size={16} />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700">
                <MoreVertical size={16} />
              </button>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock size={14} />
                <select className="border-none bg-transparent text-sm focus:outline-none">
                  <option>Last 2 days</option>
                  <option>Last week</option>
                  <option>Last month</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-6">
          {dashboardData.categories.map((category) => (
            <div key={category.id} className="bg-white rounded-lg border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-base font-medium text-gray-900">{category.name}</h2>
                  <button
                    onClick={() => handleAddWidget(category.id)}
                    className="flex items-center space-x-1 px-3 py-1.5 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                  >
                    <Plus size={14} />
                    <span>Add Widget</span>
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                {category.widgets.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <p className="text-sm">No widgets in this category yet.</p>
                    <button
                      onClick={() => handleAddWidget(category.id)}
                      className="mt-2 text-blue-600 hover:text-blue-800 text-sm"
                    >
                      Add your first widget
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.widgets.map((widget) => (
                      <Widget
                        key={widget.id}
                        widget={widget}
                        onRemove={() => removeWidget(category.id, widget.id)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <AddWidgetModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleModalAdd}
        categoryName={selectedCategory?.name || ''}
      />
    </div>
  );
};

export default Dashboard;