const USERS = await import(`../${import.meta.env.VITE_MOCK_USERS_FILE}`).then(
  (module) => module.USERS
);
import { Subscription } from "./subscription";

export type User = {
  id: number;
  firstname: string;
  lastname?: string;
  email: string;
  subscriptions?: Subscription[];
};

export { USERS };
