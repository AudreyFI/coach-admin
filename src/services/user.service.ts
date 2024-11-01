import { USERS, User } from "../models/user";

// This is temporary because we're not connected to the backend
let usersList = USERS;

export const getUsers = async (): Promise<User[]> => {
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        usersList
          ?.sort((a: User, b: User) => a?.firstname.localeCompare(b?.firstname))
          ?.map((u: User) => {
            u.subscriptions?.sort((a, b) => (a.endDate > b.endDate ? 1 : -1));
            return u;
          })
      );
    }, 1000);
  });
};

export const updateUser = async (user: User): Promise<User> => {
  return await new Promise((resolve) => {
    setTimeout(() => {
      usersList = usersList.map((u: User) => {
        if (u.id === user.id) {
          u.firstname = user.firstname;
          u.lastname = user.lastname;
          u.email = user.email;
          if (user.subscriptions?.[0]?.endDate && u.subscriptions?.[0]) {
            u.subscriptions[0].endDate = user.subscriptions[0].endDate;
          }
        }
        return u;
      });
      console.log(usersList);
      resolve(user);
    }, 1000);
  });
};

export const getUser = async (id: number): Promise<User> => {
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve(usersList.find((u: User) => u.id === id));
    }, 1000);
  });
};
