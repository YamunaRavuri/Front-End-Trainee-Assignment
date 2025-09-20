import { DashboardData } from '../types/dashboard';

export const initialDashboardData: DashboardData = {
  categories: [
    {
      id: 'cspm-executive',
      name: 'CSPM Executive Dashboard',
      widgets: [
        {
          id: 'cloud-accounts',
          name: 'Cloud Accounts',
          text: 'Connected (2), Not Connected (2)',
          type: 'chart',
          data: {
            total: 2,
            connected: 2,
            notConnected: 2,
            chartType: 'donut',
            color: '#3B82F6'
          }
        },
        {
          id: 'cloud-account-risk',
          name: 'Cloud Account Risk Assessment',
          text: 'Failed (1689), Warning (681), Not available (36), Passed (7253)',
          type: 'chart',
          data: {
            total: 9659,
            failed: 1689,
            warning: 681,
            notAvailable: 36,
            passed: 7253,
            chartType: 'donut',
            color: '#10B981'
          }
        }
      ]
    },
    {
      id: 'cwpp-dashboard',
      name: 'CWPP Dashboard',
      widgets: [
        {
          id: 'namespace-alerts',
          name: 'Top 5 Namespace Specific Alerts',
          text: 'No Graph data available!',
          type: 'text'
        },
        {
          id: 'workload-alerts',
          name: 'Workload Alerts',
          text: 'No Graph data available!',
          type: 'text'
        }
      ]
    },
    {
      id: 'registry-scan',
      name: 'Registry Scan',
      widgets: [
        {
          id: 'image-risk-assessment',
          name: 'Image Risk Assessment',
          text: '1470 Total Vulnerabilities',
          type: 'metric',
          data: {
            total: 1470,
            critical: 9,
            high: 150,
            medium: 500,
            low: 811,
            chartType: 'bar'
          }
        },
        {
          id: 'image-security-issues',
          name: 'Image Security Issues',
          text: '2 Total Images',
          type: 'metric',
          data: {
            total: 2,
            critical: 2,
            high: 2,
            chartType: 'bar'
          }
        }
      ]
    }
  ]
};