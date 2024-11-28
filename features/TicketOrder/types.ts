export interface TierCount {
  tierId: string;
  count: number;
}

export interface Tier {
  id: string;
  name: string;
  price: number;
  currency: string;
}

export interface TierQuantity {
  [K: string]: number;
}