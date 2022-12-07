import React from "react";
import { Drawer, Space, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { hideDrawer } from "../../redux/actions/DrawerAction";

export default function DrawerHOC() {
  const { visible, title, ContentDrawerComponent, callBackSubmit } =
    useSelector((state) => state.DrawerReducer);
  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(hideDrawer());
  };
  return (
    <Drawer
      title={title}
      className="tracking"
      placement="right"
      visible={visible}
      closable={false}
      size='large'
      footer={
        <Space>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="primary" onClick={callBackSubmit}>
            Submit
          </Button>
        </Space>
      }
      footerStyle={{ textAlign: "right" }}
    >
      {ContentDrawerComponent}
    </Drawer>
  );
}
