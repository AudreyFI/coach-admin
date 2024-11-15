import { Member } from "../../models/member";
import { MemberRepository } from "../member.repository.interface";

const RESOURCE = "customer";
const API_URL = import.meta.env.VITE_API_URL;

export const MemberApiRepository: MemberRepository = {
  getMembers: async function () {
    const response = await fetch(`${API_URL}/${RESOURCE}`);
    return await response.json();
  },
  getMember: async function (id: number) {
    const response = await fetch(`${API_URL}/${RESOURCE}/${id}`);
    return await response.json();
  },
  updateMember: async function (member: Member) {
    const response = await fetch(`${API_URL}/${RESOURCE}/${member.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(member),
    });
    return await response.json();
  },
  deleteMember: async function (id) {
    const response = await fetch(`${API_URL}/${RESOURCE}/${id}`, {
      method: "DELETE",
    });
    return await response.json();
  },
  addSubscription: async function (member: Member, subscription) {
    const response = await fetch(
      `${API_URL}/${RESOURCE}/${member.id}/subscriptions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(subscription),
      }
    );
    return await response.json();
  },
  deleteSubscription: async function (member: Member, subscriptionId) {
    const response = await fetch(
      `${API_URL}/${RESOURCE}/${member.id}/subscriptions/${subscriptionId}`,
      {
        method: "DELETE",
      }
    );
    return await response.json();
  },
};
