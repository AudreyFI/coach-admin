import { SubscriptionStatus } from "../../models/subscription-status";

const Badge = ({ status }: { status: SubscriptionStatus }) => {
  switch (status) {
    case "started":
      return (
        <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full">
          Valide
        </span>
      );
    case "expiresSoon":
      return (
        <span className="px-2 py-1 font-semibold leading-tight text-orange-400 bg-orange-100 rounded-full">
          Valide
        </span>
      );
    case "expired":
    case "lateExpired":
      return (
        <span className="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-full">
          Invalide
        </span>
      );
    default:
      return (
        <span className="px-2 py-1 font-semibold leading-tight text-gray-70000 bg-gray-400 rounded-full">
          {status}
        </span>
      );
  }
};

export default Badge;
