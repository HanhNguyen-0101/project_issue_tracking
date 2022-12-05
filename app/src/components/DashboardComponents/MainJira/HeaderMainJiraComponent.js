import React from "react";
import { useSelector } from "react-redux";

export default function HeaderMainJiraComponent() {
  const { projectDetail } = useSelector((state) => state.ProjectReducer);
  return (
    <div className="header">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb" style={{ backgroundColor: "white", paddingLeft: 0 }}>
          <li className="breadcrumb-item">Project</li>
          <li className="breadcrumb-item">Dashboard</li>
          <li className="breadcrumb-item active" aria-current="page">
            {projectDetail?.projectName}
          </li>
        </ol>
      </nav>
    </div>
  );
}
