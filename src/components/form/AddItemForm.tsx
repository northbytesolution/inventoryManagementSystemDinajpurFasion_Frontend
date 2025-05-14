import React, { useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Select,
  Button,
  Upload,
  message,
  Divider,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { RcFile, UploadChangeParam } from "antd/es/upload/interface";
import { useAddProductManagementMutation } from "@/redux/features/admin/productManagement.api";
import { TProduct } from "@/types";

const { Option } = Select;

const AddItemForm: React.FC = () => {
  const [addProductManagement] = useAddProductManagementMutation();
  const [form] = Form.useForm<TProduct>();
  const [fileList, setFileList] = useState<RcFile[]>([]);
  const [loading, setLoading] = useState(false);

  const handleUploadChange = ({ fileList }: UploadChangeParam) => {
    setFileList(fileList.map((file) => file.originFileObj as RcFile));
  };

  const onFinish = async (values: TProduct) => {
    if (fileList.length === 0) {
      message.error("Please upload at least one product image.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("data", JSON.stringify(values));
    fileList.forEach((file) => formData.append("file", file));

    try {
      await addProductManagement(formData).unwrap();
      message.success("Product added successfully!");
      form.resetFields();
      setFileList([]);
    } catch {
      message.error("Failed to add product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        Add New Product
      </h1>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ quantity: 1 }}
      >
        <Divider orientation="left">📝 Basic Info</Divider>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item
            label="Product Name"
            name="name"
            rules={[{ required: true, message: "Enter the product name!" }]}
          >
            <Input placeholder="e.g. Premium Smartphone X" />
          </Form.Item>

          <Form.Item
            label="SKU"
            name="sku"
            rules={[{ required: true, message: "Enter the SKU!" }]}
          >
            <Input placeholder="e.g. PSX-2023" />
          </Form.Item>

          <Form.Item
            label="Slug"
            name="slug"
            rules={[{ required: true, message: "Enter a slug!" }]}
          >
            <Input placeholder="e.g. premium-smartphone-x" />
          </Form.Item>

          <Form.Item
            label="Barcode"
            name="barcode"
            rules={[{ required: true, message: "Enter the barcode!" }]}
          >
            <Input placeholder="e.g. 9876543210123" />
          </Form.Item>
        </div>

        <Divider orientation="left">💲 Pricing</Divider>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Form.Item
            label="Purchase Price ($)"
            name="purchasePrice"
            rules={[{ required: true, message: "Enter purchase price!" }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Selling Price ($)"
            name="sellingPrice"
            rules={[{ required: true, message: "Enter selling price!" }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item label="Discount Price ($)" name="discountPrice">
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item label="Discount (%)" name="discount">
            <InputNumber min={0} max={100} style={{ width: "100%" }} />
          </Form.Item>
        </div>

        <Divider orientation="left">📦 Inventory</Divider>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[{ required: true, message: "Enter the quantity!" }]}
          >
            <InputNumber min={1} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Location"
            name="locationId"
            rules={[{ required: true, message: "Select a location!" }]}
          >
            <Select placeholder="Select a location">
              <Option value={1}>Warehouse A</Option>
              <Option value={2}>Warehouse B</Option>
            </Select>
          </Form.Item>
        </div>

        <Divider orientation="left">📎 Associations</Divider>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item
            label="Brand"
            name="brandId"
            rules={[{ required: true, message: "Select a brand!" }]}
          >
            <Select placeholder="Select brand">
              <Option value={1}>Brand A</Option>
              <Option value={2}>Brand B</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Category"
            name="categoryId"
            rules={[{ required: true, message: "Select a category!" }]}
          >
            <Select placeholder="Select category">
              <Option value={3}>Smartphones</Option>
              <Option value={4}>Accessories</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Attributes" name="attributeIds">
            <Select mode="multiple" placeholder="Select attributes">
              <Option value={1}>64GB</Option>
              <Option value={2}>128GB</Option>
              <Option value={3}>Waterproof</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Tags" name="tagIds">
            <Select mode="multiple" placeholder="Select tags">
              <Option value={1}>New Arrival</Option>
              <Option value={2}>Best Seller</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Related Items" name="relatedItemIds">
            <Select mode="multiple" placeholder="Select related products">
              <Option value={10}>Case for PSX</Option>
              <Option value={11}>Wireless Charger</Option>
            </Select>
          </Form.Item>
        </div>

        <Divider orientation="left">🖼️ Media</Divider>
        <Form.Item label="Upload Product Images">
          <Upload
            beforeUpload={() => false}
            listType="picture-card"
            fileList={fileList.map((file, index) => ({
              uid: index.toString(),
              name: file.name,
              status: "done",
              url: URL.createObjectURL(file),
              originFileObj: file,
            }))}
            onChange={handleUploadChange}
            multiple
          >
            <div>
              <UploadOutlined />
              <div className="mt-1">Upload</div>
            </div>
          </Upload>
        </Form.Item>

        <Divider orientation="left">🗒️ Description</Divider>
        <Form.Item label="Description" name="description">
          <Input.TextArea rows={5} placeholder="Describe the product..." />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            disabled={loading}
            className="w-full rounded-lg"
          >
            {loading ? "Submitting..." : "Submit Product"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddItemForm;
