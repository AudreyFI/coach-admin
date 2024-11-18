import Input from "./Input";

export type SearchProps = {
  onSearch: () => void;
  additionalAction: JSX.Element;
};

const Search = ({ onSearch, additionalAction }: SearchProps) => {
  return (
    <div className="flex pt-10 float-end">
      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md flex">
        <Input label="Search" placeholder="Search..." onChange={onSearch} />
        <span className="h-9 pl-4 flex self-end">{additionalAction}</span>
      </div>
    </div>
  );
};

export default Search;
