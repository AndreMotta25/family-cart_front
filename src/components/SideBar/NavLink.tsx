import { dm_serif_display } from "@/fonts";
import { Link, LinkProps as LinkPropsChakra } from "@chakra-ui/react";
import { ReactNode } from "react";
import NextLink from 'next/link';

type LinkProps = LinkPropsChakra & { 
    children: ReactNode, 
}

const NavLink = ({ children, ...rest }: LinkProps) => {
  return (<Link
    as={NextLink}
    fontWeight={"bold"}
    fontSize={"1.25rem"}
    fontFamily={dm_serif_display.variable}
    color={"white"}
    border={"2px solid"}
    mx={"auto"}
    w={"fit-content"}
    borderColor={"teal.200"}
    borderRadius={"5px"}
    py={"5px"}
    px={"2.8125rem"}
    _hover={{bg:"gray.800"}}
    {...rest}
  >
    {children}
  </Link>);
};

export { NavLink };
