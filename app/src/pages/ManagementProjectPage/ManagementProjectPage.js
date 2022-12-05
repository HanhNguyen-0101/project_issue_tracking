import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Space,
  Table,
  Tag,
  Popconfirm,
  Avatar,
  Popover,
  AutoComplete,
} from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import {
  assignUserToProject,
  getAllProject,
  removeUserFromProject,
  deleteProjectDetail,
  getProjectDetail,
} from "../../redux/actions/ProjectAction";
import FormEditProject from "../../components/Forms/FormEditProject/FormEditProject";
import { setContentDrawer } from "../../redux/actions/DrawerAction";
import { getUserByKeyword } from "../../redux/actions/UserAction";
import { NavLink } from "react-router-dom";
import { generateFromString } from "generate-avatar";

const { Option } = AutoComplete;

export default function ManagementProjectPage() {
  const { projects } = useSelector((state) => state.ProjectReducer);
  const { userSearch } = useSelector((state) => state.UserReducer);
  const [value, setValue] = useState("");
  const searchRef = useRef(null);

  const dispatch = useDispatch();

  const handleDelete = (projectId) => {
    dispatch(deleteProjectDetail(projectId));
  };
  const handleEdit = (project) => {
    dispatch(setContentDrawer(<FormEditProject />, "EDIT PROJECT", true));
    dispatch(getProjectDetail(project));
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
      defaultSortOrder: "ascend",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Name",
      dataIndex: "projectName",
      key: "projectName",
      sorter: (a, b) => {
        let projectName1 = a.projectName?.trim().toLowerCase();
        let projectName2 = b.projectName?.trim().toLowerCase();
        if (projectName1 < projectName2) {
          return -1;
        }
        return 1;
      },
      render: (_, { projectName, id }) => {
        return <NavLink to={`dashboard/${id}`} className="capitalize text-black font-medium">{projectName}</NavLink>;
      },
      ellipsis: true,
    },
    {
      title: "Category",
      dataIndex: "categoryName",
      key: "categoryName",
      render: (_, { categoryId, categoryName }) => {
        let color = "geekblue";
        if (categoryId === 1) {
          color = "volcano";
        }
        if (categoryId === 2) {
          color = "green";
        }
        return <Tag color={color}>{categoryName.toUpperCase()}</Tag>;
      },
      sorter: (a, b) => {
        let categoryName1 = a.categoryName?.trim().toLowerCase();
        let categoryName2 = b.categoryName?.trim().toLowerCase();
        if (categoryName1 < categoryName2) {
          return -1;
        }
        return 1;
      },
    },
    {
      title: "Creater",
      dataIndex: "creator",
      key: "creator",
      render: (_, { creator }) => {
        return <Tag color="blue" className="capitalize">{creator?.name}</Tag>;
      },
      sorter: (a, b) => {
        let creator1 = a.creator?.name.trim().toLowerCase();
        let creator2 = b.creator?.name.trim().toLowerCase();
        if (creator1 < creator2) {
          return -1;
        }
        return 1;
      },
    },
    {
      title: "Members",
      dataIndex: "members",
      key: "members",
      render: (_, { members, id }) => (
        <div className="posible-relative" style={{ minWidth: 160 }}>
          <Avatar.Group
            maxCount={2}
            size="large"
            maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
          >
            {members?.map((member, index) => (
              <Popover
                title={() => {
                  return (
                    <>
                      Are you want to remove{" "}
                      <span className="text-danger">
                        {member.name.toUpperCase()}
                      </span>
                      ?
                    </>
                  );
                }}
                trigger="click"
                content={() => (
                  <div className="w-100 text-center">
                    <Button
                      type="danger"
                      onClick={() => {
                        let obj = {
                          projectId: id,
                          userId: member.userId,
                        };
                        dispatch(removeUserFromProject(obj));
                      }}
                      style={{ borderRadius: "50%" }}
                    >
                      OK
                    </Button>
                  </div>
                )}
                key={`${index}${member?.userId}`}
              >
                <Avatar style={{ cursor: "pointer" }} src={`data:image/svg+xml;utf8,${generateFromString(member.avatar)}`} />
              </Popover>
            ))}
          </Avatar.Group>
          <Popover
            content={() => (
              <AutoComplete
                placeholder="Please input..."
                style={{ width: "100%" }}
                value={value}
                onChange={(value) => {
                  setValue(value);
                }}
                onSelect={(valueSelect, option) => {
                  let obj = {
                    projectId: id,
                    userId: option.value,
                  };
                  setValue(option.children);
                  dispatch(assignUserToProject(obj));
                }}
                onSearch={(value) => {
                  if (searchRef.current) {
                    clearTimeout(searchRef.current);
                  }
                  searchRef.current = setTimeout(() => {
                    dispatch(getUserByKeyword(value));
                  }, 300);
                }}
              >
                {userSearch?.map((i, idx) => (
                  <Option key={idx} value={i.userId}>
                    {i.name}
                  </Option>
                ))}
              </AutoComplete>
            )}
            title="Add User"
            trigger="click"
            placement="rightTop"
          >
            <Button
              style={{
                width: 38,
                height: 38,
                borderRadius: "50%",
                position: "absolute",
                top: 17,
                padding: "5px 5px 10px",
              }}
            >
              <PlusOutlined
                style={{ color: "#f56a00", fontWeight: "normal" }}
              />
            </Button>
          </Popover>
        </div>
      ),
      ellipsis: true,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEdit(record)}>
            <EditOutlined />
          </Button>
          <Popconfirm
            title="Are you sure to delete this project?"
            onConfirm={() => handleDelete(record.id)}
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
    dispatch(getAllProject());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="main w-100" style={{ padding: 50 }}>
      <h3 className="text-3xl pb-6">Project Management</h3>
      <div className="content">
        <Table columns={columns} dataSource={projects} rowKey={"id"} />
      </div>
    </div>
  );
}
