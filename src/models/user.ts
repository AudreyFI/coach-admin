export type User = {
  id: number;
  firstname: string;
  lastname: string;
  email?: string;
};
export const USERS: User[] = [];