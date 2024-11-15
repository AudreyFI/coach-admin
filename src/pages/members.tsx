import { ChangeEvent, useEffect, useState } from "react";
import Button from "../components/elements/Button";
import Input from "../components/elements/Input";
import AddSubscriptionModal, {
  SubscriptionForm,
} from "../components/elements/modals/AddSubscriptionModal";
import DeleteModal from "../components/elements/modals/DeleteModal";
import EditMemberModal from "../components/elements/modals/EditMemberModal";
import PayMemberModal from "../components/elements/modals/PayMemberModal";
import { Action, ActionType } from "../components/elements/TableAction";
import MemberTable from "../components/elements/tables/MemberTable";
import { Member } from "../models/member";
import { dependencies } from "../repositories/dependencies";
import {
  addSubscription,
  deleteMember,
  deleteSubscription,
  getMembers,
  updateMember,
} from "../services/member.service";

const Members = () => {
  const [memberData, setMemberData] = useState<Member[]>([]);
  const [filteredMemberData, setFilteredmemberData] = useState<Member[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>();
  const [currentMember, setCurrentMember] = useState<Member>();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPayModal, setShowPayModal] = useState(false);
  const [showAddSubscriptionModal, setShowAddSubscriptionModal] =
    useState(false);
  const [showDeleteSubscriptionModal, setShowDeleteSubscriptionModal] =
    useState(false);
  const [showNewSubModal, setShowNewSubModal] = useState(false);

  useEffect(() => {
    const fetchMembers = async () => {
      const memberList: Member[] = await getMembers(dependencies);
      setMemberData(memberList);
      setMemberDataWithSearchField([...memberList]);
    };
    fetchMembers();
  }, [showEditModal, showDeleteModal, showAddSubscriptionModal]);

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
    setFilteredmemberData(filteredData);
  };

  const submitDeletememberModal = async () => {
    if (!currentMember?.id) return;
    await deleteMember(dependencies)(currentMember.id);
    setShowDeleteModal(false);
  };

  const updateMemberModal = async (data: Member) => {
    await updateMember(dependencies)(data);
  };

  const addMemberSubscriptionModal = async (data: SubscriptionForm) => {
    if (!currentMember) return;
    await addSubscription(dependencies)(currentMember, data);
  };

  const submitDeleteSubscriptionModal = async () => {
    if (!currentMember) return;
    await deleteSubscription(dependencies)(currentMember);
    setShowDeleteSubscriptionModal(false);
  };

  return (
    <>
      <div className="flex pt-10 float-end">
        <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md flex">
          <Input label="Search" placeholder="Search..." onChange={onSearch} />
          <span className="h-9 pl-4 flex self-end">
            <Button name="+" />
          </span>
        </div>
      </div>
      <div className="h-full w-full object-cover">
        <MemberTable data={filteredMemberData} actions={tableActions} />
      </div>

      {showEditModal && (
        <EditMemberModal
          hideModal={() => setShowEditModal(false)}
          submit={(formdata: Member) => {
            updateMemberModal(formdata);
            setShowEditModal(false);
          }}
          member={currentMember}
        />
      )}
      {showDeleteModal && (
        <DeleteModal
          content="Etes-vous sûr(e) de vouloir supprimer cet utilisateur ?"
          hideModal={() => setShowDeleteModal(false)}
          submit={() => submitDeletememberModal()}
        />
      )}
      {showPayModal && (
        <PayMemberModal
          hideModal={() => setShowPayModal(false)}
          submit={(formdata: Member) => {
            updateMemberModal(formdata);
            setShowPayModal(false);
          }}
          member={currentMember}
        />
      )}
      {showAddSubscriptionModal && (
        <AddSubscriptionModal
          hideModal={() => setShowAddSubscriptionModal(false)}
          submit={(formdata: SubscriptionForm) => {
            addMemberSubscriptionModal(formdata);
            setShowAddSubscriptionModal(false);
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
