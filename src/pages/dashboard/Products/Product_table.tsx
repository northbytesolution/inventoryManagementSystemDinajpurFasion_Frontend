import React, { useState } from "react";
import { TProduct } from "@/types";
import { Modal, Form, Input, message, Upload, Button, Select } from "antd";
import { useUpdateProductMutation } from "@/redux/features/admin/productManagement.api";
import ProductTable from "@/components/form/editProductTable";
import { RcFile, UploadChangeParam } from "antd/es/upload";
import { UploadOutlined } from "@ant-design/icons";


const { Option } = Select;

const ProductManagement: React.FC = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<TProduct | null>(null);
  const [form] = Form.useForm();
  const [updateProduct, { isLoading }] = useUpdateProductMutation();
  const [refreshTable, setRefreshTable] = useState(false); // State to trigger refresh

  const handleEdit = (product: TProduct) => {
    setEditingProduct(product);
    form.setFieldsValue(product);
    setIsEditModalOpen(true);
  };

  const handleCancel = () => {
    setIsEditModalOpen(false);
    setEditingProduct(null);
  };
  const [fileList, setFileList] = useState<RcFile[]>([]);

  const handleUploadChange = ({ fileList }: UploadChangeParam) => {
    setFileList(fileList.map((file) => file.originFileObj as RcFile));
  };
  const handleUpdateProduct = async () => {
    try {
      const values = await form.validateFields();
      
    const formData = new FormData();
    formData.append("data", JSON.stringify(values));
    fileList.forEach((file) => formData.append("file", file));
      if (editingProduct) {
        await updateProduct({ id: editingProduct._id, data: formData }).unwrap();
        message.success("Product updated successfully");
        handleCancel();
        setRefreshTable((prev) => !prev); // Toggle to trigger re-fetch
      }
    } catch (error) {
      message.error("Failed to update product");
      console.error("Update error:", error);
    }
  };

  // if (isLoading) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <Spin size="large" />
  //     </div>
  //   );
  // }

  return (
    <div>
      <ProductTable onEdit={handleEdit} refreshTable={refreshTable} />

      <Modal
        title="Edit Product"
        open={isEditModalOpen}
        onCancel={handleCancel}
        confirmLoading={isLoading}
        onOk={handleUpdateProduct}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Bicycle Name"
            name="name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Brand" name="brand">
            <Input />
          </Form.Item>
          <Form.Item label="Price" name="price">
            <Input type="number" />
          </Form.Item>
          <Form.Item
          label="Type"
          name="type"
          rules={[{ required: true, message: "Please select the type!" }]}
        >
          <Select>
            {(["Mountain", "Road", "Hybrid", "BMX", "Electric"] as const).map(
              (type) => (
                <Option key={type} value={type}>
                  {type}
                </Option>
              )
            )}
          </Select>
        </Form.Item>
          <Form.Item label="Quantity" name="quantity">
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input.TextArea />
          </Form.Item>
          <Form.Item label="Upload Product Image">
            <Upload
              beforeUpload={() => false}
              listType="picture"
              fileList={fileList} // Ensure file list resets
              onChange={handleUploadChange}
            >
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductManagement;
