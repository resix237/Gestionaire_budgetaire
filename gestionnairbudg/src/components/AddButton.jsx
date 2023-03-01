import React from "react";
import { MdAdd } from "react-icons/md";
const AddButton = ({ name, addFunction }) => {
  return (
    <button
      onClick={addFunction}
      className="h-10 my-5 rounded-md w-32 bg-yellow-500 hover:bg-yellow-300 cursor-pointer flex justify-between font-semibold place-items-center px-3"
    >
      <MdAdd size={35} />
      <h4>{name}</h4>
    </button>
  );
};

export default AddButton;
