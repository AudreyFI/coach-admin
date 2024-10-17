import { User } from "../../../models/user";
import Modal, { ModalProps } from "../Modal";

export type PayUserModalProps = {
  hideModal: () => void;
  submit: (formdata: any) => void;
  user: User | undefined;
};

const PayUserModal = ({ hideModal, submit, user }: PayUserModalProps) => {
  const content = "Cet utilisateur a payé pour renouveler son abonnement ?";

  const updatedUser = { ...user };
  updatedUser.subscriptions![0].paymentDate = new Date();

  const onAbort = () => hideModal();
  const onSubmit = () => submit(updatedUser);
  const modalProps: ModalProps = { content, onAbort, onSubmit };

  return <Modal props={modalProps} />;
};

export default PayUserModal;
