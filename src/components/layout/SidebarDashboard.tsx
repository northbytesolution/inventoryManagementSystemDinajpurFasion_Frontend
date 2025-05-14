import React from "react";
import { Menu } from "antd";
import {
  DashboardOutlined,
  FormOutlined,
  ProductOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";

const SidebarDashboard: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <div className="text-white text-lg font-bold text-center py-4 border-b border-gray-700">
        Dinajpur Fashion
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultOpenKeys={["dataEntry"]}
        selectedKeys={[location.pathname]}
        onClick={({ key }) => navigate(key)}
        items={[
          {
            key: "/",
            icon: <DashboardOutlined />,
            label: "Dashboard",
          },
          {
            key: "dataEntry",
            icon: <FormOutlined />,
            label: "Data Entry",
            children: [
              { key: "/category", label: "Category" },
              { key: "/attributes", label: "Attributes" },
              { key: "/brand", label: "Brand" },
              { key: "/tag", label: "Tag" },
              { key: "/location", label: "Location" },
            ],
          },
          {
            key: "items",
            icon: <ProductOutlined />,
            label: "items",
            children: [
              { key: "/addItem", label: "Add Items" },
              { key: "/productTable", label: "All Items" },
            ],
          },
        ]}
      />
    </>
  );
};

export default SidebarDashboard;
