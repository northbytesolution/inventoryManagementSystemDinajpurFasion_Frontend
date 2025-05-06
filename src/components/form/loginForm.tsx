import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { setUser, TUser } from "@/redux/features/auth/authSlice";
import { verifyToken } from "@/utils/verifyToken";
import { Form, Input, Button, Card, Typography, message, Checkbox } from "antd";
import { LockOutlined,  UserOutlined } from "@ant-design/icons";
import { useEffect } from "react";

const { Title } = Typography;

const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();
  // const [form] = Form.useForm();
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    if (user) {
      const redirectTo = location.state?.from?.pathname || (user.roles[0] === "admin" ? "/" : user.roles === "customer" ? "/" : "login");
      navigate(redirectTo);
    }
  }, [user, navigate, location]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (values: any) => {
    const key = "login";
    message.loading({ content: "Logging in...", key });
    try {
      const res = await login(values).unwrap();
    
      const user = verifyToken(res.userInfo.token) as TUser;
      // console.log("Login response", user);
      dispatch(setUser({ user:res.userInfo.user_info, token: res.userInfo.token }));
      message.success({ content: "Logged in successfully!", key, duration: 2 });
      
      const redirectTo = location.state?.from?.pathname || (user.roles === "admin" ? "/admin/dashboard" : user.roles === "customer" ? "/" : "login");
      navigate(redirectTo);
    } catch (error) {
      console.error("Login error", error);
      message.error("Failed to login. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center relative overflow-hidden">
      <Card className="w-full max-w-md p-8 rounded-2xl shadow-xl">
        <div className="text-center mb-6">
          <Title level={2} className="!mb-0">Dinajpur Fashion</Title>
          {/* <Text type="secondary">Fashion For All</Text> */}
        </div>

        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onSubmit}
          layout="vertical"
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please enter your email!' }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="enter your email"
              className="py-2"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please enter your password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="enter your password"
              className="py-2"
            />
          </Form.Item>

          <div className="flex items-center justify-between mb-4">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>remember me</Checkbox>
            </Form.Item>
            <Link to="#">forgot password</Link>
          </div>

          <Form.Item>
            <Button type="primary" htmlType="submit" block className="bg-blue-500 hover:bg-blue-600">
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginForm;
