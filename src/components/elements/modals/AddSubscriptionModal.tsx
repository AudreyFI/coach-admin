import { useState } from "react";
import { Member } from "../../../models/member";
import { SubscriptionType } from "../../../models/subscription";
import {
  getEndDate,
  getStartDates,
} from "../../../services/subscription.service";
import Modal, { ModalProps } from "../Modal";

export type SubscriptionModalProps = {
  hideModal: () => void;
  submit: (formdata: any) => void;
  member: Member | undefined;
};

export type SubscriptionForm = {
  startDate: Date;
  endDate: Date;
};

const AddSubscriptionModal = ({
  hideModal,
  submit,
  member,
}: SubscriptionModalProps) => {
  const initialDuration = SubscriptionType.QUARTERLY;
  const lastSubscriptionEndDate = member?.subscriptions?.[0]?.endDate;
  const initialStartDates = getStartDates(
    initialDuration,
    lastSubscriptionEndDate
  );
  const [duration, setDuration] = useState<SubscriptionType>(initialDuration);
  const [startDates, setStartDates] = useState<Date[]>(initialStartDates);
  const [startDate, setStartDate] = useState<Date>(initialStartDates[0]);
  const [endDate, setEndDate] = useState<Date | undefined>(
    getEndDate(initialStartDates[0], initialDuration)
  );

  const handleDurationChange = (duration: SubscriptionType) => {
    setDuration(duration);
    const dates = getStartDates(duration, lastSubscriptionEndDate);
    setStartDates(getStartDates(duration, lastSubscriptionEndDate));
    setStartDate(dates[0]);
    setEndDate(getEndDate(dates[0], duration));
  };

  const handleDateChange = (selectedDate: string) => {
    const date = new Date(selectedDate);
    setStartDate(date);
    setEndDate(getEndDate(date, duration));
  };

  const onSubmit = () => {
    submit({ startDate, endDate });
  };

  const content = (
    <>
      <p>Nouvel Abonnement</p>
      {member && (
        <form>
          <div className="px-4 py-5 mb-8 bg-white rounded-lg shadow-md">
            <label htmlFor="duration" className="block text-sm pt-5">
              <span className="text-gray-500 pr-4">Durée</span>
              <select
                onChange={(e) =>
                  handleDurationChange(e.target.value as SubscriptionType)
                }
              >
                <option key={SubscriptionType.QUARTERLY}>
                  {SubscriptionType.QUARTERLY}
                </option>
                <option key={SubscriptionType.YEARLY}>
                  {SubscriptionType.YEARLY}
                </option>
              </select>
            </label>
            <label htmlFor="startDate" className="block text-sm pt-5">
              <span className="text-gray-500 pr-4">Date de début</span>
              <select onChange={(e) => handleDateChange(e.target.value)}>
                {startDates &&
                  startDates.map((value, index) => (
                    <option key={index} value={value.toDateString()}>
                      {value.toLocaleString("fr-FR", {
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                      })}
                    </option>
                  ))}
              </select>
            </label>
            <label htmlFor="startDateLabel" className="block text-sm pt-5">
              Du{" "}
              {startDate &&
                startDate.toLocaleString("fr-FR", {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                })}
            </label>
            <label htmlFor="endDateLabel" className="block text-sm pt-5">
              Au{" "}
              {endDate &&
                endDate.toLocaleString("fr-FR", {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                })}
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

export default AddSubscriptionModal;
