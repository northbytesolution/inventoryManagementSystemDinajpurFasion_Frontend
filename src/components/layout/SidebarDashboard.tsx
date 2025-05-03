import { Layout, Menu } from "antd";
import {
  HomeOutlined,
  UserOutlined,
  PlusCircleOutlined,
  UnorderedListOutlined,
  ShoppingCartOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

const { Sider } = Layout;

const SidebarDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const items = [
    {
      key: "/admin/dashboard",
      icon: <HomeOutlined />,
      label: "Dashboard",
    },
    {
      key: "/admin/users",
      icon: <UserOutlined />,
      label: "Manage Users",
    },
    {
      key: "/admin/addProduct",
      icon: <PlusCircleOutlined />,
      label: "Add Products",
    },
    {
      key: "/admin/ProductTable",
      icon: <UnorderedListOutlined />,
      label: "Product List",
    },
    {
      key: "/admin/OrderTable",
      icon: <ShoppingCartOutlined />,
      label: "Order List",
    },
  ];

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      collapsedWidth={80}
      width={250}
      style={{ height: "100vh", position: "fixed", left: 0, top: 0 }}
    >
      <div className="p-4 text-white text-center">
        {collapsed ? (
          <MenuUnfoldOutlined onClick={() => setCollapsed(false)} />
        ) : (
          <MenuFoldOutlined onClick={() => setCollapsed(true)} />
        )}
      </div>

      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        onClick={({ key }) => navigate(key)}
        items={items}
      />
    </Sider>
  );
};

export default SidebarDashboard;
