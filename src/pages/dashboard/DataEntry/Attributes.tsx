/* eslint-disable @typescript-eslint/no-explicit-any */

import AttributeList from "@/components/dataEntry/AttributeList";
import { useAddAttributesMutation } from "@/redux/features/admin/dataEntry/Attribute.api";
import { Form, Input, Button, message } from "antd";

const Attributes = () => {
  const [form] = Form.useForm();
  // const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [addAttributes] = useAddAttributesMutation();
  const onFinish = async (values: any) => {
    console.log(values);
    const res = await addAttributes(values).unwrap();
    console.log(res);
    message.success("Attribute added successfully");
    // form.resetFields();
  };
  //    if(isFetching ){
  //     return "Loading...";
  //    }

  return (
    <div className="p-6  flex items-center justify-center">
      <div className=" w-full max-w-6xl flex">
        {/* Left Form Panel */}
        <div className="w-full sm:w-1/3 p-6 border-r border-gray-300">
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            labelCol={{ span: 24 }}
            className="space-y-4"
          >
            <Form.Item
              label="Attribute Name"
              name="name"
              rules={[{ required: true }]}
            >
              <Input placeholder="Attribute Name" />
            </Form.Item>
            <Form.Item label="Slug" name="slug" rules={[{ required: true }]}>
              <Input placeholder="Attribute Slug" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Add Attribute
              </Button>
            </Form.Item>
          </Form>
        </div>

        <AttributeList />
      </div>
    </div>
  );
};

export default Attributes;
