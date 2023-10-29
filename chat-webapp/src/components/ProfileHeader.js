import React from "react";
import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { Tooltip } from "@chakra-ui/tooltip";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/avatar";
import { useToast } from "@chakra-ui/toast";
import { Spinner } from "@chakra-ui/spinner";
import { useHistory } from "react-router-dom";
import axios from "axios";
import ProfileModal from "./miscellaneous/ProfileModal";
import { getSender } from "../config/ChatLogics";
import UserListItem from "./userAvatar/UserListItem";
import { ChatState } from "../context/ChatProvider";
import { BsThreeDotsVertical } from "react-icons/bs";

export default function ProfileHeader() {
  const history = useHistory();
  const {
    setSelectedChat,
    user,
    notification,
    setNotification,
    chats,
    setChats,
  } = ChatState();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        w="100%"
        // borderBottom={"0.5px solid #ccc"}
        // borderWidth="2px"
      >
        <ProfileModal user={user}>
          <Avatar size="sm" cursor="pointer" name={user.name} src={user.pic} />
        </ProfileModal>
        <div>
          <Menu>
            <MenuButton p={1}>
              <BellIcon fontSize="2xl" m={1} />
            </MenuButton>
            <MenuList pl={2}>
              {!notification.length && "No New Messages"}
              {notification.map((notif) => (
                <MenuItem
                  key={notif._id}
                  onClick={() => {
                    setSelectedChat(notif.chat);
                    setNotification(notification.filter((n) => n !== notif));
                  }}
                >
                  {notif.chat.isGroupChat
                    ? `New Message in ${notif.chat.chatName}`
                    : `New Message from ${getSender(user, notif.chat.users)}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton as={Button} bg="white">
              <BsThreeDotsVertical />
              {/* <Avatar
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.pic}
              /> */}
            </MenuButton>
            <MenuList>
              <MenuItem>Settings</MenuItem> <MenuDivider />
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
    </>
  );
}
