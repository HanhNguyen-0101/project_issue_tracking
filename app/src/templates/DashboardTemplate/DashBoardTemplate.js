import React from "react";
import { Route } from "react-router-dom";
import MenuJiraComponent from "../../components/DashboardComponents/HeaderJira/MenuJiraComponent";
import LoadingComponent from "../../components/GlobalComponents/LoadingComponent";
import { USER_LOGIN_STORE } from "../../utils/constants/settingSystem";
import { history } from "../../utils/history/history";

export default function DashBoardTemplate({ Component, ...restParams }) {
  if (!localStorage.getItem(USER_LOGIN_STORE)) {
    history.push("/");
    return;
  }
  return (
    <Route
      {...restParams}
      render={(propsRoute) => {
        return (
          <>
            <LoadingComponent />
            <div className="jira">
              <MenuJiraComponent />
              <Component {...propsRoute} />
            </div>
          </>
        );
      }}
    />
  );
}
