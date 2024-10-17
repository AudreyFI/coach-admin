export type TableProps = {
  columns: string[];
  tbody: JSX.Element;
};

const Table = ({ columns, tbody }: TableProps) => {
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
        <tbody className="bg-white divide-y">{tbody}</tbody>
      </table>
    </div>
  );
};

export default Table;
