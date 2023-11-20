import { Stack } from "@chakra-ui/react"
import { NavLink } from "./NavLink"

const Navigations = () => {
    return(
        <Stack as={"nav"} direction={"column"}>
            <NavLink href="/dashboard"> 
                Dashboard
            </NavLink>
            <NavLink href="/amigos">  
                Amigos
            </NavLink>
            <NavLink href="/shared" textAlign={"center"} w={"100%"} px={"0.5rem"} lineHeight={1}>  
                Listas compartilhadas
            </NavLink>
        </Stack>
    )
}

export {Navigations}