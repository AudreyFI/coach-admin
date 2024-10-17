import { User } from "../../../models/user";
import Badge from "../Badge";
import Table from "../Table";
import TableAction, { Action } from "../TableAction";

export type TableProps<User> = {
  columns: string[];
  data: User[];
  actions?: Action<User>[];
};

const UserTable = ({ columns, data, actions }: TableProps<User>) => {
  const tbody = (
    <>
      {data.map((user: User) => (
        <tr className="text-gray-700" key={user.id}>
          <td className="px-4 py-3 text-sm">{user.firstname}</td>
          <td className="px-4 py-3 text-sm">{user.lastname}</td>
          <td className="px-4 py-3 text-sm">{user.email}</td>
          <td className="px-4 py-3 text-sm">
            {user.subscriptions?.[0]?.endDate && (
              <span>
                {user.subscriptions?.[0]?.endDate.toLocaleDateString()}
              </span>
            )}
          </td>
          <td className="px-4 py-3 text-sm">
            {user.subscriptions?.[0]?.status && (
              <Badge status={user.subscriptions?.[0]?.status} />
            )}
          </td>

          {actions?.length && (
            <td className="px-4 py-3">
              <div className="flex items-center space-x-4 text-sm">
                {actions.map((action) => (
                  <TableAction<User>
                    action={action}
                    key={action.name}
                    item={user}
                  />
                ))}
              </div>
            </td>
          )}
        </tr>
      ))}
    </>
  );
  return <Table columns={columns} tbody={tbody} />;
};

export default UserTable;
