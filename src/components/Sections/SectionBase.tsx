import { Box, Flex, InputProps, FlexProps } from "@chakra-ui/react"
import GoogleButton from "../GoogleButton"
import {motion } from "framer-motion"
import { ReactNode, MouseEvent } from "react"
import { animation } from "@/utils/animate"

export type ISectionBaseProps = {
    children: ReactNode;
} & FlexProps;

export type ISectionsProps = {
    next: () => void;
    back: () => void;
    error?: string;
} & InputProps

const SectionBase = ({children, ...rest}:ISectionBaseProps) => {
    return (
    <Flex as={motion.div} animation={animation} boxShadow={"4px 4px 30px #a0a0a0 "} px={'3rem'} py={"2rem"} bg={"gray.700"} sx={{"label":{color:"white"}}} flexDirection={"column"} borderRadius={"0.5rem"} {...rest}>
        <GoogleButton alignSelf={"center"} my={"2rem"} bg={"white"}/>
        <Box>
            {children}
        </Box>
    </Flex>
    )
}
export {SectionBase}