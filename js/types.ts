export interface Leg {
  destination: string;
  distance: number;
  time: number;
}

export interface Flights {
  [origin: string]: Leg[];
}

export interface ParsedCommand {
  command: string;
  params: string[];
}

export interface Route {
  cities: string[];
  cost: number;
}