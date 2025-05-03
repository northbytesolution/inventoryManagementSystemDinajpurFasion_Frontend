import { Outlet } from "react-router-dom";

import "antd/dist/reset.css";
import MenubarEco from "./MenubarEco";
import FooterEco from "./FooterEco";

const MainLayout = () => {
  return (
    <>
      {/* this is main MainLayout <br/>
            <Outlet />
            <Button onClick={handleLogout}>Click me</Button> */}

      <div className="bg-gray-100 min-h-screen ">
        {/* Header */}
        <MenubarEco />
        <Outlet />
        <FooterEco />
      </div>
    </>
  );
};

export default MainLayout;
