

import { Layout, Button, Card } from "antd";
import { logout } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { Outlet } from "react-router-dom";
import SidebarDashboard from "./SidebarDashboard";

const { Header, Content } = Layout;

const DashboardLayout = () => {
  const dispatch = useAppDispatch();

  // Handle logout action
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          background: "#001529",
          padding: "15px 16px",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button type="primary" danger onClick={handleLogout}>
          Logout
        </Button>
      </Header>
      <Layout>
        <SidebarDashboard />
        <Layout className="lg:pl-[250px] ">
          <Content>
            <div className="p-6">
              <Card className="shadow-md">
                <Outlet />
              </Card>
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
