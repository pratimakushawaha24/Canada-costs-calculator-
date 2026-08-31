import { CalculatorDefinition } from '@/lib/types';
import { calculateTax } from '@/lib/calculations/taxCalculations';
import { calculateMortgage } from '@/lib/calculations/mortgageCalculations';
import { calculateMovingCost } from '@/lib/calculations/serviceCalculations';

// Example: salary-after-tax
const salaryAfterTax: CalculatorDefinition = {
  slug: 'salary-after-tax',
  name: 'Canada Salary After Tax Calculator',
  category: 'salary',
  description: 'Estimate your take-home pay after federal and provincial taxes.',
  longDescription: '...',
  howItWorks: '...',
  inputFields: [
    {
      id: 'annualSalary',
      label: 'Annual Salary ($)',
      type: 'number',
      placeholder: 'e.g. 60000',
      min: 0,
      required: true,
    },
    {
      id: 'province',
      label: 'Province',
      type: 'select',
      options: [
        { label: 'Alberta', value: 'AB' },
        { label: 'British Columbia', value: 'BC' },
        { label: 'Ontario', value: 'ON' },
        // ... more provinces
      ],
      defaultValue: 'ON',
      required: true,
    },
    {
      id: 'year',
      label: 'Tax Year',
      type: 'select',
      options: [
        { label: '2025', value: 2025 },
        { label: '2024', value: 2024 },
      ],
      defaultValue: 2025,
    },
  ],
  calculate: (inputs) => {
    const { annualSalary, province, year } = inputs;
    const result = calculateTax(annualSalary, province, year);
    return {
      value: result.netIncome,
      formatted: `$${result.netIncome.toFixed(2)}`,
      description: `Estimated after-tax income for ${province} in ${year}.`,
      breakdown: {
        gross: { value: annualSalary, label: 'Gross Income' },
        tax: { value: result.totalTax, label: 'Total Tax' },
        net: { value: result.netIncome, label: 'Net Income' },
      },
    };
  },
  exampleInputs: { annualSalary: 60000, province: 'ON', year: 2025 },
  faqs: [
    {
      question: 'Is this calculator accurate?',
      answer: 'It provides estimates based on current tax rates. Actual amounts may differ.',
    },
  ],
  relatedCalculators: ['gst-hst', 'hourly-to-annual', 'overtime'],
  seo: {
    title: 'Canada Salary After Tax Calculator – Estimate Take-Home Pay',
    description: 'Calculate your net income after federal and provincial taxes.',
  },
};

// Mortgage calculator
const mortgage: CalculatorDefinition = {
  slug: 'mortgage',
  name: 'Mortgage Payment Calculator',
  category: 'loan',
  description: 'Estimate your monthly mortgage payments in Canada.',
  inputFields: [
    {
      id: 'homePrice',
      label: 'Home Price ($)',
      type: 'number',
      placeholder: 'e.g. 500000',
      required: true,
    },
    {
      id: 'downPayment',
      label: 'Down Payment ($)',
      type: 'number',
      placeholder: 'e.g. 100000',
      required: true,
    },
    {
      id: 'interestRate',
      label: 'Annual Interest Rate (%)',
      type: 'number',
      step: 0.01,
      placeholder: 'e.g. 5.5',
      required: true,
    },
    {
      id: 'amortizationYears',
      label: 'Amortization (years)',
      type: 'number',
      placeholder: 'e.g. 25',
      defaultValue: 25,
    },
  ],
  calculate: (inputs) => {
    const result = calculateMortgage(inputs);
    return {
      value: result.monthlyPayment,
      formatted: `$${result.monthlyPayment.toFixed(2)}`,
      description: 'Estimated monthly mortgage payment (principal + interest).',
      breakdown: {
        principal: { value: result.principal, label: 'Loan Principal' },
        monthly: { value: result.monthlyPayment, label: 'Monthly Payment' },
      },
    };
  },
  faqs: [],
  relatedCalculators: ['rent-affordability'],
  seo: { title: 'Mortgage Payment Calculator Canada' },
};

// Moving cost calculator (simplified)
const movingCost: CalculatorDefinition = {
  slug: 'moving-cost',
  name: 'Moving Cost Calculator',
  category: 'service',
  description: 'Estimate the cost of moving within or between Canadian cities.',
  inputFields: [
    {
      id: 'distanceKm',
      label: 'Distance (km)',
      type: 'number',
      placeholder: 'e.g. 300',
      required: true,
    },
    {
      id: 'bedrooms',
      label: 'Number of Bedrooms',
      type: 'select',
      options: [
        { label: 'Studio', value: 0 },
        { label: '1', value: 1 },
        { label: '2', value: 2 },
        { label: '3', value: 3 },
        { label: '4+', value: 4 },
      ],
      defaultValue: 1,
    },
  ],
  calculate: (inputs) => {
    const result = calculateMovingCost(inputs.distanceKm, inputs.bedrooms);
    return {
      value: result.cost,
      formatted: `$${result.cost.toFixed(0)}`,
      description: 'Estimated cost for a professional moving service.',
    };
  },
  faqs: [],
  relatedCalculators: ['renovation-cost', 'house-cleaning'],
  seo: { title: 'Moving Cost Calculator Canada' },
};

// GST/HST calculator
const gstHst: CalculatorDefinition = {
  slug: 'gst-hst',
  name: 'Canada GST/HST Calculator',
  category: 'tax',
  description: 'Calculate the GST/HST tax amount for any purchase in Canada.',
  inputFields: [
    {
      id: 'amount',
      label: 'Amount ($)',
      type: 'number',
      placeholder: 'e.g. 100',
      required: true,
    },
    {
      id: 'province',
      label: 'Province',
      type: 'select',
      options: [
        { label: 'Alberta (5%)', value: 'AB' },
        { label: 'British Columbia (12%)', value: 'BC' },
        { label: 'Ontario (13%)', value: 'ON' },
        // ... all provinces with rates
      ],
      defaultValue: 'ON',
    },
  ],
  calculate: (inputs) => {
    // For simplicity, we'll use hardcoded rates; we could import from tax config
    const rates: Record<string, number> = {
      AB: 0.05,
      BC: 0.12,
      ON: 0.13,
      // ... others
    };
    const rate = rates[inputs.province] || 0.13;
    const tax = inputs.amount * rate;
    const total = inputs.amount + tax;
    return {
      value: { tax, total },
      formatted: `Tax: $${tax.toFixed(2)} | Total: $${total.toFixed(2)}`,
      description: `GST/HST at ${rate * 100}% for ${inputs.province}.`,
      breakdown: {
        tax: { value: tax, label: 'Tax Amount' },
        total: { value: total, label: 'Total with Tax' },
      },
    };
  },
  faqs: [],
  relatedCalculators: ['salary-after-tax'],
  seo: { title: 'GST/HST Calculator Canada' },
};

// Export all calculators
export const calculators: CalculatorDefinition[] = [
  salaryAfterTax,
  mortgage,
  movingCost,
  gstHst,
  // ... add more as needed
];

// Helper to get calculator by slug
export function getCalculatorBySlug(slug: string): CalculatorDefinition | undefined {
  return calculators.find((c) => c.slug === slug);
    }
