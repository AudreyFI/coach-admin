import Modal, { ModalProps } from "../Modal";

export type DeleteModalProps = {
  content: string;
  hideModal: () => void;
  submit: () => void;
};

const DeleteModal = ({ content, hideModal, submit }: DeleteModalProps) => {
  const onAbort = () => hideModal();
  const onSubmit = () => submit();
  const modalProps: ModalProps = { content, onAbort, onSubmit };

  return <Modal props={modalProps} />;
};

export default DeleteModal;
