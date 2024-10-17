import { User } from "../models/user";

export const PUBLIC_USERS_LIST: User[] = [
  {
    id: 1,
    firstname: "Firstname",
    lastname: "Lastname",
    email: "firstname.lastname@example.com",
    subscriptions: [
      {
        id: "sub_001",
        startDate: new Date("2023-01-01"),
        endDate: new Date("2023-12-31"),
        status: "started",
      },
    ],
  },
  {
    id: 2,
    firstname: "Firstname2",
    lastname: "Lastname2",
    email: "firstname2.lastname2@example.com",
    subscriptions: [],
  },
];
