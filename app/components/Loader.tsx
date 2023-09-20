"use client";

import { ClipLoader } from "react-spinners";

const Loader = () => {
  return (
    <div
      className="h-[70vh] flex flex-col justify-center items-center
    "
    >
      <ClipLoader size={80} color="red" />
    </div>
  );
};

export default Loader;
