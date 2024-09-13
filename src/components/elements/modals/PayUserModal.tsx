import Modal, { ModalProps } from "../Modal";

export type PayUserModalProps = {
  hideModal: () => void;
  submit: () => void;
};

const PayUserModal = ({ hideModal, submit }: PayUserModalProps) => {
  const content = "Cet utilisateur a payé pour renouveler son abonnement ?";
  const onAbort = () => hideModal();
  const onSubmit = () => submit();
  const modalProps: ModalProps = { content, onAbort, onSubmit };

  return <Modal props={modalProps} />;
};

export default PayUserModal;
