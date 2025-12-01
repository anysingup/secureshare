export interface SharedPackage {
  id: string;
  files: File[];
  password: string;
  createdAt: number;
}

export interface ValidationRule {
  id: string;
  label: string;
  isValid: boolean;
}

export type ViewState = 'HOME' | 'SHARE' | 'RECEIVE';
