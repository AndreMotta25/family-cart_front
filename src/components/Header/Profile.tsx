import { Box, Menu, MenuButton, MenuItem, MenuList, Stack } from '@chakra-ui/react'
import React from 'react'
import { NavLink } from '../SideBar/NavLink'
import ResponsiveShortText from '../ResponsiveShortText'
import { ShortText } from '../ShortText'
import { AvatarMenu } from './AvatarMenu'
import { useSession } from 'next-auth/react'
import { ButtonLogout } from './ButtonLogout'



const Profile = () => { 
  const {data: session} = useSession();   
  return (
    <Menu closeOnSelect={false} >
        <MenuButton>
            <AvatarMenu/>
        </MenuButton>
        <MenuList w={"100%"} p={{base:"0.8rem",md:"2rem"}} bg={"gray.900"}>
            <Stack spacing={{base:"0.8rem", md:"1.1875rem"}}>
                <MenuItem gap={"0.625rem"} p={0} bg={"gray.900"} w={"100%"}>
                    <AvatarMenu boxSize={{base:"64px"}}/>
                    <Box w={'106px'}>
                        <ResponsiveShortText fontWeight={"bold"} color={"teal.200"} fontSize={"clamp(1rem, 1.5vw, 1.25rem)"}>{session?.user.name}</ResponsiveShortText>
                        <ShortText fontSize={"smaller"} fontWeight={"medium"} color={"teal.200"}>{session?.user.email}</ShortText>
                    </Box>
                </MenuItem>
                <MenuItem  p={0} bg={"gray.900"}>
                    <NavLink fontSize={"1rem"} w={"100%"} textAlign={"center"} href='/profile'>
                        Perfil
                    </NavLink>     
                </MenuItem>
                <MenuItem bg={"red.200"} borderRadius={"5px"}  border={"none"} p={0} alignItems={"center"} justifyContent={"center"}>
                    <ButtonLogout/>
                </MenuItem>
            </Stack>
        </MenuList>
    </Menu>
  )
}

export default Profile
