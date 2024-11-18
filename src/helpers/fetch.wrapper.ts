import { toastWrapper } from "./toast.wrapper";

const successResponses = [200, 201, 204];
type ErrorResponse = { type: string; message: string };

export const fetchWrapper = async (url: string, options: RequestInit) => {
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    if (!successResponses.includes(response.status)) {
      toastWrapper.showError((result as ErrorResponse).message);
    } else {
      toastWrapper.showSuccess("Opération effectuée");
    }
    return result;
  } catch (error) {
    toastWrapper.showError((error as ErrorResponse).message);
    return error;
  }
};
