export interface FormField {
  id: string;
  type: string;
  label: string;
  name: string;
  required: boolean;
  validation: {
    required?: string;
    [key: string]: string | undefined;
  };
}