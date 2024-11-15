import { SubscriptionForm } from "../components/elements/modals/AddSubscriptionModal";
import { Member } from "../models/member";

export interface MemberRepository {
  getMembers(): Promise<Member[]>;
  getMember(id: number): Promise<Member>;
  updateMember(member: Member): Promise<Member>;
  deleteMember(id: number): Promise<Member>;
  addSubscription(
    member: Member,
    subscription: SubscriptionForm,
    endDate?: Date
  ): Promise<Member>;
  deleteSubscription(member: Member, subscriptionId?: number): Promise<Member>;
}
