import React from "react";

const dateFunction = () => {
  var b = new Date();
  return b.getUTCFullYear();
};
const Footer = () => {
  return (
    <div className="flex absolute bottom-0 items-center justify-center py-1 w-full text-sm text-white bg-black sm:text-lg ">
      Copyright 2023 — {dateFunction()} © Fouda Marc. All rights reserved.
    </div>
  );
};

export default Footer;
