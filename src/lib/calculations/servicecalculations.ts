export function calculateMovingCost(distanceKm: number, bedrooms: number): { cost: number } {
  // Simple formula: base $100 + $2/km + $50 per bedroom
  const base = 100;
  const perKm = 2;
  const perBedroom = 50;
  const cost = base + distanceKm * perKm + bedrooms * perBedroom;
  return { cost };
}
