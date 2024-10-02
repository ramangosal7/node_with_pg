export interface IResponse {
  status: number;
  error?: boolean;
  message?: string;
  data?: any;
}

export interface ValidationResult {
  error: boolean;
  value: any;
  message?: string | null;
}