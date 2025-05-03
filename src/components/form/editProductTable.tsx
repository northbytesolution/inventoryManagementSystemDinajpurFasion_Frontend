/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  useEffect,
  // useRef,
  useState,
} from "react";
import {
  useGetAllProductsQuery,
  useDeleteProductMutation,
} from "@/redux/features/admin/productManagement.api";
import { TProduct, TQueryParam } from "@/types";
import {
  Button,
  Image,
  //   Input,
  //   InputRef,
  Pagination,
  Popconfirm,
  Space,
  Spin,
  Table,
  //   TableColumnType,
} from "antd";
// import { FilterDropdownProps } from "antd/es/table/interface";
import {
  QuestionCircleOutlined,
  // SearchOutlined
} from "@ant-design/icons";
// import Highlighter from "react-highlight-words";

interface ProductTableProps {
  onEdit: (product: TProduct) => void;
  refreshTable: boolean; // Add this line
}
const ProductTable: React.FC<ProductTableProps> = ({
  onEdit,
  refreshTable,
}) => {
  const [params] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1);
  //   const [searchText, setSearchText] = useState("");
  //   const [searchedColumn, setSearchedColumn] = useState<string>("");
  //   const searchInput = useRef<InputRef>(null);
  const {
    data: productsResponse,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetAllProductsQuery([
    { name: "page", value: page },
    { name: "sort", value: "id" },
    ...params,
  ]);
  useEffect(() => {
    refetch(); // Re-fetch data when refreshTable changes
  }, [refreshTable]);
  const [deleteProduct] = useDeleteProductMutation();

  const handleDelete = async (record: TProduct) => {
    try {
      await deleteProduct(record._id);
      refetch();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const metaData = productsResponse?.data?.meta;

  if (isLoading || isFetching) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (isError || !productsResponse || !productsResponse.data.result) {
    return <div>Error loading products.</div>;
  }

  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Image",
      dataIndex: "productImg",
      key: "productImg",
      render: (productImg: string) => (
        <Image src={productImg} alt="Product" style={{ width: 50 }} />
      ),
    },
    {
      title: "Bicycle Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Price ($)",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "In Stock",
      dataIndex: "inStock",
      key: "inStock",
      render: (inStock: boolean) => (inStock ? "Yes" : "No"),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: TProduct) => (
        <Space>
          <Button type="link" onClick={() => onEdit(record)}>
            Edit
          </Button>
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
        </Space>
      ),
    },
  ];

  return (
    <div className="overflow-x-auto">
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={productsResponse?.data?.result}
        pagination={false}
      />
      <Pagination
        current={page}
        onChange={(value) => setPage(value)}
        pageSize={metaData?.limit}
        total={metaData?.total}
      />
    </div>
  );
};

export default ProductTable;
