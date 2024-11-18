export type Subscription = {
  id?: string;
  startDate: Date;
  type?: SubscriptionType;
  endDate: Date;
  paymentDate?: Date;
  status: SubscriptionStatus;
  amount?: number;
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
