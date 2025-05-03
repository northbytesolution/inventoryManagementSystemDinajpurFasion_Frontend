// import AdminDashboard from "@/pages/dashboard/AdminDashboard";
// import OrderTable from "@/pages/dashboard/Orders/OrderTable";
// import Add_Products from "@/pages/dashboard/Products/Add_Products";
// import Product_table from "@/pages/dashboard/Products/Product_table";

import ProtectedRoute from "@/components/layout/ProtectedRoute";
import MyOrders from "@/components/User/MyOrder";
import AboutPage from "@/pages/About/AboutPage";
import AllProducts from "@/pages/AllProduct/AllProduct";
import Cart from "@/pages/cart/cart";
import Checkout from "@/pages/checkout/Checkout";
import OrderVerification from "@/pages/checkout/VerifyOrder";
import CustomerDashboard from "@/pages/CustomerDashoboard/CustomerDashboard";
import Home from "@/pages/home/Home";
import ProductDetailsPage from "@/pages/ProductDetailsPage/ProductDetailsPage";

export const ecommercePath = [
  {
    name: "home",
    path: "/",
    element: <Home />,
  },
  {
    name: "ProductDetailsPage",
    path: "/ProductDetailsPage/:id",
    element: <ProductDetailsPage />,
  },
  {
    name: "aboutUs",
    path: "/aboutUs",
    element: <AboutPage />,
  },
  {
    name: "AllProducts",
    path: "/allProducts",
    element: <AllProducts />,
  },
  {
    name: "cart",
    path: "/cart",
    element: (
      <ProtectedRoute role="customer">
        <Cart />
      </ProtectedRoute>
    ),
  },
  {
    name: "checkout",
    path: "/checkout/:id",
    element: (
      <ProtectedRoute role="customer">
        <Checkout />
      </ProtectedRoute>
    ),
  },
  {
    name: "Verify Order",
    path: "verify-order",
    element: (
      <ProtectedRoute role="customer">
        <OrderVerification />
      </ProtectedRoute>
    ),
  },
  {
    name: "Customer Dashboard",
    path: "CustomerDashboard",
    element: (
      <ProtectedRoute role="customer">
        <CustomerDashboard />
      </ProtectedRoute>
    ),
  },
  {
    name: "my orders",
    path: "myOrders",
    element: (
      <ProtectedRoute role="customer">
        <MyOrders />
      </ProtectedRoute>
    ),
  },
];
