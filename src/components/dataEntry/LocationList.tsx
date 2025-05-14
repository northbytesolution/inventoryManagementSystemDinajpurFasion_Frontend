/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Typography, List, Spin, message, Modal, Input } from "antd";


import { useDeleteLocationMutation, useGetAllLocationQuery, useUpdateLocationMutation } from "@/redux/features/admin/dataEntry/Location.api";

const { Title } = Typography;

interface brand {
  id: number;
  name: string;
  type: string;
}

const LocationList: React.FC = () => {
  const { data: locations, isFetching } = useGetAllLocationQuery(undefined);
  const [deleteLocation, { isLoading: isDeleting }] =
    useDeleteLocationMutation();
  const [updateLocation, { isLoading: isUpdating }] =
    useUpdateLocationMutation();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<brand | null>(
    null
  );
  const [updatedName, setUpdatedName] = useState("");
  const [updatedNametype, setUpdatedNametype] = useState("");

  const handleEdit = (location: brand) => {
    setCurrentLocation(location);
    setUpdatedName(location.name);
    setUpdatedNametype(location.type);
    setIsModalVisible(true);
  };

  const handleUpdate = async () => {
    if (!currentLocation) return;

    try {
      await updateLocation({
        id: currentLocation.id,
        data: { name: updatedName, type: updatedNametype },
      }).unwrap();

      message.success("Location updated successfully!");
      setIsModalVisible(false);
    } catch (error) {
      message.error("Failed to update brand. Please try again.");
    }
  };

  const handleDelete = async (id: number) => {
    console.log(id);
    try {
     
      await deleteLocation(id).unwrap();
      message.success("Location deleted successfully!");
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
        Location List
      </Title>
      <List
        bordered
        dataSource={Array.isArray(locations?.data) ? locations.data : []}
        renderItem={(location: brand) => (
          <List.Item
            key={location.id}
            actions={[
              <button
                key="edit"
                className="text-blue-500 hover:underline"
                onClick={() => handleEdit(location)}
              >
                Edit
              </button>,
              <button
                key="delete"
                className="text-red-500 hover:underline"
                onClick={() => handleDelete(location.id)}
                disabled={isDeleting}
              >
                Delete
              </button>,
            ]}
          >
            <strong>{location.name}</strong>{location.type && ` (${location.type})`}
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
          <Typography.Text strong>type</Typography.Text>
          <Input
            value={updatedNametype}
            onChange={(e) => setUpdatedNametype(e.target.value)}
            placeholder="Enter brand type"
          />
        </div>
      </Modal>
    </div>
  );
};

export default LocationList;
