import React from "react";
import { useSelector } from "react-redux";

export default function LoadingComponent() {
  const { isLoading } = useSelector((state) => state.LoadingReducer);
  if (!isLoading) {
    return;
  }
  return (
    <div className="loading">
      <img alt="loading" src={require("../../assets/images/loading.gif")} />
    </div>
  );
}
