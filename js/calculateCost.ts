// calculate costs of flight legs and routes

export function calculateLeg( distance: number, flightTime: number ): number {
  const cost = distance * 15 + flightTime * 30

  return parseFloat(cost.toFixed(2))
}