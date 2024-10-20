import { ChangeEvent, useState } from "react";
import Button from "../components/elements/Button";
import Input from "../components/elements/Input";
import DeleteUserModal from "../components/elements/modals/DeleteUserModal";
import EditUserModal from "../components/elements/modals/EditUserModal";
import PayUserModal from "../components/elements/modals/PayUserModal";
import SubscriptionModal from "../components/elements/modals/SubscriptionModal";
import { Action } from "../components/elements/TableAction";
import UserTable from "../components/elements/tables/UserTable";
import { User, USERS } from "../models/user";

const users = () => {
  const columns = [
    "Prénom",
    "Nom",
    "Email",
    "Date de fin",
    "Statut",
    "Actions",
  ];
  const userList = USERS?.sort((a, b) =>
    a?.firstname.localeCompare(b?.firstname)
  )?.map((u) => {
    u.subscriptions?.sort((a, b) => (a.endDate > b.endDate ? 1 : -1));
    return u;
  });
  const [userData, setUserData] = useState<User[]>(userList);
  const [currentUser, setCurrentUser] = useState<User>();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPayModal, setShowPayModal] = useState(false);
  const [showNewSubModal, setShowNewSubModal] = useState(false);

  const tableActions: Action<User>[] = [
    {
      name: "Edit",
      fn: () => setShowEditModal(true),
      stateFn: (user: User) => setCurrentUser(user),
      displayFn: (user: User) => !!user,
    },
    {
      name: "Delete",
      fn: () => setShowDeleteModal(true),
      stateFn: (user: User) => setCurrentUser(user),
      displayFn: (user: User) => !!user,
    },
    {
      name: "Pay",
      fn: () => setShowPayModal(true),
      stateFn: (user: User) => setCurrentUser(user),
      displayFn: (user: User) =>
        !!user.subscriptions?.length && !user.subscriptions[0].paymentDate,
    },
    {
      name: "New",
      fn: () => setShowNewSubModal(true),
      stateFn: (user: User) => setCurrentUser(user),
      displayFn: (user: User) => !!user,
    },
  ];

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value?.toLowerCase();
    const filteredData = [...userList].filter(
      (user) =>
        user.firstname.toLowerCase().includes(search) ||
        user.lastname?.toLowerCase().includes(search)
    );
    setUserData(filteredData);
  };

  const submitDeleteUserModal = () => {
    setShowDeleteModal(false);
    const filteredData = [...userData].filter(
      (user) => user.id !== currentUser?.id
    );
    setUserData(filteredData);
  };

  const submitEditUserModal = (data: User) => {
    setShowEditModal(false);
    const updatedUsers = userData.map((user) => {
      if (user.id === data.id) {
        return data;
      }
      return user;
    });
    setUserData(updatedUsers);
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
        <UserTable data={userData} actions={tableActions} columns={columns} />
      </div>

      {showEditModal && (
        <EditUserModal
          hideModal={() => setShowEditModal(false)}
          submit={(formdata: User) => submitEditUserModal(formdata)}
          user={currentUser}
        />
      )}
      {showDeleteModal && (
        <DeleteUserModal
          hideModal={() => setShowDeleteModal(false)}
          submit={() => submitDeleteUserModal()}
        />
      )}
      {showPayModal && (
        <PayUserModal
          hideModal={() => setShowPayModal(false)}
          submit={(formdata: User) => submitEditUserModal(formdata)}
          user={currentUser}
        />
      )}
      {showNewSubModal && (
        <SubscriptionModal
          hideModal={() => setShowNewSubModal(false)}
          submit={(formdata: User) => submitEditUserModal(formdata)}
          user={currentUser}
        />
      )}
    </>
  );
};

export default users;
