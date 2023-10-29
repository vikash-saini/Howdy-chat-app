import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import Login from "../components/Authentication/Login";
import Singup from "../components/Authentication/SingUp";
import { useHistory } from "react-router-dom";
import LoginWithPhone from "../components/Authentication/LoginWithPhone";
import { StepperComp } from "../components/Authentication/StepperComp";

const HomePage = () => {
  const history = useHistory();
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (userInfo) history.push("/chats");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);

  return (
    <Container maxW="md" bg="purple.600">
      {/* <Box
        display="flex"
        justifyContent="center"
        p={3}
        bg="white"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      ></Box> */}
      <Box
        p={3}
        bg="white"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Box display="flex" justifyContent="center" py={3}>
          <Text fontSize="2xl" fontFamily="Work sans">
            Welcome to HowdyChat
          </Text>
        </Box>
        <Box>
          <LoginWithPhone />
        </Box>
        {/* <Tabs isFitted variant="soft-rounded">
          <TabList mb="1em">
            <Tab>Login</Tab>
            <Tab>Sign Up</Tab>
          </TabList>
          <TabPanels>
            {/* <TabPanel><Login /></TabPanel> */}
        {/* <TabPanel><StepperComp /></TabPanel> */}
        {/* <TabPanel>
              <LoginWithPhone />
            </TabPanel>
            <TabPanel>
              <Singup />
            </TabPanel>
          </TabPanels>
        </Tabs> */}
      </Box>
    </Container>
  );
};

export default HomePage;
