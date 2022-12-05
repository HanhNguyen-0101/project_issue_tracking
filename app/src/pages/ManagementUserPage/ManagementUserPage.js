import { Avatar, Button, Popconfirm, Space, Table, Input } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { deleteUser, getAllUser, getUserByKeyword, searchUserByKeyword } from "../../redux/actions/UserAction";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { setContentDrawer } from "../../redux/actions/DrawerAction";
import FormEditUser from "../../components/Forms/FormEditUser/FormEditUser";
import { generateFromString } from "generate-avatar";

const { Search } = Input;

export default function ManagementUserPage(props) {
  const { users } = useSelector((state) => state.UserReducer);
  const dispatch = useDispatch();

  const handleEdit = (user) => {
    dispatch(setContentDrawer(<FormEditUser />, 'EDIT USER', true));
    dispatch(getUserByKeyword(user.userId));
  }

  const columns = [
    {
      title: "ID",
      dataIndex: "userId",
      sorter: (a, b) => a.userId - b.userId,
    },
    {
      title: "Username",
      dataIndex: "name",
      sorter: (a, b) => {
        let name1 = a.name?.trim().toLowerCase();
        let name2 = b.name?.trim().toLowerCase();
        if (name1 < name2) {
          return -1;
        }
        return 1;
      },
      render: (_, { avatar, name }) => {
        return (
          <Space>
            <Avatar src={`data:image/svg+xml;utf8,${generateFromString(avatar)}`} shape="square" alt={avatar} />
            <span className="capitalize pl-2 font-medium">{name}</span>
          </Space>
        );
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => {
        let email1 = a.email?.trim().toLowerCase();
        let email2 = b.email?.trim().toLowerCase();
        if (email1 < email2) {
          return -1;
        }
        return 1;
      },
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      sorter: (a, b) => a.phoneNumber - b.phoneNumber,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => {handleEdit(record)}}>
            <EditOutlined />
          </Button>
          <Popconfirm
            title="Are you sure to delete this user?"
            onConfirm={() => {
              dispatch(deleteUser(record.userId));
            }}
            onCancel={() => {}}
            okText="Yes"
            cancelText="No"
          >
            <Button type="danger">
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    dispatch(getAllUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="main w-100" style={{ padding: 50 }}>
      <h3 className="text-3xl">User Management</h3>
      <Space direction="vertical" className="w-100 mt-4">
        <Search
          placeholder="Search..."
          onSearch={(value) => {
            dispatch(searchUserByKeyword(value));
          }}
          enterButton
        />
      </Space>
      <div className="content">
        <Table columns={columns} dataSource={users} rowKey={"userId"} />
      </div>
    </div>
  );
}
