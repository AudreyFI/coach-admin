import { Slide, toast, ToastOptions } from "react-toastify";

export const defaultToastOptions: ToastOptions = {
  position: "top-center",
  autoClose: 4000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
  transition: Slide,
};

export const toastWrapper = {
  showSuccess: (message: string) => {
    return toast.success(message, defaultToastOptions);
  },
  showError: (message: string) => {
    return toast.error(message, defaultToastOptions);
  },
};
