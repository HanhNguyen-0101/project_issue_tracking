import React from "react";
import { useSelector } from "react-redux";

export default function ModalHOC() {
  const { ContentModalComponent } = useSelector(
    (state) => state.ModalReducer
  );
  return (
    <div
      className="modal fade tracking"
      id="infoModal"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="infoModal"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-info">{ContentModalComponent}</div>
    </div>
  );
}
