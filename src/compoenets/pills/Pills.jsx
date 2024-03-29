import React from "react";
import { MdCancel } from "react-icons/md";

function Pills({ name, removeSelectedActor }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "5px",
        flexWrap: "wrap",
      }}
    >
      <div
        style={{
          backgroundColor: "teal",
          display: "flex",
          alignItems: "center",
          gap: "5px",
          padding: "5px",
          borderRadius: "10px",
        }}
      >
        <div>{name}</div>
        <MdCancel onClick={removeSelectedActor} style={{ cursor: "pointer" }} />
      </div>
    </div>
  );
}

export default Pills;
