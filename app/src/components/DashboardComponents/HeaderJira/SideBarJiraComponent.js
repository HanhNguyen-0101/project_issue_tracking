import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { BarsOutlined, PlusOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setContentDrawer } from "../../../redux/actions/DrawerAction";
import FormCreateIssue from "../../Forms/FormCreateIssue/FormCreateIssue";
import { getProjectDetailApi } from "../../../redux/actions/ProjectAction";

const { Sider } = Layout;

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

export default function SideBarJiraComponent() {
  const [state, setState] = useState({
    collapsed: true,
  });
  const dispatch = useDispatch();
  const toggle = () => {
    setState({
      collapsed: !state.collapsed,
    });
  };
  const { id } = useParams();
  const items = [
    getItem(
      "",
      "1",
      <BarsOutlined style={{ fontSize: 20 }} onClick={toggle} />
    ),
    getItem(
      "Create issue",
      "2",
      <PlusOutlined
        style={{ fontSize: 20 }}
        onClick={() => {
          dispatch(
            setContentDrawer(
              <FormCreateIssue />,
              "CREATE ISSUE",
              true
            )
          );
          dispatch(getProjectDetailApi(Number(id)));
        }}
      />
    ),
  ];

  return (
      <Sider
        trigger={null}
        collapsible
        collapsed={state.collapsed}
        style={{ height: "100%" }}
      >
        <Menu
          defaultSelectedKeys={["1"]}
          mode="inline"
          theme="dark"
          items={items}
        />
      </Sider>
  );
}
