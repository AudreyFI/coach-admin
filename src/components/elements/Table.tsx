import Badge from "./Badge";
import TableAction, { Action } from "./TableAction";

export type TableItem = {
  id: string | number;
  firstname: string;
  lastname: string;
  email?: string;
};

export type TableProps<T extends TableItem> = {
  columns: string[];
  data: T[];
  actions?: Action<T>[];
};

const Table = <T extends TableItem>({
  columns,
  data,
  actions,
}: TableProps<T>) => {
  return (
    <div className="w-full overflow-hidden rounded-lg shadow-xs">
      <table className="w-full whitespace-no-wrap ">
        <thead>
          <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-gray-50">
            {columns.map((column) => (
              <th className="px-4 py-3" key={column}>
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y">
          {data.map((item: T) => (
            <tr className="text-gray-700" key={item.id}>
              <td className="px-4 py-3 text-sm">{item.firstname}</td>
              <td className="px-4 py-3 text-sm">{item.lastname}</td>
              <td className="px-4 py-3 text-sm">{item.email}</td>
              <td className="px-4 py-3 text-sm"></td>
              <td className="px-4 py-3 text-sm">
                <Badge status={"started"} />
              </td>

              {actions?.length && (
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-4 text-sm">
                    {actions.map((action) => (
                      <TableAction<T>
                        action={action}
                        key={action.name}
                        item={item}
                      />
                    ))}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
