import axios from "axios";
import React, { useEffect, useState } from "react";
import { Users } from "./Users";
import { Box, SimpleGrid } from "@chakra-ui/react";

const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    try {
      const res = axios.get("https://votingbackend-sitg.onrender.com/users").then((res) => {
        setData(res.data);
      });
      console.log(res);
    } catch (error) {
      console.log(error);
      console.log("Something Went Wrong");
    }
  }, []);

  if (!data.length) {
    return <p>Loading...</p>;
  } else
    return (
      <>
        <SimpleGrid columns={2} columnGap="2" rowGap="4">
          {data.map((res) => (
            <Box key={res._id}>
              <Users
                name={res.fullname}
                rollno={res.rollnum}
                regno={res.dateofbirth.slice(0, 10)}
              />
              {console.log(res)}
            </Box>
          ))}
        </SimpleGrid>
      </>
    );

  //   return (
  //     <>
  //       <Box color={"red"}>Hello Nasir</Box>
  //     </>
  //   );
};

export default Dashboard;
