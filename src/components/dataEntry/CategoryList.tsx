/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Tree, TreeDataNode, Typography, Space, message } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useDeleteCategoryMutation } from "@/redux/features/admin/dataEntry/Category.api";

const { Title } = Typography;

interface Category {
  id: number;
  name: string;
  slug: string;
  parentCategoryId: number | null;
  is_pations: boolean;
  quantity: number;
  created: string;
  parentCategory: Category | null;
  children: Category[];
}

const CategoryList = ({ categories }: { categories: any }) => {
  // const handleDelete = (id: number) => {
  //   console.log("Delete category ID:", id);
  //   // Implement actual delete logic here
  // };
  const [deleteCategory, { isLoading: isDeleting }] =
    useDeleteCategoryMutation();
  const handleDelete = async (id: number) => {
    try {
      await deleteCategory(id).unwrap();
      message.success("Category deleted successfully!");
    } catch (error) {
      message.error("Failed to delete Category. Please try again.");
    }
  };

  const convertToTreeData = (data: Category[]): TreeDataNode[] => {
    return data.map((cat) => ({
      title: (
        <div className="flex justify-between items-center max-w-5xl mx-auto">
          <strong>{cat.name}</strong> {cat.slug && `  (${cat.slug})`}
          <div className="ml-4 flex-shrink-0">
            <Space size="middle">
              <a className="text-blue-500 hover:underline cursor-pointer">
                Edit
              </a>
              <a
                className="text-red-500 hover:underline cursor-pointer"
                onClick={() => handleDelete(cat.id)}
              >
                Delete
              </a>
            </Space>
          </div>
        </div>
      ),
      key: cat.id,
      //   icon: cat.parentCategoryId ? <FrownOutlined /> : <SmileOutlined />,
      children: convertToTreeData(cat.children || []),
    }));
  };

  return (
    <div className="w-full sm:w-2/3 p-6">
      <Title level={5} className="text-gray-800 mb-4">
        Category List
      </Title>
      <Tree
        showIcon
        defaultExpandAll
        switcherIcon={<DownOutlined />}
        treeData={convertToTreeData(categories)}
      />
    </div>
  );
};

export default CategoryList;
