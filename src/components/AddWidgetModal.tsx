import React, { useState } from 'react';
import { X } from 'lucide-react';

interface AddWidgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (widgetData: { name: string; text: string; type: 'chart' | 'text' | 'metric' }) => void;
  categoryName: string;
}

const AddWidgetModal: React.FC<AddWidgetModalProps> = ({
  isOpen,
  onClose,
  onAdd,
  categoryName
}) => {
  const [selectedWidgets, setSelectedWidgets] = useState<string[]>([]);

  // Widget options based on category
  const getWidgetOptions = () => {
    if (categoryName === 'CSPM Executive Dashboard') {
      return [
        { id: 'cloud-accounts', name: 'Cloud Accounts', checked: true },
        { id: 'cloud-account-risk', name: 'Cloud Account Risk Assessment', checked: true }
      ];
    } else if (categoryName === 'CWPP Dashboard') {
      return [
        { id: 'namespace-alerts', name: 'Top 5 Namespace Specific Alerts', checked: false },
        { id: 'workload-alerts', name: 'Workload Alerts', checked: false }
      ];
    } else if (categoryName === 'Registry Scan') {
      return [
        { id: 'image-risk-assessment', name: 'Image Risk Assessment', checked: false },
        { id: 'image-security-issues', name: 'Image Security Issues', checked: false }
      ];
    }
    return [];
  };

  const [widgetOptions, setWidgetOptions] = useState(getWidgetOptions());

  const handleCheckboxChange = (widgetId: string) => {
    setWidgetOptions(prev => 
      prev.map(widget => 
        widget.id === widgetId 
          ? { ...widget, checked: !widget.checked }
          : widget
      )
    );
  };

  const handleConfirm = () => {
    const selectedOptions = widgetOptions.filter(widget => widget.checked);
    selectedOptions.forEach(widget => {
      onAdd({
        name: widget.name,
        text: getWidgetText(widget.id),
        type: getWidgetType(widget.id)
      });
    });
    onClose();
  };

  const getWidgetText = (widgetId: string) => {
    const textMap: { [key: string]: string } = {
      'cloud-accounts': 'Connected (2), Not Connected (2)',
      'cloud-account-risk': 'Failed (1689), Warning (681), Not available (36), Passed (7253)',
      'namespace-alerts': 'No Graph data available!',
      'workload-alerts': 'No Graph data available!',
      'image-risk-assessment': '1470 Total Vulnerabilities',
      'image-security-issues': '2 Total Images'
    };
    return textMap[widgetId] || 'No data available';
  };

  const getWidgetType = (widgetId: string): 'chart' | 'text' | 'metric' => {
    if (widgetId === 'cloud-accounts' || widgetId === 'cloud-account-risk') return 'chart';
    if (widgetId === 'image-risk-assessment' || widgetId === 'image-security-issues') return 'metric';
    return 'text';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl mx-4 border border-gray-200">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Add Widget</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6">
          <p className="text-sm text-gray-600 mb-6">
            Personalize your dashboard by adding the following widget
          </p>

          {/* Tabs */}
          <div className="flex space-x-6 mb-6 border-b border-gray-200">
            <button className="pb-2 text-sm font-medium text-blue-600 border-b-2 border-blue-600">
              CSPM
            </button>
            <button className="pb-2 text-sm font-medium text-gray-500">
              CWPP
            </button>
            <button className="pb-2 text-sm font-medium text-gray-500">
              Image
            </button>
            <button className="pb-2 text-sm font-medium text-gray-500">
              Ticket
            </button>
          </div>

          {/* Widget List */}
          <div className="space-y-3 mb-8">
            {widgetOptions.map((widget) => (
              <label key={widget.id} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={widget.checked}
                  onChange={() => handleCheckboxChange(widget.id)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{widget.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-3 px-6 py-4 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-6 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddWidgetModal;