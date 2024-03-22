import { Stack } from "@chakra-ui/react"
import { NavLink } from "./NavLink"

const Navigations = () => {
    return(
        <Stack as={"nav"} direction={"column"}>
            <NavLink href="/dashboard"> 
                Dashboard
            </NavLink>
            <NavLink href="/lists">  
                Listas
            </NavLink>
        </Stack>
    )
}

export {Navigations}