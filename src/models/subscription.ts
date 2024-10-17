export type Subscription = {
  id: string;
  startDate: Date;
  endDate: Date;
  paymentDate?: Date;
  status: SubscriptionStatus;
};

export type SubscriptionStatus =
  | "started"
  | "expiresSoon"
  | "expired"
  | "lateExpired"
  | "ended";

export enum SubscriptionType {
  QUARTERLY = "quaterly",
  YEARLY = "yearly",
}
