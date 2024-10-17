import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { useForm } from "react-hook-form";
import { User } from "../../../models/user";
import Modal, { ModalProps } from "../Modal";

export type SubscriptionModalProps = {
  hideModal: () => void;
  submit: (formdata: any) => void;
  user: User | undefined;
};

const SubscriptionModal = ({
  hideModal,
  submit,
  user,
}: SubscriptionModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    user!.subscriptions?.[0]?.endDate
  );

  const onSubmit = handleSubmit((formdata: User) => {
    if (selectedDate) {
      formdata.subscriptions![0].endDate = selectedDate;
    }

    submit({ ...user, ...formdata });
  });

  const content = (
    <>
      <p>Nouvel Abonnement</p>
      {user && (
        <form>
          <div className="px-4 py-5 mb-8 bg-white rounded-lg shadow-md">
            <label htmlFor="subscriptionEndDate" className="block text-sm pt-5">
              <span className="text-gray-500">Date de début</span>
              <DayPicker
                mode="single"
                className="block w-full mt-1 text-sm  focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                selected={selectedDate}
                onSelect={setSelectedDate}
                {...register(`subscriptions.0.endDate`)}
              />
            </label>
            <label htmlFor="subscriptionEndDate" className="block text-sm pt-5">
              <span className="text-gray-500">Durée</span>
              Select
            </label>
          </div>
        </form>
      )}
    </>
  );
  const onAbort = () => hideModal();
  const modalProps: ModalProps = { content, onAbort, onSubmit };

  return <Modal props={modalProps} />;
};

export default SubscriptionModal;
