import Modal, { ModalProps } from "../Modal";

export type DeleteUserModalProps = {
  hideModal: () => void;
  submit: () => void;
};

const DeleteUserModal = ({ hideModal, submit }: DeleteUserModalProps) => {
  const content = "Etes-vous sûr de vouloir supprimer cet utilisateur ?";
  const onAbort = () => hideModal();
  const onSubmit = () => submit();
  const modalProps: ModalProps = { content, onAbort, onSubmit };

  return <Modal props={modalProps} />;
};

export default DeleteUserModal;
