import React from "react";
import { Flex, IconButton, keyframes } from "@chakra-ui/react";
import Profile from "./Profile";
import Actions from "./ActionsHeader";
import Logo from "./Logo";
import { HamburgerIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";
import { animation } from "@/utils/animate";

type HeaderProps = {
  openMenu: () => void
  isMobile?: boolean
};

const Header = ({openMenu, isMobile}: HeaderProps) => {
  return (
    <Flex
      w={"100%"}
      px={"2rem"}
      py={"0.9375rem"}
      justifyContent={"space-between"}
      bg={"gray.900"}
      align={"center"}
      position={"fixed"}
      left={0}
      top={0}
      zIndex={"9"}
      as={motion.header} animation={animation}
    >
      {isMobile && <IconButton icon={<HamburgerIcon/>} aria-label="Open menu" onClick={openMenu}/>}

      <Logo/>
      <Flex
        align={"center"}
        position={{ base: "fixed", lg: "static" }}
        bottom={10}
        mx={{ base: "auto", lg: "0" }}
        left={{ base: "0" }}
        w={{ base: "100%", lg: "auto" }}
        justifyContent={"center"}
        zIndex={"88888888"}
      >
        <Flex
          align={"center"}
          bg={{ base: "blackAlpha.400", lg: "inherit" }}
          borderRadius={40}
          px={{ base: "0.7rem", lg: "0" }}
          py={{ base: "0.7rem", lg: "0" }}
        >
          <Actions/>
          <Profile />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Header;
