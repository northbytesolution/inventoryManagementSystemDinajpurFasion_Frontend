/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Input, Button, Card, notification } from "antd";
import { useChangePasswordMutation } from "@/redux/features/auth/authApi";

import { useAppDispatch } from "@/redux/hooks";
// import { changePasswordSchema } from "@/schemas/authSchemas";
import { TResponse } from "@/types";
// import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { logout } from "@/redux/features/auth/authSlice";

export default function ChangePassword({ User }: any) {
  const [changePassword] = useChangePasswordMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    notification.info({
      message: "Changing password...",
      key: "loading",
    });
    try {
      data.user = User;
      const res = (await changePassword(data)) as TResponse<any>;
      console.log(res);
      if (res.data) {
        notification.success({
          message: "Password changed successfully",
          key: "loading",
        });
        dispatch(logout());
        navigate("/login");
      }
    } catch (err) {
      notification.error({
        message: "Something went wrong",
        key: "loading",
      });
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center items-center  bg-gray-100">
      <Card className="w-full max-w-md">
        <Card.Meta title={<div className="text-center">Change Password</div>} />
        <Form
          onFinish={onSubmit}
          className="space-y-4"
          layout="vertical"
          //   resolver={zodResolver(changePasswordSchema)}
        >
          <Form.Item
            name="oldPassword"
            label="Old Password"
            rules={[
              { required: true, message: "Please input your old password!" },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="newPassword"
            label="New Password"
            rules={[
              { required: true, message: "Please input your new password!" },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item className="flex justify-center">
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
