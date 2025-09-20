export interface Widget {
  id: string;
  name: string;
  text: string;
  type: 'chart' | 'text' | 'metric';
  data?: any;
}

export interface Category {
  id: string;
  name: string;
  widgets: Widget[];
}

export interface DashboardData {
  categories: Category[];
}

export interface DashboardContextType {
  dashboardData: DashboardData;
  addWidget: (categoryId: string, widget: Omit<Widget, 'id'>) => void;
  removeWidget: (categoryId: string, widgetId: string) => void;
  searchWidgets: (query: string) => Widget[];
  getAllWidgets: () => Widget[];
}