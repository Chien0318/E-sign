export interface PlanDetail {
  title: string;
  description: string;
}

export interface PlanOption {
  id: string;
  name: string;
  badge?: string;
  priceDisplay: string;
  details: PlanDetail[];
}

export interface MerchantFormData {
  companyName: string;
  taxId: string;
  representative: string;
  phone: string;
  email: string;
  selectedPlanId: string;
  signature: string | null; // Base64 string
}
