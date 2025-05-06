/* eslint-disable @typescript-eslint/no-explicit-any */
import BrandList from "@/components/dataEntry/BrandList";
import { useAddBrandMutation } from "@/redux/features/admin/dataEntry/Brand.api";
import { Form, Input, Button, message } from "antd";

const Brand = () => {
  const [form] = Form.useForm();
  // const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [addBrand] = useAddBrandMutation();
  const onFinish = async (values: any) => {
    console.log(values);
    const res = await addBrand(values).unwrap();
    console.log(res);
    message.success("brand added successfully");
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
              label="brand Name"
              name="name"
              rules={[{ required: true }]}
            >
              <Input placeholder="brand Name" />
            </Form.Item>
            <Form.Item label="Slug" name="slug" rules={[{ required: true }]}>
              <Input placeholder="brand Slug" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Add brand
              </Button>
            </Form.Item>
          </Form>
        </div>
        <BrandList />
      </div>
    </div>
  );
};

export default Brand;
