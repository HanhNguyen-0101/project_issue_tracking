import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { generateFromString } from "generate-avatar";


export default function MenuJiraComponent() {
  const { user } = useSelector((state) => state.UserReducer);

  return (
    <div className="menu">
      <div className="account">
        <div className="avatar">
          <img
            src={
              user
                ? `data:image/svg+xml;utf8,${generateFromString(user.avatar)}`
                : "https://picsum.photos/200/200"
            }
            alt={user ? user.avatar : ""}
          />
        </div>
        <div className="account-info text-white">
          <p className="uppercase">{user ? user.name : ""}</p>
          <p className="opacity-80">Report bugs</p>
        </div>
      </div>
      <div className="control">
        <div>
          <NavLink
            className="text-white"
            activeClassName="active font-weight-bold"
            to="/dashboard"
          >
            <i className="pr-2.5 fa fa-window-restore"></i> Dashboard
          </NavLink>
        </div>
        <div>
          <NavLink
            className="text-white"
            activeClassName="active font-weight-bold"
            to="/create-project"
          >
            <i className="pr-2.5 fa fa-cogs"></i> Create Project
          </NavLink>
        </div>
        <div>
          <NavLink
            className="text-white"
            activeClassName="active font-weight-bold"
            to="/management-project"
          >
            <i className="pr-2.5 fa fa-project-diagram"></i> Project Management
          </NavLink>
        </div>
        <div>
          <NavLink
            className="text-white"
            activeClassName="active font-weight-bold"
            to="/management-user"
          >
            <i className="pr-2.5 fa fa-users-cog"></i> User Management
          </NavLink>
        </div>
      </div>
    </div>
  );
}
