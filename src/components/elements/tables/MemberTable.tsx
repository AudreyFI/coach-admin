import { Member } from "../../../models/member";
import Badge from "../Badge";
import Table from "../Table";
import TableAction, { Action } from "../TableAction";

export type TableProps<Member> = {
  data: Member[];
  actions?: Action<Member>[];
};

const MemberTable = ({ data, actions }: TableProps<Member>) => {
  const columns = [
    "Prénom",
    "Nom",
    "Email",
    "Date de fin",
    "Statut",
    "Actions",
  ];
  const tbody = (
    <>
      {data.map((member: Member) => (
        <tr className="text-gray-700" key={member.id}>
          <td className="px-4 py-3 text-sm">{member.firstname}</td>
          <td className="px-4 py-3 text-sm">{member.lastname}</td>
          <td className="px-4 py-3 text-sm">{member.email}</td>
          <td className="px-4 py-3 text-sm">
            {member.subscriptions?.[0]?.endDate && (
              <span>
                {member.subscriptions?.[0]?.endDate.toLocaleString("fr-FR", {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                })}
              </span>
            )}
          </td>
          <td className="px-4 py-3 text-sm">
            {member.subscriptions?.[0]?.status && (
              <Badge status={member.subscriptions?.[0]?.status} />
            )}
          </td>

          {actions?.length && (
            <td className="px-4 py-3">
              <div className="flex items-center space-x-4 text-sm">
                {actions.map((action) => (
                  <TableAction<Member>
                    action={action}
                    key={action.name}
                    item={member}
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

export default MemberTable;
