import React from 'react';
import { X } from 'lucide-react';
import { Widget as WidgetType } from '../types/dashboard';

interface WidgetProps {
  widget: WidgetType;
  onRemove: () => void;
}

const Widget: React.FC<WidgetProps> = ({ widget, onRemove }) => {
  const renderContent = () => {
    switch (widget.type) {
      case 'chart':
        return (
          <div className="flex items-center justify-center mb-4">
            {widget.data?.chartType === 'donut' ? (
              <div className="relative">
                <svg width="120" height="120" className="transform -rotate-90">
                  <circle
                    cx="60"
                    cy="60"
                    r="45"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="12"
                  />
                  {widget.id === 'cloud-accounts' ? (
                    <>
                      <circle
                        cx="60"
                        cy="60"
                        r="45"
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="12"
                        strokeDasharray={`${(2/4) * 283} 283`}
                        strokeDashoffset="0"
                      />
                      <circle
                        cx="60"
                        cy="60"
                        r="45"
                        fill="none"
                        stroke="#93c5fd"
                        strokeWidth="12"
                        strokeDasharray={`${(2/4) * 283} 283`}
                        strokeDashoffset={`-${(2/4) * 283}`}
                      />
                    </>
                  ) : (
                    <>
                      <circle
                        cx="60"
                        cy="60"
                        r="45"
                        fill="none"
                        stroke="#ef4444"
                        strokeWidth="12"
                        strokeDasharray={`${(1689/9659) * 283} 283`}
                        strokeDashoffset="0"
                      />
                      <circle
                        cx="60"
                        cy="60"
                        r="45"
                        fill="none"
                        stroke="#f97316"
                        strokeWidth="12"
                        strokeDasharray={`${(681/9659) * 283} 283`}
                        strokeDashoffset={`-${(1689/9659) * 283}`}
                      />
                      <circle
                        cx="60"
                        cy="60"
                        r="45"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="12"
                        strokeDasharray={`${(7253/9659) * 283} 283`}
                        strokeDashoffset={`-${((1689+681)/9659) * 283}`}
                      />
                    </>
                  )}
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-800">
                      {widget.id === 'cloud-accounts' ? '2' : '9659'}
                    </div>
                    <div className="text-xs text-gray-500">
                      {widget.id === 'cloud-accounts' ? 'Total' : 'Total'}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full h-16 bg-gradient-to-r from-orange-400 to-red-500 rounded"></div>
            )}
          </div>
        );
      case 'metric':
        return (
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">{widget.data?.total || 0}</div>
              <div className="text-sm text-gray-600">Total {widget.name.includes('Vulnerabilities') ? 'Vulnerabilities' : 'Images'}</div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                  <span className="text-sm">Critical ({widget.data?.critical || 0})</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="text-sm">High ({widget.data?.high || 0})</span>
                </div>
              </div>
              {widget.data?.medium && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm">Medium ({widget.data.medium})</span>
                  </div>
                </div>
              )}
              {widget.data?.low && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Low ({widget.data.low})</span>
                  </div>
                </div>
              )}
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full flex">
                <div className="bg-red-600" style={{ width: `${((widget.data?.critical || 0) / (widget.data?.total || 1)) * 100}%` }}></div>
                <div className="bg-orange-500" style={{ width: `${((widget.data?.high || 0) / (widget.data?.total || 1)) * 100}%` }}></div>
                {widget.data?.medium && (
                  <div className="bg-yellow-500" style={{ width: `${(widget.data.medium / (widget.data?.total || 1)) * 100}%` }}></div>
                )}
                {widget.data?.low && (
                  <div className="bg-green-500" style={{ width: `${(widget.data.low / (widget.data?.total || 1)) * 100}%` }}></div>
                )}
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center h-32 text-center text-gray-500">
            <div>
              <div className="text-4xl mb-2">📊</div>
              <div className="text-sm">{widget.text}</div>
            </div>
          </div>
        );
    }
  };

  const renderLegend = () => {
    if (widget.type === 'chart' && widget.data?.chartType === 'donut') {
      if (widget.id === 'cloud-accounts') {
        return (
          <div className="space-y-1 text-xs">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <span>Connected (2)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-300 rounded-full mr-2"></div>
              <span>Not Connected (2)</span>
            </div>
          </div>
        );
      } else {
        return (
          <div className="space-y-1 text-xs">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
              <span>Failed (1689)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
              <span>Warning (681)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-gray-400 rounded-full mr-2"></div>
              <span>Not available (36)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span>Passed (7253)</span>
            </div>
          </div>
        );
      }
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 relative group hover:shadow-md transition-shadow">
      <button
        onClick={onRemove}
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 text-white rounded-full p-1 hover:bg-red-600 z-10"
      >
        <X size={12} />
      </button>
      
      <h3 className="font-semibold text-gray-800 mb-4 pr-6 text-sm">{widget.name}</h3>
      
      <div className="mb-3">
        {renderContent()}
      </div>
      
      {renderLegend()}
    </div>
  );
};

export default Widget;