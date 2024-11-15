import { SubscriptionForm } from "../components/elements/modals/AddSubscriptionModal";
import { Member } from "../models/member";
import { Depencencies } from "../repositories/dependencies";
import { getEndDate } from "./subscription.service";

export const getMembers = async (
  dependencies: Depencencies
): Promise<Member[]> => {
  const membersList = await dependencies.memberRepository.getMembers();
  return membersList
    ?.sort((a: Member, b: Member) => a?.firstname.localeCompare(b?.firstname))
    ?.map((u: Member) => {
      // We take only the subscriptions that are not ended
      // and we order them by endDate descending
      const subs = u.subscriptions?.filter((s) => s.endDate > new Date());
      u.subscriptions = subs?.sort(
        (a, b) => b.endDate.getTime() - a.endDate.getTime()
      );
      return u;
    });
};

export const updateMember =
  (dependencies: Depencencies) =>
  async (member: Member): Promise<Member> => {
    return await dependencies.memberRepository.updateMember(member);
  };

export const getMember =
  (dependencies: Depencencies) =>
  async (id: number): Promise<Member> => {
    return await dependencies.memberRepository.getMember(id);
  };

export const deleteMember =
  (dependencies: Depencencies) =>
  async (id: number): Promise<Member> => {
    return await dependencies.memberRepository.deleteMember(id);
  };

export const addSubscription =
  (dependencies: Depencencies) =>
  async (member: Member, subscription: SubscriptionForm): Promise<Member> => {
    const endDate = getEndDate(subscription.startDate, subscription.duration);
    return await dependencies.memberRepository.addSubscription(
      member,
      subscription,
      endDate
    );
  };

export const deleteSubscription =
  (dependencies: Depencencies) =>
  async (member: Member): Promise<Member> => {
    return await dependencies.memberRepository.deleteSubscription(member);
  };
