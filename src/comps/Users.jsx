import {
  Badge,
  Box,
  Button,
  Card,
  HStack,
  Image,
  Center,
} from "@chakra-ui/react";

export const Users = ({ name, rollno, regno }) => {
  return (
    <Center>
      <Card.Root flexDirection="row" overflow="hidden" maxW="xl">
        <Image
          objectFit="cover"
          maxW="200px"
          src="https://passport-photo.online/images/cms/prepare_light_b364e3ec37.webp?quality=80&format=webp&width=1920"
          alt="Caffe Latte"
        />
        <Box>
          <Card.Body>
            <Card.Title mb="2">{name}</Card.Title>
            <Card.Description>
              Disciption - Do you want me to show you the same axios useEffect
              example but with Chakra UI cards so the fetched data looks more
              professional? Ask ChatGPT
            </Card.Description>
            <HStack mt="4">
              <Badge>Roll - {rollno}</Badge>
              <Badge>DOB - {regno}</Badge>
            </HStack>
          </Card.Body>
          <Card.Footer>
            <Button>Vote Me</Button>
          </Card.Footer>
        </Box>
      </Card.Root>
    </Center>
  );
};
