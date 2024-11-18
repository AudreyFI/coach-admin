import { SubscriptionForm } from "../components/elements/modals/AddSubscriptionModal";
import { CustomerSubscription } from "../models/customer-subscription";
import { Member } from "../models/member";

export interface MemberRepository {
  getMembers(): Promise<Member[]>;
  getMember(id: string): Promise<Member>;
  updateMember(member: Member): Promise<Member>;
  deleteMember(id: string): Promise<Member>;
  addSubscription(
    memberId: string,
    subscription: SubscriptionForm
  ): Promise<Member[]>;
  updateSubscription(subscription: CustomerSubscription): Promise<Member[]>;
  deleteSubscription(
    memberId: string,
    subscriptionId?: string
  ): Promise<Member[]>;
}
