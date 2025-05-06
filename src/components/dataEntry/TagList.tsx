/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Typography, List, Spin, message, Modal, Input } from "antd";

import {
  useGetAllTagQuery,
  useDeleteTagMutation,
  useUpdateTagMutation,
} from "@/redux/features/admin/dataEntry/Tag.api";

const { Title } = Typography;

interface Tag {
  id: number;
  name: string;
  slug: string;
}

const TagList: React.FC = () => {
  const { data: tags, isFetching } = useGetAllTagQuery(undefined);
  const [deleteTag, { isLoading: isDeleting }] =
    useDeleteTagMutation();
  const [updateTag, { isLoading: isUpdating }] =
    useUpdateTagMutation();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currenttag, setCurrenttag] = useState<Tag | null>(
    null
  );
  const [updatedName, setUpdatedName] = useState("");
  const [updatedNameSlug, setUpdatedNameSlug] = useState("");

  const handleEdit = (tag: Tag) => {
    setCurrenttag(tag);
    setUpdatedName(tag.name);
    setUpdatedNameSlug(tag.slug);
    setIsModalVisible(true);
  };

  const handleUpdate = async () => {
    if (!currenttag) return;

    try {
      await updateTag({
        id: currenttag.id,
        data: { name: updatedName, slug: updatedNameSlug },
      }).unwrap();

      message.success("tag updated successfully!");
      setIsModalVisible(false);
    } catch (error) {
      message.error("Failed to update tag. Please try again.");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTag(id).unwrap();
      message.success("tag deleted successfully!");
    } catch (error) {
      message.error("Failed to delete tag. Please try again.");
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
        tag List
      </Title>
      <List
        bordered
        dataSource={Array.isArray(tags?.data) ? tags.data : []}
        renderItem={(tag: Tag) => (
          <List.Item
            key={tag.id}
            actions={[
              <button
                key="edit"
                className="text-blue-500 hover:underline"
                onClick={() => handleEdit(tag)}
              >
                Edit
              </button>,
              <button
                key="delete"
                className="text-red-500 hover:underline"
                onClick={() => handleDelete(tag.id)}
                disabled={isDeleting}
              >
                Delete
              </button>,
            ]}
          >
            <strong>{tag.name}</strong>{tag.slug && ` (${tag.slug})`}
          </List.Item>
        )}
      />

      <Modal
        title="Edit tag"
        open={isModalVisible}
        onOk={handleUpdate}
        onCancel={() => setIsModalVisible(false)}
        confirmLoading={isUpdating}
      >
        <div className="mb-3">
          <Typography.Text strong>tag Name</Typography.Text>
          <Input
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
            placeholder="Enter tag name"
          />
        </div>

        <div>
          <Typography.Text strong>Slug</Typography.Text>
          <Input
            value={updatedNameSlug}
            onChange={(e) => setUpdatedNameSlug(e.target.value)}
            placeholder="Enter tag slug"
          />
        </div>
      </Modal>
    </div>
  );
};

export default TagList;
