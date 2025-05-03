import React, { useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Select,
  Button,
  Upload,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { RcFile, UploadChangeParam } from "antd/es/upload/interface";
import { useAddProductManagementMutation } from "@/redux/features/admin/productManagement.api";
import { TProduct } from "@/types";

const { Option } = Select;

const AddProductForm: React.FC = () => {
  const [addProductManagement] = useAddProductManagementMutation();
  const [form] = Form.useForm<TProduct>();
  const [fileList, setFileList] = useState<RcFile[]>([]);
  const [loading, setLoading] = useState(false); // Track loading state

  const handleUploadChange = ({ fileList }: UploadChangeParam) => {
    setFileList(fileList.map((file) => file.originFileObj as RcFile));
  };

  const onFinish = async (values: TProduct) => {
    if (fileList.length === 0) {
      message.error("Please upload a product image.");
      return;
    }

    setLoading(true); // Set loading to true when submitting

    const formData = new FormData();
    formData.append("data", JSON.stringify(values));
    fileList.forEach((file) => formData.append("file", file));

    try {
      await addProductManagement(formData).unwrap();
      message.success("Product added successfully!");
      form.resetFields();
      setFileList([]);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      message.error("Failed to add product. Please try again.");
    } finally {
      setLoading(false); // Reset loading state after submission
    }
  };

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 text-center">
          Add Product
        </h1>
      </div>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ inStock: true, quantity: 1 }}
      >
        <Form.Item
          label="Bicycle Name"
          name="name"
          rules={[
            { required: true, message: "Please enter the bicycle name!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Brand"
          name="brand"
          rules={[{ required: true, message: "Please enter the brand!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Price ($)"
          name="price"
          rules={[{ required: true, message: "Please enter the price!" }]}
        >
          <InputNumber min={1} style={{ width: "100%" }} />
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

        <Form.Item
          label="Quantity"
          name="quantity"
          rules={[{ required: true, message: "Please enter the quantity!" }]}
        >
          <InputNumber min={1} style={{ width: "100%" }} />
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

        <Form.Item
          label="Description"
          name="description"
          // rules={[{ required: true, message: "Please enter a description!" }]}
        >
          <Input.TextArea
            rows={6}
            placeholder="Enter a brief description of the product"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddProductForm;
