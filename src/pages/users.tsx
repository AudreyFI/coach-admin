import { ChangeEvent, useEffect, useState } from "react";
import Button from "../components/elements/Button";
import Input from "../components/elements/Input";
import DeleteUserModal from "../components/elements/modals/DeleteUserModal";
import EditUserModal from "../components/elements/modals/EditUserModal";
import PayUserModal from "../components/elements/modals/PayUserModal";
import SubscriptionModal from "../components/elements/modals/SubscriptionModal";
import { Action, ActionType } from "../components/elements/TableAction";
import UserTable from "../components/elements/tables/UserTable";
import { User } from "../models/user";
import { getUsers, updateUser } from "../services/user.service";

const users = () => {
  const [userData, setUserData] = useState<User[]>([]);
  const [filteredUserData, setFilteredUserData] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>();
  const [currentUser, setCurrentUser] = useState<User>();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPayModal, setShowPayModal] = useState(false);
  const [showNewSubModal, setShowNewSubModal] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const userList: User[] = await getUsers();
      setUserData(userList);
      setUserDataWithSearchField([...userList]);
    };
    fetchUsers();
  }, [showEditModal]);

  const tableActions: Action<User>[] = [
    {
      name: ActionType.EDIT,
      fn: () => setShowEditModal(true),
      stateFn: (user: User) => setCurrentUser(user),
      displayFn: (user: User) => !!user,
    },
    {
      name: ActionType.DELETE,
      fn: () => setShowDeleteModal(true),
      stateFn: (user: User) => setCurrentUser(user),
      displayFn: (user: User) => !!user,
    },
    {
      name: ActionType.PAY,
      fn: () => setShowPayModal(true),
      stateFn: (user: User) => setCurrentUser(user),
      displayFn: (user: User) =>
        !!user.subscriptions?.length && !user.subscriptions[0].paymentDate,
    },
    {
      name: ActionType.NEW,
      fn: () => setShowNewSubModal(true),
      stateFn: (user: User) => setCurrentUser(user),
      displayFn: (user: User) => !!user,
    },
  ];

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value?.toLowerCase();
    setSearchTerm(search);
    setUserDataWithSearchField([...userData], search);
  };

  const submitDeleteUserModal = () => {
    setShowDeleteModal(false);
    const filteredData = [...userData].filter(
      (user) => user.id !== currentUser?.id
    );
    setUserData(filteredData);
  };

  const setUserDataWithSearchField = (users: User[], search = searchTerm) => {
    const filteredData = !search
      ? users
      : users.filter(
          (user) =>
            user.firstname.toLowerCase().includes(search) ||
            user.lastname?.toLowerCase().includes(search)
        );
    setFilteredUserData(filteredData);
  };

  const submitEditUserModal = async (data: User) => {
    await updateUser(data);
    setShowEditModal(false);
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
        <UserTable data={filteredUserData} actions={tableActions} />
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
