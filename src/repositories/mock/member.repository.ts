import { SubscriptionForm } from "../../components/elements/modals/AddSubscriptionModal";
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
  getMember: async (id: number): Promise<Member> => {
    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve(membersList.find((u: Member) => u.id === id));
      }, 1000);
    });
  },
  updateMember: async (member: Member): Promise<Member> => {
    return await new Promise((resolve) => {
      setTimeout(() => {
        membersList = membersList.map((u: Member) => {
          if (u.id === member.id) {
            u.firstname = member.firstname;
            u.lastname = member.lastname;
            u.email = member.email;
            if (member.subscriptions?.[0]?.endDate && u.subscriptions?.[0]) {
              u.subscriptions[0].endDate = member.subscriptions[0].endDate;
            }
          }
          return u;
        });
        resolve(member);
      }, 1000);
    });
  },
  deleteMember: async (id: number): Promise<Member> => {
    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve((membersList = membersList.filter((u: Member) => u.id != id)));
      }, 1000);
    });
  },
  addSubscription: async (
    member: Member,
    subscription: SubscriptionForm,
    endDate?: Date
  ): Promise<Member> => {
    return await new Promise((resolve) => {
      setTimeout(() => {
        membersList = membersList.map((u: Member) => {
          if (u.id === member.id) {
            u.subscriptions?.push({
              id: "sub_" + u.subscriptions.length + 1,
              startDate: subscription.startDate,
              type: subscription.duration,
              endDate: endDate || new Date(), // won't be stored
              status: "started",
            });
          }
          return u;
        });
        console.log("addmemberSubscription", membersList);
        resolve(member);
      }, 1000);
    });
  },
  deleteSubscription: async (
    member: Member,
    subscriptionId?: number
  ): Promise<Member> => {
    return await new Promise((resolve) => {
      setTimeout(() => {
        membersList = membersList.map((u: Member) => {
          if (u.id === member.id) {
            if (u.subscriptions?.length) {
              u.subscriptions?.shift();
            } else {
              console.log("No subscription to delete");
            }
          }
          return u;
        });
        console.log("deleteSubscription", membersList);
        resolve(member);
      }, 1000);
    });
  },
};
