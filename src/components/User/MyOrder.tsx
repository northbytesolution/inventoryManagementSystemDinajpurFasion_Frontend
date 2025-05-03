
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useGetMyOrdersQuery } from "@/redux/features/order/orderManagement.api";
import { useAppSelector } from "@/redux/hooks";
import { TOrder } from "@/types/order.type";
import { Card, Empty, Spin, Table, TableColumnsType, Tag, Typography } from "antd";
import { DollarCircleOutlined, ShoppingOutlined } from "@ant-design/icons";


export default function MyOrders() {
  const user = useAppSelector(selectCurrentUser)
//   const { data: getUserData } = useGetUserQuery(user?.email, {
//       refetchOnMountOrArgChange: true,
//       skip: !user,
//     });
  const { data: ordersData, isFetching } = useGetMyOrdersQuery(user?.email,{
    refetchOnMountOrArgChange: true,
    skip: !user,
  });

  const tableData = ordersData?.data?.map((order: TOrder) => ({
      key: order._id,
      orderId: order.orderId,
      lPrice: order.totalPrice,
      quantity: order.quantity,
      product: order.product.name,
      status: order.status,
      transaction_id: order?.transaction?.paymentId,
    }));

    const columns: TableColumnsType<TOrder> = [
      {
        title: "Order ID",
        dataIndex: "orderId",
        key: "orderId",
        render: (text) => (
          <Tag color="blue">
            <code>{text}</code>
          </Tag>
        ),
      },
      {
        title: "Product",
        dataIndex: "product",
        key: "product",
        render: (text) => (
          <span className="font-medium text-gray-700">{text}</span>
        ),
      },
      {
        title: "Quantity",
        dataIndex: "quantity",
        key: "quantity",
        render: (quantity) => (
          <Tag color="green">
            <ShoppingOutlined /> {quantity}
          </Tag>
        ),
      },
      {
        title: "Total Price",
        dataIndex: "lPrice",
        key: "lPrice",
        render: (price) => (
          <Tag color="gold">
            <DollarCircleOutlined /> ${price}
          </Tag>
        ),
      },
      {
        title: "Transaction ID",
        dataIndex: "transaction_id",
        key: "transaction_id",
        render: (text) => (
          <Tag color="purple">
            <code>{text}</code>
          </Tag>
        ),
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (status) => {
          const statusColors = {
            pending: "orange",
            paid: "blue",
            shipped: "cyan",
            delivered: "green",
            cancelled: "red",
          };
          return (
            <Tag color={statusColors[status as keyof typeof statusColors]}>
              {status.toUpperCase()}
            </Tag>
          );
        },
      },
    ];

    if (isFetching) {
      return (
        <div className="flex justify-center items-center h-screen">
          <Spin size="large" />
        </div>
      );
    }

    if (ordersData?.data.length === 0) {
      return (
        <div className="flex justify-center items-center h-screen">
          <Empty
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            styles={{ image: { height: 200 } }}
            description={
              <Typography.Text type="secondary" className="text-lg">
                No Orders Found
              </Typography.Text>
            }
          />
        </div>
      );
    }
  
  return (
    <div className="p-6">
    <Card className="shadow-md">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 text-center">
          My Orders
        </h1>
        <p className="text-center text-gray-500 mt-2">
          Manage and track all my orders
        </p>
      </div>
      
      <Table<TOrder>
        columns={columns}
        dataSource={tableData}
        style={{ overflow: "auto" }}
        pagination={{
          pageSize: 10,
          showTotal: (total, range) => 
            `${range[0]}-${range[1]} of ${total} orders`,
          showSizeChanger: true,
          showQuickJumper: true,
        }}
        className="shadow-sm"
        bordered
      />
    </Card>
  </div>
  );
}