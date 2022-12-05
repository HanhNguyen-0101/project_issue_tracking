import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContentMainJiraComponent from "../../components/DashboardComponents/MainJira/ContentMainJiraComponent";
import HeaderMainJiraComponent from "../../components/DashboardComponents/MainJira/HeaderMainJiraComponent";
import InfoMainJiraComponent from "../../components/DashboardComponents/MainJira/InfoMainJiraComponent";
import { getProjectDetailApi } from "../../redux/actions/ProjectAction";

export default function DashboardPage(props) {
  const { projectDetail } = useSelector((state) => state.ProjectReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    const { id } = props.match.params;
    dispatch(getProjectDetailApi(Number(id)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { id } = props.match.params;
  if (!id) {
    return (
      <div className="main align-self-center d-flex align-items-center justify-content-center w-100">
        <h3>Please chosse a project</h3>
      </div>
    );
  } else {
    return (
      <div className="px-10 w-full">
        <HeaderMainJiraComponent />
        <div className="mt-6 mb-10">
          <h3 className="text-3xl mb-1">{projectDetail?.projectName}</h3>
          <span
            className="opacity-80"
            dangerouslySetInnerHTML={{ __html: projectDetail?.description }}
          ></span>
        </div>
        <InfoMainJiraComponent id={id}/>
        <ContentMainJiraComponent />
      </div>
    );
  }
}
