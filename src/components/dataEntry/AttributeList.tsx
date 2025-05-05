/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Typography, List, Spin, message, Modal, Input } from "antd";

import {
  useGetAllAttributesQuery,
  useDeleteAttributesMutation,
  useUpdateAttributesMutation,
} from "@/redux/features/admin/dataEntry/Attribute.api";

const { Title } = Typography;

interface Attribute {
  id: number;
  name: string;
  slug: string;
}

const AttributeList: React.FC = () => {
  const { data: attributes, isFetching } = useGetAllAttributesQuery(undefined);
  const [deleteAttribute, { isLoading: isDeleting }] =
    useDeleteAttributesMutation();
  const [updateAttribute, { isLoading: isUpdating }] =
    useUpdateAttributesMutation();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentAttribute, setCurrentAttribute] = useState<Attribute | null>(
    null
  );
  const [updatedName, setUpdatedName] = useState("");
  const [updatedNameSlug, setUpdatedNameSlug] = useState("");

  const handleEdit = (attribute: Attribute) => {
    setCurrentAttribute(attribute);
    setUpdatedName(attribute.name);
    setUpdatedNameSlug(attribute.slug);
    setIsModalVisible(true);
  };

  const handleUpdate = async () => {
    if (!currentAttribute) return;

    try {
      await updateAttribute({
        id: currentAttribute.id,
        data: { name: updatedName, slug: updatedNameSlug },
      }).unwrap();

      message.success("Attribute updated successfully!");
      setIsModalVisible(false);
    } catch (error) {
      message.error("Failed to update attribute. Please try again.");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteAttribute(id).unwrap();
      message.success("Attribute deleted successfully!");
    } catch (error) {
      message.error("Failed to delete attribute. Please try again.");
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
        Attribute List
      </Title>
      <List
        bordered
        dataSource={Array.isArray(attributes?.data) ? attributes.data : []}
        renderItem={(attribute: Attribute) => (
          <List.Item
            key={attribute.id}
            actions={[
              <button
                key="edit"
                className="text-blue-500 hover:underline"
                onClick={() => handleEdit(attribute)}
              >
                Edit
              </button>,
              <button
                key="delete"
                className="text-red-500 hover:underline"
                onClick={() => handleDelete(attribute.id)}
                disabled={isDeleting}
              >
                Delete
              </button>,
            ]}
          >
            <strong>{attribute.name}</strong>{attribute.slug && ` (${attribute.slug})`}
          </List.Item>
        )}
      />

      <Modal
        title="Edit Attribute"
        open={isModalVisible}
        onOk={handleUpdate}
        onCancel={() => setIsModalVisible(false)}
        confirmLoading={isUpdating}
      >
        <div className="mb-3">
          <Typography.Text strong>Attribute Name</Typography.Text>
          <Input
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
            placeholder="Enter attribute name"
          />
        </div>

        <div>
          <Typography.Text strong>Slug</Typography.Text>
          <Input
            value={updatedNameSlug}
            onChange={(e) => setUpdatedNameSlug(e.target.value)}
            placeholder="Enter attribute slug"
          />
        </div>
      </Modal>
    </div>
  );
};

export default AttributeList;
