import {HStack } from "@chakra-ui/react";
import React from "react";

import { useMedia } from "@/hooks/useMedia";

import { Notify } from "./Notify";

import { CreateListButton } from "./CreateListButton";
import { AddFriendButton } from "./AddFriendButton";

const ActionsHeader = () => {
  const {isMatch: isWide} = useMedia('(min-width:62em)')

  return (
    <HStack mr={"1.25rem"}>
      <AddFriendButton/>
      <Notify/>
      <CreateListButton/>
    </HStack>
  );
};

export default ActionsHeader;

