import { Subscription } from "./subscription";

export type Member = {
  id?: string | undefined;
  firstname: string;
  lastname?: string;
  email: string;
  subscriptions?: Subscription[];
};
