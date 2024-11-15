import { SubscriptionType } from "../models/subscription";
import { getEndDate, getStartDates } from "./subscription.service";

describe("Subscription Service", () => {
  describe("getStartDates", () => {
    it("should return quarterly start dates for the current year", () => {
      const result = getStartDates(SubscriptionType.QUARTERLY);
      expect(result).toEqual([
        new Date(new Date().getFullYear(), 0, 1),
        new Date(new Date().getFullYear(), 3, 1),
        new Date(new Date().getFullYear(), 6, 1),
        new Date(new Date().getFullYear(), 9, 1),
        new Date(new Date().getFullYear() + 1, 0, 1),
      ]);
    });

    it("should return empty array if last subscription end date is in the future", () => {
      const futureDate = new Date();
      futureDate.setFullYear(futureDate.getFullYear() + 1);
      const result = getStartDates(SubscriptionType.QUARTERLY, futureDate);
      expect(result).toEqual([]);
    });

    it("should return start dates from the next quarter if last subscription ended in the middle of the year", () => {
      const lastSubscriptionEndDate = new Date(new Date().getFullYear(), 4, 15); // May 15
      const result = getStartDates(
        SubscriptionType.QUARTERLY,
        lastSubscriptionEndDate
      );
      expect(result).toEqual([
        new Date(new Date().getFullYear(), 6, 1),
        new Date(new Date().getFullYear(), 9, 1),
        new Date(new Date().getFullYear() + 1, 0, 1),
      ]);
    });

    it("should return yearly start dates", () => {
      const result = getStartDates(SubscriptionType.YEARLY);
      expect(result).toEqual([
        new Date(new Date().getFullYear(), 0, 1),
        new Date(new Date().getFullYear() + 1, 0, 1),
      ]);
    });

    it("should return next year start date if last subscription ended last year", () => {
      const lastSubscriptionEndDate = new Date(
        new Date().getFullYear() - 1,
        11,
        31
      ); // Dec 31 last year
      const result = getStartDates(
        SubscriptionType.YEARLY,
        lastSubscriptionEndDate
      );
      expect(result).toEqual([
        new Date(new Date().getFullYear(), 0, 1),
        new Date(new Date().getFullYear() + 1, 0, 1),
      ]);
    });
  });

  describe("getEndDate", () => {
    it("should return end date 3 months later for quarterly subscription", () => {
      const selectedDate = new Date(2023, 0, 1); // Jan 1, 2023
      const result = getEndDate(selectedDate, SubscriptionType.QUARTERLY);
      expect(result).toEqual(new Date(2023, 2, 31)); // Mar 31, 2023
    });

    it("should return end date 1 year later for yearly subscription", () => {
      const selectedDate = new Date(2023, 0, 1); // Jan 1, 2023
      const result = getEndDate(selectedDate, SubscriptionType.YEARLY);
      expect(result).toEqual(new Date(2023, 11, 31)); // Dec 31, 2024
    });
  });
});
