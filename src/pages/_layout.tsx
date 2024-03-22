import Header from "@/components/Header/Header"
import SideBar from "@/components/SideBar"
import { useMedia } from "@/hooks/useMedia"
import { Box, Flex, useBreakpointValue, useDisclosure, FlexProps, keyframes } from "@chakra-ui/react"
import { ReactElement, createContext, useState } from "react"
import {motion} from 'framer-motion'
import { animation } from "@/utils/animate"

type ILayoutProps = FlexProps &  {
    children: ReactElement | ReactElement[];
}


const Layout = ({children, ...rest}:ILayoutProps) => {
    const isMobile = useBreakpointValue({base: true, md: true, lg: false});
    const {isOpen,onClose,onOpen} = useDisclosure();

    return(
        <> 
            <Header isMobile={isMobile} openMenu={onOpen}/>
            <Flex pr={"2rem"} mt={"7.25rem"} as={motion.div} animation={animation}{...rest}>
                <SideBar isOpen={isOpen} isMobile={isMobile} closeMenu={onClose}/>
                {children}
            </Flex>
        </>
    )
}

export {Layout}


