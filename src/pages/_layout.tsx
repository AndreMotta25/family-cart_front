import Header from "@/components/Header/Header"
import SideBar from "@/components/SideBar"
import { useMedia } from "@/hooks/useMedia"
import { Box, Flex, useBreakpointValue, useDisclosure, FlexProps } from "@chakra-ui/react"
import { ReactElement, createContext, useState } from "react"

type ILayoutProps = FlexProps &  {
    children: ReactElement | ReactElement[];

}

// O contexto deveria ser usado acima do layout
const Layout = ({children, ...rest}:ILayoutProps) => {
    const isMobile = useBreakpointValue({base: true, md: true, lg: false});
    const {isOpen,onClose,onOpen} = useDisclosure();

    return(
        <>
            <Header isMobile={isMobile} openMenu={onOpen}/>
            <Flex pr={"2rem"} mt={"7.25rem"} {...rest}>
                <SideBar isOpen={isOpen} isMobile={isMobile} closeMenu={onClose}/>
                {children}
            </Flex>
        </>
    )
}

export {Layout}


