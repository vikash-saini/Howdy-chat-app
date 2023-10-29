import { ViewIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  IconButton,
  Text,
  Image,
  Box,
} from "@chakra-ui/react";
import { getCapitalize } from "../../config/ChatLogics";

const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton
          display={{ base: "flex" }}
          icon={<ViewIcon />}
          onClick={onOpen}
        />
      )}
      <Modal
        size="lg"
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        bg="#d1d7db"
      >
        <ModalOverlay />
        <ModalContent h="410px" bg="#d1d7db">
          <ModalHeader
            fontSize="20px"
            fontFamily="Work sans"
            display="flex"
            justifyContent="center"
            bg="purple.600"
            color="white"
          >
            Profile
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            // display="flex"
            // flexDir="column"
            alignItems="center"
            justifyContent="space-between"
            p={0}
          >
            <Box display="flex" justifyContent="center" p={3}>
              <Image
                borderRadius="full"
                borderColor={"white"}
                border={"1px solid white"}
                boxSize="150px"
                src={user.pic}
                alt={user.name}
              />
            </Box>

            <Box bg="white" py={5}>
              <Text
                px={3}
                w={{ base: "100%" }}
                fontSize={{ base: "12px", md: "20px" }}
                fontFamily="Work sans"
                color="purple.600"
              >
                Your Name
              </Text>
              <Text
                w={{ base: "100%" }}
                px={3}
                fontSize={{ base: "12px", md: "20px" }}
                fontFamily="Work sans"
              >
                {getCapitalize(user.name)}
              </Text>
            </Box>

            {/* <Text
              fontSize={{ base: "28px", md: "30px" }}
              fontFamily="Work sans"
            >
              Email: {user.email}
            </Text> */}
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;
