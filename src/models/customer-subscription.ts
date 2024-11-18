import { SubscriptionStatus } from "./subscription";

export interface CustomerSubscription {
  id?: string;
  customerId: string;
  subscriptionId?: string;
  status?: SubscriptionStatus;
  amount?: number;
  paymentDate?: Date;
  startDate?: Date;
  endDate?: Date;
}
