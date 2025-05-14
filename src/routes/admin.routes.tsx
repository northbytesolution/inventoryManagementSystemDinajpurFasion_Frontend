import AdminDashboard from "@/pages/dashboard/AdminDashboard";
import Add_Items from "@/pages/dashboard/Products/Add_Items";

import Product_table from "@/pages/dashboard/Products/Product_table";
import UserManagement from "@/pages/dashboard/UserManagement/UserManagement";

export const adminPaths = [
  {
    name: 'Dashboard',
    path: '/',
    element: <AdminDashboard />,
  },

 
  {
    name: 'Users',
    path: 'users',
    element: <UserManagement />,
  },
  {
    name: 'AddItem',
    path: 'addItem',
    element: <Add_Items />,
  },
  {
    name: 'ProductTable',
    path: 'productTable',
    element: <Product_table />,
  },


];

