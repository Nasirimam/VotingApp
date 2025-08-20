import {
  AbsoluteCenter,
  Button,
  Card,
  Center,
  createListCollection,
  Field,
  Input,
  Portal,
  Select,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import { Toaster, toaster } from "@/components/ui/toaster";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signin = () => {
  let intData = {
    name: "",
    email: "",
    password: "",
    rollnumber: "",
    department: "",
    year: "",
    bio: "",
    imageLink: "",
  };

  const navigate = useNavigate();

  const [data, setData] = useState(intData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  console.log(data);

  const handleSignup = async () => {
    // ✅ Check if any required field is empty
    if (
      !data.name ||
      !data.email ||
      !data.password ||
      !data.rollnumber ||
      !data.department ||
      !data.year ||
      !data.bio
    ) {
      toaster.create({
        description: "Please fill in all required fields",
        type: "error",
      });
      return; // Stop function here
    }

    try {
      const res = await axios.post(
        "https://votingbackend-sitg.onrender.com/voter/add",
        data
      );

      if (res.data === "User Added To DB") {
        navigate("/login");
      } else {
        console.log(res.data);
      }
    } catch (err) {
      console.error(err);
      toaster.create({
        description: "User Registration Failed",
        type: "error",
      });
    }
  };

  const frameworks = createListCollection({
    items: [
      { label: "BBA", value: "bba" },
      { label: "BCA", value: "bca" },
    ],
  });

  return (
    <Center paddingTop={"20px"} paddingBottom={"20px"}>
      <Card.Root width={"lg"} boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}>
        <Card.Header>
          <Card.Title>Sign up</Card.Title>
          <Card.Description>Fill in the form below to Sign Up</Card.Description>
        </Card.Header>
        <Card.Body>
          <Stack gap="3">
            <Field.Root>
              <Field.Label>Full Name</Field.Label>
              <Input
                onChange={handleChange}
                name="name"
                placeholder="Full Name"
                type="text"
              />
            </Field.Root>
            <Field.Root>
              <Field.Label>Email</Field.Label>
              <Input
                onChange={handleChange}
                name="email"
                placeholder="Email ID"
                type="email"
              />
            </Field.Root>
            <Field.Root>
              <Field.Label>Password</Field.Label>
              <Input
                onChange={handleChange}
                name="password"
                placeholder="Password"
                type="password"
              />
            </Field.Root>
            <Field.Root>
              <Field.Label>Roll Number</Field.Label>
              <Input
                onChange={handleChange}
                name="rollnumber"
                placeholder="rollnumber"
                type="number"
              />
            </Field.Root>
            <Select.Root
              collection={frameworks}
              name="department"
              onValueChange={(details) => {
                setData((prev) => ({
                  ...prev,
                  department: details.items[0].value, // ✅ Store label
                }));
              }}
            >
              <Select.HiddenSelect />
              <Select.Label>Select Department</Select.Label>
              <Select.Control>
                <Select.Trigger>
                  <Select.ValueText placeholder="Select Department" />
                </Select.Trigger>
                <Select.IndicatorGroup>
                  <Select.Indicator />
                </Select.IndicatorGroup>
              </Select.Control>
              <Portal>
                <Select.Positioner>
                  <Select.Content>
                    {frameworks.items.map((framework) => (
                      <Select.Item item={framework} key={framework.value}>
                        {framework.label}
                        <Select.ItemIndicator />
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Positioner>
              </Portal>
            </Select.Root>
            <Field.Root>
              <Field.Label>Year</Field.Label>
              <Input
                onChange={handleChange}
                name="year"
                placeholder="Admintion Year"
                type="number"
              />
            </Field.Root>
            <Field.Root>
              <Field.Label>Bio</Field.Label>
              <Textarea
                onChange={handleChange}
                name="bio"
                placeholder="Bio"
                type="text"
              />
            </Field.Root>
            <Field.Root>
              <Field.Label>Image Link</Field.Label>
              <Input
                onChange={handleChange}
                name="image"
                placeholder="Image Link"
                type="text"
              />
            </Field.Root>
          </Stack>
        </Card.Body>
        <Card.Footer justifyContent="flex-end">
          <Button variant="outline">Cancel</Button>
          <Button
            variant="outline"
            onClick={handleSignup}
            bgColor={"#4A90E2"}
            color={"white"}
          >
            Sign in
          </Button>
          <Toaster />
        </Card.Footer>
      </Card.Root>
    </Center>
  );
};
