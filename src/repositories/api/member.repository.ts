import { SubscriptionForm } from "../../components/elements/modals/AddSubscriptionModal";
import { fetchWrapper } from "../../helpers/fetch.wrapper";
import { CustomerSubscription } from "../../models/customer-subscription";
import { Member } from "../../models/member";
import { MemberRepository } from "../member.repository.interface";

const RESOURCE = "customer";
const SUBSCRIPTION_RESOURCE = "customer-subscription";
const API_URL = import.meta.env.VITE_API_URL;

export const MemberApiRepository: MemberRepository = {
  getMembers: async function () {
    const response = await fetch(`${API_URL}/${RESOURCE}`);
    return await response.json();
  },
  getMember: async function (id: string) {
    const response = await fetch(`${API_URL}/${RESOURCE}/${id}`);
    return await response.json();
  },
  updateMember: async function (member: Member) {
    if (!member.id) {
      return await fetchWrapper(`${API_URL}/${RESOURCE}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(member),
      });
    } else {
      return await fetchWrapper(`${API_URL}/${RESOURCE}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(member),
      });
    }
  },
  deleteMember: async function (id: string) {
    return await fetchWrapper(`${API_URL}/${RESOURCE}/${id}`, {
      method: "DELETE",
    });
  },
  addSubscription: async function (
    memberId: string,
    subscription: SubscriptionForm
  ) {
    return await fetchWrapper(`${API_URL}/${SUBSCRIPTION_RESOURCE}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...subscription, customerId: memberId }),
    });
  },
  updateSubscription: async function (subscription: CustomerSubscription) {
    return await fetchWrapper(`${API_URL}/${SUBSCRIPTION_RESOURCE}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(subscription),
    });
  },
  deleteSubscription: async function (
    memberId: string,
    subscriptionId: string
  ) {
    return await fetchWrapper(
      `${API_URL}/${SUBSCRIPTION_RESOURCE}/?customerId=${memberId}&subscriptionId=${subscriptionId}`,
      {
        method: "DELETE",
      }
    );
  },
};
