/* eslint-disable @typescript-eslint/no-explicit-any */

import LocationList from "@/components/dataEntry/LocationList";

import { useAddLocationMutation } from "@/redux/features/admin/dataEntry/Location.api";
import { Form, Input, Button, message } from "antd";

const Location = () => {
  const [form] = Form.useForm();
  // const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [addLocation] = useAddLocationMutation();
  const onFinish = async (values: any) => {
    console.log(values);
    const res = await addLocation(values).unwrap();
    console.log(res);
    message.success("location added successfully");
    form.resetFields();
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
              label="Location Name"
              name="name"
              rules={[{ required: true }]}
            >
              <Input placeholder="brand Name" />
            </Form.Item>
            <Form.Item label="type" name="type" rules={[{ required: true }]}>
              <Input placeholder="Location type" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Add brand
              </Button>
            </Form.Item>
          </Form>
        </div>
        <LocationList />
      </div>
    </div>
  );
};

export default Location;
