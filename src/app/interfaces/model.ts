export interface CaseSearchResponse {
  data: any[];
  totalCases: number | null;
  openCases: number | null;
  closedCases: number | null;
  draftCases: number | null;
  totalViolations: number | null;
  lastComplaint: string | null;
  lastComplaintBy: string | null;
  lastVisitOn: string | null;
  lastVisitBy: string | null;
  status: string;
  errorMessage: string | null;
  correlationId: string | null;
}
