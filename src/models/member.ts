import { Subscription } from "./subscription";

export type Member = {
  id?: number | undefined;
  firstname: string;
  lastname?: string;
  email: string;
  subscriptions?: Subscription[];
};
