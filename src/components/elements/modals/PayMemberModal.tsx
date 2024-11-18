import { useForm } from "react-hook-form";
import { CustomerSubscription } from "../../../models/customer-subscription";
import { Member } from "../../../models/member";
import Modal, { ModalProps } from "../Modal";

export type PayMemberModalProps = {
  hideModal: () => void;
  submit: (formdata: any) => void;
  member: Member | undefined;
};

type PayMemberForm = {
  amount: number;
};

const PayMemberModal = ({ hideModal, submit, member }: PayMemberModalProps) => {
  const INVALID_FIELD = "Cette valeur est invalide";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PayMemberForm>();

  const content = (
    <>
      <p>Cet utilisateur a payé pour renouveler son abonnement ?</p>
      {member && member.subscriptions && member.subscriptions.length > 0 && (
        <form>
          <div className="px-4 py-5 mb-8 bg-white rounded-lg shadow-md">
            <label htmlFor="firstname" className="block text-sm">
              <span className="text-gray-500 pr-5">Montant</span>
              <input
                type="number"
                className="inline w-1/2 mt-1 text-sm  focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                placeholder=""
                defaultValue={45}
                {...register("amount")}
              />{" "}
              €
              {errors.amount && (
                <span className="text-red-500">{INVALID_FIELD}</span>
              )}
            </label>
          </div>
        </form>
      )}
    </>
  );

  const onAbort = () => hideModal();

  const onSubmit = handleSubmit((formData: PayMemberForm) => {
    const customerSubscription = member?.subscriptions![0];
    if (!customerSubscription) return;
    const updateSubscription: CustomerSubscription = {
      customerId: member.id as string,
      subscriptionId: customerSubscription.id as string,
      paymentDate: new Date(),
      amount: formData.amount,
    };
    submit(updateSubscription);
  });
  const modalProps: ModalProps = { content, onAbort, onSubmit };

  return <Modal props={modalProps} />;
};

export default PayMemberModal;
