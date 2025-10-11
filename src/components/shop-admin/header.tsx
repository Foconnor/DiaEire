import React, { useState } from "react";

function header() {
  const [isSelected, setSelected] = useState(0);
  return (
    <div className="wrapper">
      <div onClick={() => isSelected === 1 && setSelected(0)}>Products</div>
      <div onClick={() => isSelected === 0 && setSelected(1)}>Orders</div>
    </div>
  );
}

export default header;
