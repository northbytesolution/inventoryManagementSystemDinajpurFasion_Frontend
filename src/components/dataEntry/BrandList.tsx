/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Typography, List, Spin, message, Modal, Input } from "antd";

import {
  useGetAllBrandQuery,
  useDeleteBrandMutation,
  useUpdateBrandMutation,
} from "@/redux/features/admin/dataEntry/Brand.api";

const { Title } = Typography;

interface brand {
  id: number;
  name: string;
  slug: string;
}

const BrandList: React.FC = () => {
  const { data: brands, isFetching } = useGetAllBrandQuery(undefined);
  const [deletebrand, { isLoading: isDeleting }] =
    useDeleteBrandMutation();
  const [updatebrand, { isLoading: isUpdating }] =
    useUpdateBrandMutation();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentbrand, setCurrentbrand] = useState<brand | null>(
    null
  );
  const [updatedName, setUpdatedName] = useState("");
  const [updatedNameSlug, setUpdatedNameSlug] = useState("");

  const handleEdit = (brand: brand) => {
    setCurrentbrand(brand);
    setUpdatedName(brand.name);
    setUpdatedNameSlug(brand.slug);
    setIsModalVisible(true);
  };

  const handleUpdate = async () => {
    if (!currentbrand) return;

    try {
      await updatebrand({
        id: currentbrand.id,
        data: { name: updatedName, slug: updatedNameSlug },
      }).unwrap();

      message.success("brand updated successfully!");
      setIsModalVisible(false);
    } catch (error) {
      message.error("Failed to update brand. Please try again.");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deletebrand(id).unwrap();
      message.success("brand deleted successfully!");
    } catch (error) {
      message.error("Failed to delete brand. Please try again.");
    }
  };

  if (isFetching) {
    return (
      <div className="text-center mt-5">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="w-full sm:w-2/3 p-6">
      <Title level={5} className="text-gray-800 mb-4">
        brand List
      </Title>
      <List
        bordered
        dataSource={Array.isArray(brands?.data) ? brands.data : []}
        renderItem={(brand: brand) => (
          <List.Item
            key={brand.id}
            actions={[
              <button
                key="edit"
                className="text-blue-500 hover:underline"
                onClick={() => handleEdit(brand)}
              >
                Edit
              </button>,
              <button
                key="delete"
                className="text-red-500 hover:underline"
                onClick={() => handleDelete(brand.id)}
                disabled={isDeleting}
              >
                Delete
              </button>,
            ]}
          >
            <strong>{brand.name}</strong>{brand.slug && ` (${brand.slug})`}
          </List.Item>
        )}
      />

      <Modal
        title="Edit brand"
        open={isModalVisible}
        onOk={handleUpdate}
        onCancel={() => setIsModalVisible(false)}
        confirmLoading={isUpdating}
      >
        <div className="mb-3">
          <Typography.Text strong>brand Name</Typography.Text>
          <Input
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
            placeholder="Enter brand name"
          />
        </div>

        <div>
          <Typography.Text strong>Slug</Typography.Text>
          <Input
            value={updatedNameSlug}
            onChange={(e) => setUpdatedNameSlug(e.target.value)}
            placeholder="Enter brand slug"
          />
        </div>
      </Modal>
    </div>
  );
};

export default BrandList;
