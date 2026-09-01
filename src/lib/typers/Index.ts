export interface FAQ {
  question: string;
  answer: string;
}

export interface SEOData {
  title?: string;
  description?: string;
  keywords?: string[];
  canonicalUrl?: string;
  noIndex?: boolean;
}

export interface CalculatorDefinition {
  slug: string;
  name: string;
  category: 'tax' | 'home' | 'salary' | 'loan' | 'service' | 'other';
  description: string;
  longDescription?: string;
  howItWorks?: string;
  inputFields: CalculatorInputField[];
  calculate: (inputs: Record<string, number>) => CalculatorResult;
  exampleInputs?: Record<string, number>;
  faqs: FAQ[];
  relatedCalculators?: string[];
  relatedGuides?: string[];
  seo: SEOData;
}

export interface CalculatorInputField {
  id: string;
  label: string;
  type: 'number' | 'select' | 'range';
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number | string;
  options?: { label: string; value: string | number }[];
  required?: boolean;
  validation?: (value: number | string) => string | null;
}

export interface CalculatorResult {
  value: number | string | Record<string, number | string>;
  formatted: string | Record<string, string>;
  description: string;
  breakdown?: Record<string, { value: number; label: string }>;
}

export interface ServiceDefinition {
  slug: string;
  name: string;
  category: string;
  description: string;
  averageCostRange: { min: number; max: number; currency: 'CAD' };
  factors: string[];
  tips: string[];
  faqs: FAQ[];
  relatedCalculators?: string[];
  relatedCities?: string[];
  seo: SEOData;
}

export interface CityDefinition {
  slug: string;
  name: string;
  province: string;
  description: string;
  population?: number;
  costOfLivingIndex?: number;
  popularServices?: string[];
  featuredCalculators?: string[];
  seo: SEOData;
}

export interface GuideArticle {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  author: string;
  publishDate: string;
  updatedDate?: string;
  category: string;
  tags: string[];
  faqs: FAQ[];
  relatedCalculators?: string[];
  relatedGuides?: string[];
  relatedCities?: string[];
  seo: SEOData;
}
