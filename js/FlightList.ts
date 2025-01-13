import { Flights } from './types'

// Manages edges in an adjacency list.
// Implements adding and updating flights and retrieving entire list

export class FlightList {
  private flights: Flights = {};

  addOrUpdateFlight(
    origin: string, 
    destination: string, 
    distance: number, 
    time: number): void {

      if (!this.flights[origin]) {
        this.flights[origin] = [];
      }

      const legIndex = this.flights[origin].findIndex(
        leg => leg.destination === destination
      )

      if (legIndex >= 0) {
        this.flights[origin][legIndex].distance = distance
        this.flights[origin][legIndex].time = time
      } else {
        this.flights[origin].push({ destination, distance, time })
      }
  }

  getFlights(): Flights {
    return this.flights
  }
}