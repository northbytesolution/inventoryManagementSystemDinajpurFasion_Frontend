/* eslint-disable @typescript-eslint/no-explicit-any */
import TagList from "@/components/dataEntry/TagList";
import { useAddTagMutation } from "@/redux/features/admin/dataEntry/Tag.api";
import { Form, Input, Button, message } from "antd";

const Tag = () => {
  const [form] = Form.useForm();
  // const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [addTag] = useAddTagMutation();
  const onFinish = async (values: any) => {
    console.log(values);
    const res = await addTag(values).unwrap();
    console.log(res);
    message.success("tag added successfully");
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
              label="tag Name"
              name="name"
              rules={[{ required: true }]}
            >
              <Input placeholder="tag Name" />
            </Form.Item>
            <Form.Item label="Slug" name="slug" rules={[{ required: true }]}>
              <Input placeholder="tag Slug" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Add Tag
              </Button>
            </Form.Item>
          </Form>
        </div>
        <TagList />
      </div>
    </div>
  );
};

export default Tag;
