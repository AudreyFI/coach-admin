import { SubscriptionForm } from "../components/elements/modals/AddSubscriptionModal";
import { CustomerSubscription } from "../models/customer-subscription";
import { Member } from "../models/member";
import { Depencencies } from "../repositories/dependencies";

export const getMembers = async (
  dependencies: Depencencies
): Promise<Member[]> => {
  const membersList = await dependencies.memberRepository.getMembers();
  return membersList
    ?.sort((a: Member, b: Member) => a?.firstname.localeCompare(b?.firstname))
    ?.map((u: Member) => {
      // We take only the subscriptions that are not ended
      // and we order them by endDate descending
      const subs = u.subscriptions
        ?.map((s) => {
          const end = new Date(s.endDate);
          s.endDate = end;
          return s;
        })
        ?.filter((s) => s.endDate > new Date());
      u.subscriptions = subs?.sort(
        (a, b) => b.endDate.getTime() - a.endDate.getTime()
      );
      return u;
    });
};

export const updateMember =
  (dependencies: Depencencies) =>
  async (member: Member): Promise<Member | void> => {
    return await dependencies.memberRepository.updateMember(member);
  };

export const getMember =
  (dependencies: Depencencies) =>
  async (id: string): Promise<Member> => {
    return await dependencies.memberRepository.getMember(id);
  };

export const deleteMember =
  (dependencies: Depencencies) =>
  async (id: string): Promise<Member> => {
    return await dependencies.memberRepository.deleteMember(id);
  };

export const addSubscription =
  (dependencies: Depencencies) =>
  async (
    memberId: string,
    subscription: SubscriptionForm
  ): Promise<Member[]> => {
    return await dependencies.memberRepository.addSubscription(
      memberId,
      subscription
    );
  };

export const updateSubscription =
  (dependencies: Depencencies) =>
  async (subscription: CustomerSubscription): Promise<Member[]> => {
    return await dependencies.memberRepository.updateSubscription(subscription);
  };

export const deleteSubscription =
  (dependencies: Depencencies) =>
  async (memberId: string, customerId: string): Promise<Member[]> => {
    return await dependencies.memberRepository.deleteSubscription(
      memberId,
      customerId
    );
  };
