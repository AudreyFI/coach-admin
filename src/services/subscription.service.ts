import { SubscriptionType } from "../models/subscription";

export const getStartDates = (
  duration: SubscriptionType,
  lastSubscriptionEndDate?: Date
): Date[] | [] => {
  let result = [];
  // if there's already a subscription, the start date is based on the end date of
  // the last subscription
  const month = lastSubscriptionEndDate
    ? new Date(lastSubscriptionEndDate).getMonth()
    : 0;
  const year = lastSubscriptionEndDate
    ? new Date(lastSubscriptionEndDate).getFullYear()
    : new Date().getFullYear();

  if (duration === SubscriptionType.QUARTERLY) {
    if (year > new Date().getFullYear()) {
      return [];
    }
    result.push(new Date(new Date().getFullYear(), 0, 1));
    result.push(new Date(new Date().getFullYear(), 3, 1));
    result.push(new Date(new Date().getFullYear(), 6, 1));
    result.push(new Date(new Date().getFullYear(), 9, 1));
    result.push(new Date(new Date().getFullYear() + 1, 0, 1));

    // Remove possible items depending on the lastSubscription's month
    if (year === new Date().getFullYear()) {
      if (month >= 1) {
        result.shift();
      }
      if (month >= 3) {
        result.shift();
      }
      if (month >= 6) {
        result.shift();
      }
      if (month >= 9) {
        result.shift();
      }
    }
  } else {
    if (
      (lastSubscriptionEndDate && year < new Date().getFullYear()) ||
      !lastSubscriptionEndDate
    ) {
      result.push(new Date(new Date().getFullYear(), 0, 1));
    }
    result.push(new Date(new Date().getFullYear() + 1, 0, 1));
  }

  return result;
};

export const getEndDate = (
  selectedDate: Date,
  duration: SubscriptionType
): Date | undefined => {
  if (!selectedDate) {
    return;
  }
  const startDate = new Date(selectedDate);
  if (duration === SubscriptionType.QUARTERLY) {
    startDate.setMonth(selectedDate.getMonth() + 3);
  } else {
    startDate.setFullYear(selectedDate.getFullYear() + 1);
  }

  // Return the day before
  startDate.setDate(selectedDate.getDate() - 1);

  return startDate;
};
