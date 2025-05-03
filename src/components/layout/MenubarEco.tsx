import { useState } from "react";
import { MenuOutlined } from "@ant-design/icons";
import { Menu, Button, Drawer, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout } from "@/redux/features/auth/authSlice";
import { clearCart } from "@/redux/features/cart/cartSlice";

const items = [
  {
    label: <Link to="/">Home</Link>,
    key: "home",
  },

  {
    label: <Link to="/allProducts">Products</Link>,
    key: "products",
  },
  {
    label: <Link to="/aboutUs">About Us</Link>,
    key: "contact",
  },
];

const MenubarEco = () => {
  const [current, setCurrent] = useState("home");
  const [visible, setVisible] = useState(false);
  const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    message.success("Logout successfully");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleCustomerDashboard = () => {
    if (user && user.role == "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/CustomerDashboard");
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onClick = (e: any) => {
    setCurrent(e.key);
    setVisible(false); // Close drawer when menu item is clicked
  };

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <div className="bg-blue-600">
      <header className="py-4 px-4 flex justify-between items-center mx-auto max-w-6xl">
        <div className="px-4">
          <img
            src="/bicycleStore_transparent.png"
            alt="Logo"
            className="h-12"
          />
        </div>
        <nav className="flex items-center space-x-6">
          <Button
            className="lg:hidden"
            onClick={showDrawer}
            icon={<MenuOutlined />}
          />
          <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            theme="dark"
            className="bg-blue-600 text-white border-none hidden lg:flex"
            style={{ width: "400px" }}
            items={items}
          />
        </nav>
        <div>
          {user ? (
            <Button
              type="default"
              // shape="circle"
              className="ml-6"
              onClick={handleCustomerDashboard}
            >
              Dashboard
            </Button>
          ) : (
            ""
          )}
          {user ? (
            <Button
              type="primary"
              danger
              className="ml-6"
              onClick={handleLogout}
            >
              Logout
            </Button>
          ) : (
            <Button
              type="primary"
              danger
              className="ml-6"
              onClick={handleLogin}
            >
              Login
            </Button>
          )}
        </div>
      </header>
      <Drawer
        title="Menu"
        placement="right"
        onClose={onClose}
        visible={visible}
        bodyStyle={{ padding: 0 }}
      >
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          mode="inline"
          theme="dark"
          className="bg-blue-600 text-white border-none"
          items={items}
        />
      </Drawer>
    </div>
  );
};

export default MenubarEco;
