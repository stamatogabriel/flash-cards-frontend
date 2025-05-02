export interface IPlan {
  _id: string;
  name: string;
  description: string;
  limit: number;
  period: 'monthly' | 'yearly' | 'unlimited';
  signature_value: string;
}
