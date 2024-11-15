import { Member } from "../../../models/member";
import Modal, { ModalProps } from "../Modal";

export type PayMemberModalProps = {
  hideModal: () => void;
  submit: (formdata: any) => void;
  member: Member | undefined;
};

const PayMemberModal = ({ hideModal, submit, member }: PayMemberModalProps) => {
  const content = "Cet utilisateur a payé pour renouveler son abonnement ?";

  const onAbort = () => hideModal();
  const onSubmit = () => {
    const updatedmember = { ...member };
    updatedmember.subscriptions![0].paymentDate = new Date();
    submit(updatedmember);
  };
  const modalProps: ModalProps = { content, onAbort, onSubmit };

  return <Modal props={modalProps} />;
};

export default PayMemberModal;
