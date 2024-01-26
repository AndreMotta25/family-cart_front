import {HStack } from "@chakra-ui/react";
import React from "react";
import AddFriendIcon from "../Icons/AddFriendIcon";

import AddLink from "../AddLink";
import { useMedia } from "@/hooks/useMedia";

import { UpscaleButton } from "../UpscaleButton";
import { Notify } from "./Notify";

const ActionsHeader = () => {
  const {isMatch: isWide} = useMedia('(min-width:62em)')

  return (
    <HStack mr={"1.25rem"}>
      <UpscaleButton tooltip="Adicionar Amigo" aria-label="Add friend" _hover={{bg:"whiteAlpha.900"}} icon={<AddFriendIcon w={"44px"} height={"44px"}/>} bg={"transparent"} color={"teal.200"} px={"0.5rem"} position={"relative"}/>
      <Notify/>
      <AddLink/>
    </HStack>
  );
};

export default ActionsHeader;

// mexer no AddLink.