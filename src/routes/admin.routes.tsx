import AdminDashboard from "@/pages/dashboard/AdminDashboard";
import Attributes from "@/pages/dashboard/DataEntry/Attributes";
import Brand from "@/pages/dashboard/DataEntry/Brand";
import Category from "@/pages/dashboard/DataEntry/Category";
import Tag from "@/pages/dashboard/DataEntry/Tag";

import Add_Products from "@/pages/dashboard/Products/Add_Products";
import Product_table from "@/pages/dashboard/Products/Product_table";
import UserManagement from "@/pages/dashboard/UserManagement/UserManagement";

export const adminPaths = [
  {
    name: 'Dashboard',
    path: '/',
    element: <AdminDashboard />,
  },
  {
    name: 'Category',
    path: '/category',
    element: <Category/>,
  },
  {
    name: 'Attributes',
    path: '/attributes',
    element: <Attributes/>,
  },
  {
    name: 'Brand',
    path: '/brand',
    element: <Brand/>,
  },
  {
    name: 'Tag',
    path: '/tag',
    element: <Tag/>,
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


];

