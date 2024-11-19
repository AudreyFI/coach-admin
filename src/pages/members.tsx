import { ChangeEvent, useEffect, useState } from "react";
import Button from "../components/elements/Button";
import AddSubscriptionModal, {
  SubscriptionForm,
} from "../components/elements/modals/AddSubscriptionModal";
import DeleteModal from "../components/elements/modals/DeleteModal";
import EditMemberModal from "../components/elements/modals/EditMemberModal";
import PayMemberModal from "../components/elements/modals/PayMemberModal";
import Search from "../components/elements/Search";
import { Action, ActionType } from "../components/elements/TableAction";
import MemberTable from "../components/elements/tables/MemberTable";
import { CustomerSubscription } from "../models/customer-subscription";
import { Member } from "../models/member";
import { dependencies } from "../repositories/dependencies";
import {
  addSubscription,
  deleteMember,
  deleteSubscription,
  getMembers,
  updateMember,
  updateSubscription,
} from "../services/member.service";

const Members = () => {
  const [memberData, setMemberData] = useState<Member[]>([]);
  const [filteredMemberData, setFilteredMemberData] = useState<Member[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>();
  const [currentMember, setCurrentMember] = useState<Member>();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPayModal, setShowPayModal] = useState(false);
  const [showAddSubscriptionModal, setShowAddSubscriptionModal] =
    useState(false);
  const [showDeleteSubscriptionModal, setShowDeleteSubscriptionModal] =
    useState(false);

  useEffect(() => {
    const fetchMembers = async () => {
      const memberList: Member[] = await getMembers(dependencies);
      setMemberData(memberList);
      setMemberDataWithSearchField([...memberList]);
    };
    fetchMembers();
  }, [
    setCurrentMember,
    showEditModal,
    showDeleteModal,
    showPayModal,
    showAddSubscriptionModal,
    showDeleteSubscriptionModal,
  ]);

  const tableActions: Action<Member>[] = [
    {
      name: ActionType.EDIT,
      target: "member",
      fn: () => setShowEditModal(true),
      stateFn: (member: Member) => setCurrentMember(member),
      displayFn: (member: Member) => !!member,
    },
    {
      name: ActionType.DELETE,
      target: "member",
      fn: () => setShowDeleteModal(true),
      stateFn: (member: Member) => setCurrentMember(member),
      displayFn: (member: Member) => !!member,
    },
    {
      name: ActionType.ADD_SUBSCRIPTION,
      target: "subscription",
      fn: () => setShowAddSubscriptionModal(true),
      stateFn: (member: Member) => setCurrentMember(member),
      displayFn: (member: Member) =>
        !member.subscriptions?.length ||
        (!!member.subscriptions?.[0]?.paymentDate &&
          member.subscriptions?.[0]?.paymentDate <= new Date()),
      // It is not possible to add a subscription if the last one is not paid
    },
    {
      name: ActionType.PAY_SUBSCRIPTION,
      target: "subscription",
      fn: () => setShowPayModal(true),
      stateFn: (member: Member) => setCurrentMember(member),
      displayFn: (member: Member) =>
        !!member.subscriptions?.[0] && !member.subscriptions?.[0]?.paymentDate,
    },
    {
      name: ActionType.DELETE_SUBSCRIPTION,
      target: "subscription",
      fn: () => setShowDeleteSubscriptionModal(true),
      stateFn: (member: Member) => setCurrentMember(member),
      displayFn: (member: Member) => !!member.subscriptions?.[0],
    },
  ];

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value?.toLowerCase();
    setSearchTerm(search);
    setMemberDataWithSearchField([...memberData], search);
  };

  const setMemberDataWithSearchField = (
    members: Member[],
    search = searchTerm
  ) => {
    const filteredData = !search
      ? members
      : members.filter(
          (member) =>
            member.firstname.toLowerCase().includes(search) ||
            member.lastname?.toLowerCase().includes(search)
        );
    setFilteredMemberData(filteredData);
  };

  const showNewMemberModal = () => {
    setCurrentMember(undefined);
    setShowEditModal(true);
  };

  const submitDeleteMemberModal = async () => {
    if (!currentMember?.id) return;
    await deleteMember(dependencies)(currentMember.id);
    setShowDeleteModal(false);
  };

  const updateMemberModal = async (data: Member) => {
    await updateMember(dependencies)(data);
    setShowEditModal(false);
  };

  const addMemberSubscriptionModal = async (data: SubscriptionForm) => {
    if (!currentMember?.id) return;
    await addSubscription(dependencies)(currentMember.id, data);
    setShowAddSubscriptionModal(false);
  };

  const updateMemberSubscriptionModal = async (data: CustomerSubscription) => {
    await updateSubscription(dependencies)(data);
    setShowPayModal(false);
  };

  const submitDeleteSubscriptionModal = async () => {
    if (!currentMember?.id || !currentMember.subscriptions?.[0]?.id) return;
    await deleteSubscription(dependencies)(
      currentMember.id,
      currentMember.subscriptions[0].id
    );
    setShowDeleteSubscriptionModal(false);
  };

  const additionalAction = <Button name="+" onClick={showNewMemberModal} />;

  return (
    <>
      <Search onSearch={onSearch} additionalAction={additionalAction} />

      <div className="h-full w-full object-cover">
        <MemberTable data={filteredMemberData} actions={tableActions} />
      </div>

      {showEditModal && (
        <EditMemberModal
          hideModal={() => setShowEditModal(false)}
          submit={(formdata: Member) => {
            updateMemberModal(formdata);
          }}
          member={currentMember}
        />
      )}
      {showDeleteModal && (
        <DeleteModal
          content="Etes-vous sûr(e) de vouloir supprimer cet utilisateur ?"
          hideModal={() => setShowDeleteModal(false)}
          submit={() => submitDeleteMemberModal()}
        />
      )}
      {showPayModal && (
        <PayMemberModal
          hideModal={() => setShowPayModal(false)}
          submit={(formdata: CustomerSubscription) => {
            updateMemberSubscriptionModal(formdata);
          }}
          member={currentMember}
        />
      )}
      {showAddSubscriptionModal && (
        <AddSubscriptionModal
          hideModal={() => setShowAddSubscriptionModal(false)}
          submit={(formdata: SubscriptionForm) => {
            addMemberSubscriptionModal(formdata);
          }}
          member={currentMember}
        />
      )}
      {showDeleteSubscriptionModal && (
        <DeleteModal
          content="Etes-vous sûr(e) de vouloir supprimer cet abonnement ?"
          hideModal={() => setShowDeleteSubscriptionModal(false)}
          submit={() => submitDeleteSubscriptionModal()}
        />
      )}
    </>
  );
};

export default Members;
