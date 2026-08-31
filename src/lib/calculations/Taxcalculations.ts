interface TaxResult {
  netIncome: number;
  totalTax: number;
  taxBreakdown: Record<string, number>;
}

// Placeholder - you should expand with full tax tables
const federalBrackets2025 = [
  { rate: 0.15, max: 55867 },
  { rate: 0.205, max: 111733 },
  { rate: 0.26, max: 173205 },
  { rate: 0.29, max: 246752 },
  { rate: 0.33, max: Infinity },
];

// Provincial rates (simplified - only a few provinces)
const provincialRates: Record<string, { brackets: { rate: number; max: number }[]; basicPersonalAmount: number }> = {
  ON: {
    brackets: [
      { rate: 0.0505, max: 49231 },
      { rate: 0.0915, max: 98463 },
      { rate: 0.1116, max: 150000 },
      { rate: 0.1216, max: 220000 },
      { rate: 0.1316, max: Infinity },
    ],
    basicPersonalAmount: 11959,
  },
  BC: {
    brackets: [
      { rate: 0.0506, max: 45654 },
      { rate: 0.077, max: 91310 },
      { rate: 0.105, max: 104835 },
      { rate: 0.1229, max: 127299 },
      { rate: 0.147, max: 172602 },
      { rate: 0.168, max: 240716 },
      { rate: 0.205, max: Infinity },
    ],
    basicPersonalAmount: 11981,
  },
  AB: {
    brackets: [
      { rate: 0.10, max: 148269 },
      { rate: 0.12, max: 177922 },
      { rate: 0.13, max: 237131 },
      { rate: 0.14, max: 316189 },
      { rate: 0.15, max: Infinity },
    ],
    basicPersonalAmount: 21376,
  },
};

export function calculateTax(
  annualSalary: number,
  province: string,
  year: number
): TaxResult {
  // For simplicity, we assume year 2025 rates.
  // In production, you'd have a year lookup.
  const fed = federalBrackets2025;
  const prov = provincialRates[province];
  if (!prov) throw new Error(`Unknown province: ${province}`);

  // Calculate federal tax
  let federalTax = 0;
  let remaining = annualSalary;
  for (const bracket of fed) {
    const taxable = Math.min(remaining, bracket.max);
    federalTax += taxable * bracket.rate;
    remaining -= taxable;
    if (remaining <= 0) break;
  }

  // Provincial tax
  let provincialTax = 0;
  remaining = annualSalary;
  for (const bracket of prov.brackets) {
    const taxable = Math.min(remaining, bracket.max);
    provincialTax += taxable * bracket.rate;
    remaining -= taxable;
    if (remaining <= 0) break;
  }

  // Basic personal amount reduces tax
  // (simplified: we subtract a fixed amount from tax)
  const bpa = prov.basicPersonalAmount;
  // We'll apply BPA as a reduction: subtract (bpa * lowest rate) from each tax
  // This is simplified; real calculation is more complex.
  // Instead, we'll compute net income = gross - (federal + provincial - credits)
  // For demonstration, we'll not fully implement credits.
  const totalTax = federalTax + provincialTax;
  const netIncome = annualSalary - totalTax;

  return {
    netIncome,
    totalTax,
    taxBreakdown: {
      federal: federalTax,
      provincial: provincialTax,
    },
  };
}
