export type Action<T> =
  | {
      name: ActionType.EDIT;
      fn: () => void;
      stateFn: (item: T) => void;
      displayFn: (item: T) => boolean;
    }
  | {
      name: ActionType.DELETE;
      fn: () => void;
      stateFn: (item: T) => void;
      displayFn: (item: T) => boolean;
    }
  | {
      name: ActionType.PAY;
      fn: () => void;
      stateFn: (item: T) => void;
      displayFn: (item: T) => boolean;
    }
  | {
      name: ActionType.NEW;
      fn: () => void;
      stateFn: (item: T) => void;
      displayFn: (item: T) => boolean;
    };

export type TableActionProps<T> = {
  action: Action<T>;
  item: T;
};

export enum ActionType {
  EDIT = "Edit",
  DELETE = "Delete",
  PAY = "Pay",
  NEW = "New",
}

const TableAction = <T,>({ action, item }: TableActionProps<T>) => {
  const getActionIcon = () => {
    switch (action.name) {
      case "Edit":
        return (
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
          </svg>
        );
      case "Pay":
        return (
          <>
            {action.displayFn(item) && (
              <span className="font-bold text-xl">$</span>
            )}
          </>
        );
      case "Delete":
        return (
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"></path>
          </svg>
        );
    }
  };
  return (
    <button
      className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lgfocus:outline-none focus:shadow-outline-gray"
      aria-label={action.name}
      onClick={() => {
        action.fn();
        action.stateFn(item);
      }}
    >
      {getActionIcon()}
    </button>
  );
};

export default TableAction;
