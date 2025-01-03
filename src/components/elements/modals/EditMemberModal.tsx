import "react-day-picker/style.css";
import { useForm } from "react-hook-form";
import { Member } from "../../../models/member";
import Modal, { ModalProps } from "../Modal";

export type EditMemberModalProps = {
  hideModal: () => void;
  submit: (formdata: any) => void;
  member: Member | undefined;
};

const EditMemberModal = ({
  hideModal,
  submit,
  member,
}: EditMemberModalProps) => {
  const REQUIRED_FIELD = "Ce champ est obligatoire";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Member>();

  const onSubmit = handleSubmit((formdata: Member) => {
    submit({ ...member, ...formdata });
  });

  const content = (
    <>
      <p>{member ? "Mettre à jour le membre" : "Nouveau membre"} </p>
      {
        <form>
          <div className="px-4 py-5 mb-8 bg-white rounded-lg shadow-md">
            <label htmlFor="firstname" className="block text-sm">
              <span className="text-gray-500">Prénom</span>
              <input
                className="block w-full mt-1 text-sm  focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                placeholder="Jane"
                defaultValue={member?.firstname}
                {...register("firstname", { required: true })}
              />
              {errors.firstname && (
                <span className="text-red-500">{REQUIRED_FIELD}</span>
              )}
            </label>
            <label htmlFor="lastname" className="block text-sm pt-5">
              <span className="text-gray-500">Nom</span>
              <input
                className="block w-full mt-1 text-sm  focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                placeholder="Doe"
                defaultValue={member?.lastname}
                {...register("lastname", { required: true })}
              />
              {errors.lastname && (
                <span className="text-red-500">{REQUIRED_FIELD}</span>
              )}
            </label>
            <label htmlFor="email" className="block text-sm pt-5">
              <span className="text-gray-500">Email</span>
              <input
                className="block w-full mt-1 text-sm  focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                placeholder="Jane Doe"
                defaultValue={member?.email}
                {...register("email", {
                  required: REQUIRED_FIELD,
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Email invalide",
                  },
                })}
              />
              {errors.email && (
                <span className="text-red-500">{errors.email.message}</span>
              )}
            </label>
          </div>
        </form>
      }
    </>
  );
  const onAbort = () => hideModal();
  const modalProps: ModalProps = { content, onAbort, onSubmit };

  return <Modal props={modalProps} />;
};

export default EditMemberModal;
