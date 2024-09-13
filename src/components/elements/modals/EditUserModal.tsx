import { useForm } from "react-hook-form";
import { User } from "../../../models/user";
import Modal, { ModalProps } from "../Modal";

export type EditUserModalProps = {
  hideModal: () => void;
  submit: (formdata: any) => void;
  user: User | undefined;
};

const EditUserModal = ({ hideModal, submit, user }: EditUserModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();

  const onSubmit = handleSubmit((formdata: User) =>
    submit({ ...user, ...formdata })
  );

  const content = (
    <>
      <p>Mettre à jour l'utilisateur </p>
      <form>
        <div className="px-4 py-5 mb-8 bg-white rounded-lg shadow-md">
          <label htmlFor="firstname" className="block text-sm">
            <span className="text-gray-500">Prénom</span>
            <input
              className="block w-full mt-1 text-sm  focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
              placeholder="Jane"
              defaultValue={user?.firstname}
              {...register("firstname")}
            />
          </label>
          <label htmlFor="firstname" className="block text-sm pt-5">
            <span className="text-gray-500">Nom</span>
            <input
              className="block w-full mt-1 text-sm  focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
              placeholder="Doe"
              defaultValue={user?.lastname}
              {...register("lastname", { required: true })}
            />
            {errors.lastname && <span>This field is required</span>}
          </label>
          <label htmlFor="email" className="block text-sm pt-5">
            <span className="text-gray-500">Email</span>
            <input
              className="block w-full mt-1 text-sm  focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
              placeholder="Jane Doe"
              defaultValue={user?.email}
              {...register("email")}
            />
          </label>
        </div>
      </form>
    </>
  );
  const onAbort = () => hideModal();
  const modalProps: ModalProps = { content, onAbort, onSubmit };

  return <Modal props={modalProps} />;
};

export default EditUserModal;
