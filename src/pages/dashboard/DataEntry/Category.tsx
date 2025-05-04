/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Form, Input, Select, Button, message } from 'antd';


import { useAddCategoryMutation, useGetAllCategorysQuery } from '@/redux/features/admin/dataEntry/Category.api';
import CategoryList from '@/components/dataEntry/CategoryList';



interface Category {
  id: string;
  name: string;
  slug: string;
  parent?: string;
}

// const initialCategories: Category[] = [
//   { id: '1', name: 'Electronics', slug: 'electronics' },
//   { id: '2', name: 'Laptops', slug: 'laptops', parent: 'Electronics' },
//   { id: '3', name: 'Phones', slug: 'phones', parent: 'Electronics' },
//   { id: '4', name: 'Fashion', slug: 'fashion' },
// ];

const Category: React.FC = () => {
  const [form] = Form.useForm();
  // const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [addCategory, { isLoading: isAdding }] = useAddCategoryMutation();
  const { data: categories, isFetching } = useGetAllCategorysQuery(undefined);

  console.log(categories);
  
  const onFinish =async (values: any) => {
    // const newCategory: Category = {
    //   id: Date.now().toString(),
    //   ...values,
    // };
    console.log(values);
    await addCategory(values).unwrap();
    message.success("Category added successfully");
    // form.resetFields();
  };
 if(isFetching){
  return "Loading...";
 }
 else
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
            <Form.Item label="Category Name" name="name" rules={[{ required: true }]}>
              <Input placeholder="Category Name" />
            </Form.Item>
            <Form.Item label="Slug" name="slug" rules={[{ required: true }]}>
              <Input placeholder="Category Slug" />
            </Form.Item>
            <Form.Item label="Parent Category" name="parentCategoryId">
              <Select placeholder="Select Parent Category" allowClear>
                {categories?.data.map(cat => (
                  <Select.Option key={cat.id} value={cat.id}>
                    {cat.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" >
                Add Category
              </Button>
            </Form.Item>
          </Form>
        </div>
        <CategoryList categories={categories?.data}/>
    
      </div>
    </div>
  );
};

export default Category;
