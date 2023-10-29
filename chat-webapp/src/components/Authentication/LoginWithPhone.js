import React, { useEffect, useState } from "react";
import { Box, Container, Stack } from "@chakra-ui/react";
import { Button } from "@chakra-ui/button";
import { Avatar } from "@chakra-ui/avatar";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { auth } from "../../config/FirebaseConfig";
import { ChatState } from "../../context/ChatProvider";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";
// import "react-phone-input-2/lib/bootstrap.css";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

function setUpReCaptcha(phoneNumber) {
  const recaptchaVerifier = new RecaptchaVerifier(
    auth,
    "recaptcha-container",
    {}
  );
  recaptchaVerifier.render();

  return signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
}

const LoginWithPhone = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState();
  const [userName, setUserName] = useState();
  const [confirmObj, setConfirmObj] = useState();

  const [flagOtp, setFlagOtp] = useState(false);
  const [flagProfile, setFlagProfile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profilePic, setProfilepic] = useState();
  const [newUser, setNewUser] = useState(false);

  const { user, setUser } = ChatState();

  const history = useHistory();

  const submitFormHandler = async () => {
    console.log(phone);
    setLoading(true);
    if (!phone || phone === "") {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      setLoading(false);
      //   const response = await setUpReCaptcha("+918503087802");
      //   console.log(response);
      //   setConfirmObj(response);
      setFlagOtp(true);
    } catch (error) {
      console.log(error.message);
      toast({
        title: error.message,
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  const verifyOTP = async () => {
    setLoading(true);
    if (!otp || otp === "") {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    // await confirmObj
    //   .confirm(otp)
    //   .then(async (result) => {
    //     console.log(result);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post("/api/user/login", { phone }, config);
      console.log(data);
      setNewUser(false);
      setUser(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setNewUser(true);
      setLoading(false);
    }
    setFlagOtp(false);
    setFlagProfile(true);
    //   })
    //   .catch((error) => {
    //     // User couldn't sign in (bad verification code?)
    //     toast({
    //       title: "Invalid OTP",
    //       status: "warning",
    //       duration: 5000,
    //       isClosable: true,
    //       position: "bottom",
    //     });
    //     setLoading(false);
    //   });
  };

  useEffect(() => {
    if (user) {
      setUserName(user.name);
      setProfilepic(user.pic);
    }
  }, [user]);

  const postDetails = (pics) => {
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "piyushproj");
      fetch("https://api.cloudinary.com/v1_1/vikashsaini/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setProfilepic(data.url.toString());
          // console.log(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const submitHandler = async () => {
    setLoading(true);
    if (!userName || userName === "") {
      toast({
        title: "Please Fill Name Feild",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    if (newUser) {
      try {
        const config = {
          headers: { "Content-type": "application/json" },
        };
        const { data } = await axios.post(
          "/api/user/",
          {
            name: userName,
            phone,
            pic: profilePic,
          },
          config
        );
        setLoading(false);
        toast({
          title: "Registration Successful",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setUser(data);
        localStorage.setItem("userInfo", JSON.stringify(data));

        history.push("/chats");
      } catch (error) {
        setLoading(false);
        toast({
          title: "Error Occured!",
          description: error.response.data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    } else {
      setLoading(false);
      history.push("/chats");
    }
  };

  const handleProfile = (e) => {
    // console.log(e.target.files[0].ab);
    let file = e.target.files[0];
    var reader = new FileReader();
    var url = reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      setProfilepic(reader.result);
      //   console.log(reader.result);
    }.bind(this);
    // var uploadedFile = URL.createObjectURL(file);
    // console.log(uploadedFile);
  };

  //   console.log(profilePic);
  return (
    <>
      <VStack spacing="10px">
        <Container
          maxW="container.sm"
          display={!flagOtp && !flagProfile ? "block" : "none"}
        >
          <FormControl id="phone" isRequired>
            {/* <FormLabel>Phone</FormLabel> */}
            <PhoneInput
              defaultCountry="IN"
              value={phone}
              onChange={setPhone}
              placeholder="Enter Your Mobile"
              regions={"asia"}
            />
          </FormControl>

          <div
            id="recaptcha-container"
            style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "15px",
            }}
          ></div>

          <Button
            colorScheme="blue"
            width="100%"
            style={{ marginTop: 15, marginBottom: 10 }}
            onClick={submitFormHandler}
            isLoading={loading}
          >
            Continue
          </Button>

          <Button
            variant="solid"
            colorScheme="red"
            width="100%"
            onClick={() => {
              setPhone("+919876543210");
              //   setPassword("123456");
            }}
          >
            Login as Guest
          </Button>
        </Container>
        <Container display={flagOtp && !flagProfile ? "block" : "none"}>
          <FormControl id="phone" isRequired>
            <FormLabel>OTP</FormLabel>

            <Input
              value={otp}
              type="text"
              placeholder="6 Digit OTP"
              onChange={(e) => setOtp(e.target.value)}
              variant="flushed"
            />
          </FormControl>

          <Button
            colorScheme="blue"
            width="100%"
            style={{ marginTop: 15 }}
            onClick={verifyOTP}
            isLoading={loading}
          >
            Verify OTP
          </Button>
        </Container>
        <Container display={!flagOtp && flagProfile ? "block" : "none"}>
          <Box display="flex">
            <Box mx={2}>
              <label htmlFor="contained-button-file">
                <Stack>
                  {profilePic !== "" ? (
                    <Avatar src={profilePic} />
                  ) : (
                    <Avatar src="https://bit.ly/broken-link" />
                  )}
                </Stack>
              </label>
              <Input
                accept=".jpg, .jpeg, .png"
                style={{ display: "none" }}
                id="contained-button-file"
                type="file"
                onChange={(e) => postDetails(e.target.files[0])}
                onClick={(event) => {
                  event.target.value = null;
                }}
              />
            </Box>
            <Box>
              <FormControl id="userName" isRequired>
                {/* <FormLabel>Enter Name</FormLabel> */}
                <Input
                  value={userName}
                  type="text"
                  placeholder="Type Your Name"
                  onChange={(e) => setUserName(e.target.value)}
                  variant="flushed"
                />
              </FormControl>
            </Box>
          </Box>

          <Button
            colorScheme="blue"
            width="100%"
            style={{ marginTop: 15 }}
            onClick={submitHandler}
            isLoading={loading}
          >
            Continue
          </Button>
        </Container>
      </VStack>
    </>
  );
};

export default LoginWithPhone;
