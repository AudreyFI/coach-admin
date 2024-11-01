import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { useForm } from "react-hook-form";
import { User } from "../../../models/user";
import Modal, { ModalProps } from "../Modal";

export type EditUserModalProps = {
  hideModal: () => void;
  submit: (formdata: any) => void;
  user: User | undefined;
};

const EditUserModal = ({ hideModal, submit, user }: EditUserModalProps) => {
  const REQUIRED_FIELD = "This field is required";
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
      <p>Mettre à jour l'utilisateur </p>
      {user && (
        <form>
          <div className="px-4 py-5 mb-8 bg-white rounded-lg shadow-md">
            <label htmlFor="firstname" className="block text-sm">
              <span className="text-gray-500">Prénom</span>
              <input
                className="block w-full mt-1 text-sm  focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                placeholder="Jane"
                defaultValue={user.firstname}
                {...register("firstname", { required: true })}
              />
              {errors.firstname && <span>{REQUIRED_FIELD}</span>}
            </label>
            <label htmlFor="firstname" className="block text-sm pt-5">
              <span className="text-gray-500">Nom</span>
              <input
                className="block w-full mt-1 text-sm  focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                placeholder="Doe"
                defaultValue={user.lastname}
                {...register("lastname")}
              />
            </label>
            <label htmlFor="email" className="block text-sm pt-5">
              <span className="text-gray-500">Email</span>
              <input
                className="block w-full mt-1 text-sm  focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                placeholder="Jane Doe"
                defaultValue={user.email}
                {...register("email", { required: true })}
              />
              {errors.email && <span>{REQUIRED_FIELD}</span>}
            </label>
            {!!user.subscriptions?.length && (
              <label
                htmlFor="subscriptionEndDate"
                className="block text-sm pt-5"
              >
                <span className="text-gray-500">Date de fin</span>
                <DayPicker
                  mode="single"
                  className="block w-full mt-1 text-sm  focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  {...register(`subscriptions.0.endDate`)}
                  ref={null} // This is a workaround for a bug in react-day-picker with register
                />
              </label>
            )}
          </div>
        </form>
      )}
    </>
  );
  const onAbort = () => hideModal();
  const modalProps: ModalProps = { content, onAbort, onSubmit };

  return <Modal props={modalProps} />;
};

export default EditUserModal;
