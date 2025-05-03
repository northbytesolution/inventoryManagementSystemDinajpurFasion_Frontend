import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/redux/hooks";

import { setUser, TUser } from "@/redux/features/auth/authSlice";
import { verifyToken } from "@/utils/verifyToken";
import { Form, Input, Button, Card, Typography, message } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import { useSignupMutation } from "@/redux/features/admin/userManagement.api";
import { useLoginMutation } from "@/redux/features/auth/authApi";

const { Title } = Typography;

type SignupFormValues = {
  name: string;
  email: string;
  password: string;
};

const SignupForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [signup] = useSignupMutation();
  const [form] = Form.useForm<SignupFormValues>();
  const [login] = useLoginMutation();
  const onSubmit = async (values: SignupFormValues) => {
    const key = "signup";
    message.loading({ content: "Signing up...", key });
    try {
      const payload = {
        password: values.password,
        customer: {
          name: values.name,
          email: values.email,
        },
      };
      const payloadLogin = {
        email: values.email,
        password: values.password,
      };
      const res = await signup(payload).unwrap();
      console.log(res);
      if (res.success == true) {
        await message.success({
          content: "Customer is created successfully",
          key,
          duration: 2,
        });
        const resLogin = await login(payloadLogin).unwrap();
        const user = verifyToken(resLogin.data.accessToken) as TUser;
        dispatch(setUser({ user, token: resLogin.data.accessToken }));
        await message.success({
          content: "Login successful!",
          key,
          duration: 2,
        });
        navigate("/");
      }
    } catch (error) {
      console.error("Signup error", error);
      message.error("Failed to sign up. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md shadow-lg rounded-lg p-6">
        <Title level={2} className="text-center mb-6">
          Sign Up
        </Title>
        <Form form={form} layout="vertical" onFinish={onSubmit}>
          <Form.Item<SignupFormValues>
            name="name"
            label="Full Name"
            rules={[{ required: true, message: "Please enter your name!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Enter your name" />
          </Form.Item>

          <Form.Item<SignupFormValues>
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: "Please enter your email!",
                type: "email",
              },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Enter your email" />
          </Form.Item>

          <Form.Item<SignupFormValues>
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter your password"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Sign Up
            </Button>
          </Form.Item>
          <p>
            Already an User?{" "}
            <span className="text-red-600 ">click the Login</span>
          </p>
        </Form>
        <Button type="default" block onClick={() => navigate("/login")}>
          Login
        </Button>
      </Card>
    </div>
  );
};

export default SignupForm;
