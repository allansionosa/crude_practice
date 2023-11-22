import { Space, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
export const PatientList = ({ data }) => {
  const navigate = useNavigate();
  const editItem = (id) => {
    navigate("/new/patient/edit/" + id);
  };
  const deleteItem = (id) => {
    if (window.confirm("Do you want to remove this data?"))
      fetch("http://localhost:3000/posts/" + id, {
        method: "DELETE",
      })
        .then((res) => {
          alert("Removed Succesfully.");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err.message);
        });
  };
  const showDetail = (id) => {
    navigate("/new/patient/details/" + id);
  };

  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "phone",
      dataIndex: "phone",
      key: "phone",
    },

    {
      title: "concern",
      dataIndex: "concern",
      key: "concern",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a
            onClick={() => {
              editItem(record.id);
            }}
            className="bg-blue-500 py-2 px-6 text-sm font-medium text-white rounded-md cursor-pointer hover:bg-black-600 hover:text-black"
          >
            Edit
          </a>
          <a
            onClick={() => {
              deleteItem(record.id);
            }}
            className="bg-red-500 py-2 px-6 text-sm font-medium text-white rounded-md cursor-pointer hover:bg-black-600 "
          >
            Remove
          </a>
          <a
            onClick={() => {
              showDetail(record.id);
            }}
          >
            Details
          </a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="text-center sm:text-center border-b-2 ">
        <h2 className="text-2xl font-serif">Patient List</h2>
        <div className="grid justify-start pb-4 px-3">
          <div className="flex justify-left bg-blue-400 py-2 px-6 font-medium text-white rounded-md hover:bg-blue-600 hover:text-white">
            <Link to="/new/patient">Add New (+)</Link>
          </div>
        </div>
        <div>
          <Table columns={columns} dataSource={data} />;
        </div>
      </div>
    </>
  );
};
