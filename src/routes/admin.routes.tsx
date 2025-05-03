import AdminDashboard from "@/pages/dashboard/AdminDashboard";
import OrderTable from "@/pages/dashboard/Orders/OrderTable";
import Add_Products from "@/pages/dashboard/Products/Add_Products";
import Product_table from "@/pages/dashboard/Products/Product_table";
import UserManagement from "@/pages/dashboard/UserManagement/UserManagement";

export const adminPaths = [
  {
    name: 'Dashboard',
    path: 'dashboard',
    element: <AdminDashboard />,
  },
  {
    name: 'Users',
    path: 'users',
    element: <UserManagement />,
  },
  {
    name: 'AddProduct',
    path: 'addProduct',
    element: <Add_Products />,
  },
  {
    name: 'ProductTable',
    path: 'productTable',
    element: <Product_table />,
  },
  {
    name: 'OrderTable',
    path: 'orderTable',
    element: <OrderTable />,
  },

];

