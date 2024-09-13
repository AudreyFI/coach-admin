const Button = ({ name }: { name: string }) => {
  return (
    <button className="px-4 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
      {name}
    </button>
  );
};

export default Button;
