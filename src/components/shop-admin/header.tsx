import React, { useState } from "react";

function Header({ handleValueChange, value }: any) {
  return (
    <div className="grid grid-cols-2">
      <div
        className={`text-center py-4 bg-[var(--grey)] text-black text-2xl cursor-pointer transition-all ease-in-out duration-200 ${
          value === 0 && "bg-[var(--primary)] text-white"
        }`}
        onClick={() => value === 1 && handleValueChange(0)}
      >
        Products
      </div>
      <div
        className={`text-center py-4 bg-[var(--grey)] text-black text-2xl cursor-pointer transition-all ease-in-out duration-200 ${
          value === 1 && "bg-[var(--primary)] text-white"
        }`}
        onClick={() => value === 0 && handleValueChange(1)}
      >
        Orders
      </div>
    </div>
  );
}

export default Header;
