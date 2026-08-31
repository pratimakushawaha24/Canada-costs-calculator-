interface MortgageInputs {
  homePrice: number;
  downPayment: number;
  interestRate: number;
  amortizationYears: number;
}

interface MortgageResult {
  monthlyPayment: number;
  principal: number;
}

export function calculateMortgage(inputs: MortgageInputs): MortgageResult {
  const { homePrice, downPayment, interestRate, amortizationYears } = inputs;
  const principal = homePrice - downPayment;
  if (principal <= 0) {
    return { monthlyPayment: 0, principal: 0 };
  }
  const monthlyRate = interestRate / 100 / 12;
  const numPayments = amortizationYears * 12;
  const monthlyPayment =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
    (Math.pow(1 + monthlyRate, numPayments) - 1);
  return { monthlyPayment, principal };
}
