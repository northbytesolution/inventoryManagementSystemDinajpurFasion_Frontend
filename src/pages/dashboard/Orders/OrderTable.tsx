/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useDeleteOrderMutation,
  useGetAllOrdersQuery,

} from "@/redux/features/order/orderManagement.api";
import { TOrder } from "@/types/order.type";
import {
  Empty,
  Spin,
  Table,
  TableColumnsType,
  Typography,
  Card,
  Tag,
  Button,
  message,
  Popconfirm,
} from "antd";
import { DollarCircleOutlined, QuestionCircleOutlined, ShoppingOutlined } from "@ant-design/icons";
import {  useState } from "react";

import { TQueryParam } from "@/types";




export default function OrderManagement() {
  // const [orderId, setOrderId] = useState("");
  const [params, setParams] = useState<TQueryParam[]>([]);

  const { data: ordersData, isFetching ,refetch} = useGetAllOrdersQuery([...params]);
  console.log(ordersData);
  const [deleteOrder] = useDeleteOrderMutation();
  const tableData = ordersData?.data?.map((order: TOrder) => ({
    key: order._id,
    _id: order._id,
    orderId: order.orderId,
    customer: order.user,
    lPrice: order.totalPrice,
    quantity: order.quantity,
    product: order.product.name,
    status: order.status,
    transaction_id: order?.transaction?.paymentId,
  }));
  
    const handleDelete = async (record: TOrder) => {
      try {
        await deleteOrder(record._id).then(() => {
          message.success("Order deleted successfully!");
        });
        refetch();
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    };

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
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
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
    {
      title: "Actions",
      render: (record) => (
  
        <Popconfirm
        title="Are you sure to delete this product?"
        onConfirm={() => handleDelete(record)}
        okText="Yes"
        cancelText="No"
        placement="topRight"
        icon={<QuestionCircleOutlined style={{ color: "red" }} />}
      >
        <Button danger>Delete</Button>
      </Popconfirm>
      ),
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
            Order Management
          </h1>
        </div>

        <Table<TOrder>
          columns={columns}
          dataSource={tableData}
          style={{ overflow: "auto" }}
          pagination={{
            current: ordersData?.meta?.page,
            total: ordersData?.meta?.total,
            pageSize: ordersData?.meta?.limit,
            onChange: (newPage, pageSize) => {
              const existingParams = params.filter(
                (param) => param.name !== "page" && param.name !== "limit"
              );
              setParams([
                ...existingParams,
                { name: "page", value: newPage.toString() },
                { name: "limit", value: pageSize.toString() },
              ]);
            },
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} products`,
            showSizeChanger: true,
          }}
          className="shadow-sm"
          bordered
        />
      </Card>
    </div>
  );
}
