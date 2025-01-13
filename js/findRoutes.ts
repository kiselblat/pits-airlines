import { Flights, Route } from './types'
import { calculateLeg } from './calculateCost'

export function allPaths(
  flights: Flights,
  origin: string,
  destination: string
): Route[] {

  const results: Route[] = []

  function search(
    city: string,
    destination: string,
    path: string[],
    totalCost: number
  ) {
    if (city === destination) {
      results.push({
        cities: [...path],
        cost: parseFloat(totalCost.toFixed(2)),
      })
      return
    }

    if (!flights[city]) {
      return
    }

    for (const leg of flights[city]) {
      const next = leg.destination
      if (!path.includes(next)) {
        const legCost = calculateLeg(leg.distance, leg.time)
        search(next, destination, [...path, next], totalCost + legCost)
      }
    }
  }

  search(origin, destination, [origin], 0)

  return results;
}