import { BaseSyntheticEvent } from "react";

export type ModalProps = {
  onAbort: () => void;
  onSubmit:
    | (() => void)
    | ((e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>);
  content: React.ReactNode;
};

const Modal = ({ props }: { props: ModalProps }) => {
  return (
    <>
      <div
        x-show="isModalOpen"
        x-transition:enter="transition ease-out duration-150"
        x-transition:enter-start="opacity-0"
        x-transition:enter-end="opacity-100"
        x-transition:leave="transition ease-in duration-150"
        x-transition:leave-start="opacity-100"
        x-transition:leave-end="opacity-0"
        className="fixed inset-0 z-30 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center"
      >
        <div
          x-show="isModalOpen"
          x-transition:enter="transition ease-out duration-150"
          x-transition:enter-start="opacity-0 transform translate-y-1/2"
          x-transition:enter-end="opacity-100"
          x-transition:leave="transition ease-in duration-150"
          x-transition:leave-start="opacity-100"
          x-transition:leave-end="opacity-0  transform translate-y-1/2"
          className="w-full px-6 py-4 overflow-hidden bg-white rounded-t-lg sm:rounded-lg sm:m-4 sm:max-w-xl"
          role="dialog"
          id="modal"
        >
          <header className="flex justify-end">
            <button
              className="inline-flex items-center justify-center w-6 h-6 text-gray-400 transition-colors duration-150 rounded hover: hover:text-gray-700"
              aria-label="close"
              onClick={props.onAbort}
            >
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                role="img"
                aria-hidden="true"
              >
                <path
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                ></path>
              </svg>
            </button>
          </header>
          <div className="mt-4 mb-6 text-black">
            <p className="mb-2 text-lg font-semibold text-gray-7000"></p>
            {props.content}
          </div>
          <footer className="flex flex-col items-center justify-end px-6 py-3 -mx-6 -mb-4 space-y-4 sm:space-y-0 sm:space-x-6 sm:flex-row bg-gray-50">
            <button
              onClick={props.onAbort}
              className="w-full px-5 py-3 text-sm font-medium leading-5 text-gray-700 transition-colors duration-150 border border-gray-300 rounded-lg sm:px-4 sm:py-2 sm:w-auto active:bg-transparent hover:border-gray-500 focus:border-gray-500 active:text-gray-500 focus:outline-none focus:shadow-outline-gray"
            >
              Cancel
            </button>
            <button
              onClick={props.onSubmit}
              className="w-full px-5 py-3 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg sm:w-auto sm:px-4 sm:py-2 active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
            >
              Validate
            </button>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Modal;
