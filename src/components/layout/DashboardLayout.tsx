import { Layout, Button, Card, Breadcrumb } from "antd";
import { logout } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { Link, Outlet, useLocation } from "react-router-dom";
import SidebarDashboard from "./SidebarDashboard";
import { useState } from "react";

const { Header, Sider, Content } = Layout;

const DashboardLayout = () => {
  const dispatch = useAppDispatch();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };
  const location = useLocation();
  const pathSnippets = location.pathname.split("/").filter((i) => i);

  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <Link to="/">Home</Link>
    </Breadcrumb.Item>,
    ...pathSnippets.map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
      const name =
        pathSnippets[index].charAt(0).toUpperCase() +
        pathSnippets[index].slice(1);
      return (
        <Breadcrumb.Item key={url}>
          <Link to={url}>{name}</Link>
        </Breadcrumb.Item>
      );
    }),
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => setCollapsed(broken)}
        width={250}
        style={{
          background: "#001529",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 1000,
        }}
      >
        <SidebarDashboard />
      </Sider>

      <Layout
        style={{
          marginLeft: collapsed ? 0 : 250,
          transition: "margin-left 0.2s",
        }}
      >
        <Header
          style={{
            background: "#001529",
            padding: "0 24px",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            position: "sticky",
            top: 0,
            zIndex: 999,
          }}
        >
          <Button type="primary" danger onClick={handleLogout}>
            Logout
          </Button>
        </Header>

        <Content style={{ margin: "24px 100px", transition: "all 0.2s ease" }}>
          <div className="mb-4">
            <Breadcrumb>{breadcrumbItems}</Breadcrumb>
          </div>
          <Card className="shadow-md">
            <Outlet />
          </Card>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
