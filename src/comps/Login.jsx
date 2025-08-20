import {
  AbsoluteCenter,
  Button,
  Card,
  Center,
  Field,
  Input,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";
import { toaster, Toaster } from "@/components/ui/toaster";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  let intData = {
    email: "",
    password: "",
  };

  const [data, setData] = useState(intData);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleLogin = async () => {
    if (!data.email || !data.password) {
      toaster.create({
        description: "Please fill in both Email and Password",
        type: "error",
      });
      return;
    }

    try {
      const res = await axios.post(
        "https://votingbackend-sitg.onrender.com/voter/login",
        data
      );

      if (res.data && res.data.token) {
        localStorage.setItem("token", res.data.token);

        toaster.create({
          description: "User Login Successful",
          type: "success",
        });

        navigate("/");
      } else {
        toaster.create({
          description: res.data?.message || "Invalid Credentials",
          type: "error",
        });
      }
    } catch (err) {
      console.error(err);
      toaster.create({
        description: "Something Went Wrong",
        type: "error",
      });
    }
  };

  const handleSignUp = () => {
    navigate("/signup"); // navigate to your signup page
  };

  return (
    <Center paddingTop={"20px"} paddingBottom={"20px"}>
      <Card.Root width={"lg"} boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}>
        <Card.Header>
          <Card.Title>Login</Card.Title>
          <Card.Description>Fill in the form below to login</Card.Description>
        </Card.Header>
        <Card.Body>
          <Stack gap="3">
            <Field.Root required>
              <Field.Label>
                Email ID
                <Field.RequiredIndicator />
              </Field.Label>
              <Input
                onChange={handleChange}
                name="email"
                placeholder="Email ID"
                type="email"
              />
            </Field.Root>
            <Field.Root required>
              <Field.Label>
                Type Your Password <Field.RequiredIndicator />
              </Field.Label>
              <Input
                onChange={handleChange}
                name="password"
                placeholder="Password"
                type="password"
              />
            </Field.Root>
          </Stack>
        </Card.Body>
        <Card.Footer justifyContent="flex-end" gap={2}>
          <Button variant="outline" onClick={handleSignUp} colorScheme="teal">
            Sign Up
          </Button>
          <Button
            variant="outline"
            onClick={handleLogin}
            bgColor={"#4A90E2"}
            color={"white"}
          >
            Login
          </Button>
          <Toaster />
        </Card.Footer>
      </Card.Root>
    </Center>
  );
};
