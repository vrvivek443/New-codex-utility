export interface DetailFieldConfig {
  label: string;
  key: string;
}

export interface DetailSectionConfig {
  header: string;
  fields: DetailFieldConfig[];
}

export const CASE_CONFIG: Record<string, DetailSectionConfig> = {
  caseDetail: {
    header: 'Full Case Information',
    fields: [
      { label: 'Source*', key: 'sourcecode' },
      { label: 'Source Detail', key: 'sourceDetail' },
      { label: 'Received Date', key: 'receivedDate' },
      { label: 'Program*', key: 'program' },
      { label: 'Priority*', key: 'priority' },
      { label: 'CBDG Case Type', key: 'cbdgCaseType' },
      { label: 'Follow-up Date', key: 'followUpDate' },
      { label: 'Enforcement Remedy', key: 'enforcementRemedy' },
      { label: 'Service', key: 'service' },
      { label: 'Open Date', key: 'openDate' },
      { label: 'Close Date', key: 'closeDate' },
      { label: 'Case Phase', key: 'casePhase' },
      { label: 'Case Status', key: 'caseStatus' },
      { label: 'BP Monitoring', key: 'bpMonitoring' }
    ]
  },
};
