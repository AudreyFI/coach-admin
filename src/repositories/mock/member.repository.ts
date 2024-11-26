import { SubscriptionForm } from "../../components/elements/modals/AddSubscriptionModal";
import { CustomerSubscription } from "../../models/customer-subscription";
import { Member } from "../../models/member";
import { MemberRepository } from "../member.repository.interface";

const MEMBERS = await import(
  `../${import.meta.env.VITE_MOCK_MEMBERS_FILE}`
).then((module) => module.MEMBERS);
let membersList = MEMBERS;

export const MemberMockRepository: MemberRepository = {
  getMembers: async (): Promise<Member[]> => {
    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve(membersList);
      }, 1000);
    });
  },
  getMember: async (id: string): Promise<Member> => {
    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve(membersList.find((u: Member) => u.id === id));
      }, 1000);
    });
  },
  updateMember: async (member: Member): Promise<Member> => {
    return await new Promise((resolve) => {
      setTimeout(() => {
        if (!member.id) {
          member.id = membersList.length + 1;
          member.subscriptions = [];
          membersList.push(member);
        } else {
          membersList = membersList.map((u: Member) => {
            if (u.id === member.id) {
              u = { ...member };
            }
            return u;
          });
        }

        resolve(member);
      }, 1000);
    });
  },
  deleteMember: async (id: string): Promise<Member> => {
    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve((membersList = membersList.filter((u: Member) => u.id != id)));
      }, 1000);
    });
  },
  addSubscription: async (
    memberId: string,
    subscription: SubscriptionForm
  ): Promise<Member[]> => {
    return await new Promise((resolve) => {
      setTimeout(() => {
        membersList = membersList.map((u: Member) => {
          if (u.id === memberId) {
            u.subscriptions?.push({
              id: "sub_" + u.subscriptions.length + 1,
              startDate: subscription.startDate,
              endDate: subscription.endDate,
              status: "started",
            });
          }
          return u;
        });
        resolve(membersList);
      }, 1000);
    });
  },
  updateSubscription: async (
    subscription: CustomerSubscription
  ): Promise<Member[]> => {
    return await new Promise((resolve) => {
      setTimeout(() => {
        membersList = membersList.map((u: Member) => {
          if (u.id === subscription.customerId) {
            u.subscriptions?.map((s) => {
              if (s.id === subscription.subscriptionId) {
                s.amount = subscription.amount;
                s.paymentDate = subscription.paymentDate;
              }
              return s;
            });
          }
          return u;
        });
        resolve(membersList);
      }, 1000);
    });
  },
  deleteSubscription: async (memberId: string): Promise<Member[]> => {
    return await new Promise((resolve) => {
      setTimeout(() => {
        membersList = membersList.map((u: Member) => {
          if (u.id === memberId) {
            if (u.subscriptions?.length) {
              u.subscriptions?.shift();
            } else {
              console.log("No subscription to delete");
            }
          }
          return u;
        });
        resolve(membersList);
      }, 1000);
    });
  },
};
