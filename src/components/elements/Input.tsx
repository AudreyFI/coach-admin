import { ChangeEvent } from "react";

const Input = ({
  label,
  placeholder,
  onChange,
}: {
  label: string;
  placeholder?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <label className="block text-sm">
      <span className="text-gray-700">{label}</span>
      <input
        className="block w-full mt-1 text-sm focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input text-gray-700"
        placeholder={placeholder}
        onChange={onChange}
      />
    </label>
  );
};

export default Input;
