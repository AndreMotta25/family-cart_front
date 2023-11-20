import { Box, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody } from '@chakra-ui/react'
import React from 'react'
import { Navigations } from './Navigations'

type SidebarProps = {
  isOpen: boolean,
  closeMenu: () => void,
  isMobile?: boolean
}

const SideBar = ({isOpen, closeMenu, isMobile}:SidebarProps) => {

  if(isMobile) {
    return (
      <Drawer isOpen={isOpen} onClose={closeMenu} placement='left'>
        <DrawerOverlay color={"white"}>
          <DrawerContent bg={"gray.900"} >
              <DrawerCloseButton pt={"15px"}/>
              <DrawerHeader>
                Navegação
              </DrawerHeader>
              <DrawerBody pt={"2.875rem"}>
                <Navigations/>        
              </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    )
  }

  return (
    <Box height={"calc(100vh - 114px)"} bg={"gray.900"} w={"17rem"} pt={"1rem"} px={"2rem"} as="aside" gap={"1.25rem"} 
    position={"fixed"} left={0} zIndex={1300}>
        <Navigations/>
    </Box>
  )
}

export default SideBar
