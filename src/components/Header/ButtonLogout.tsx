import { Button, ButtonProps } from "@chakra-ui/react"
import { dm_serif_display } from '@/fonts'
import {signOut} from 'next-auth/react'
import { ReactNode } from "react"



type IButtonProps = ButtonProps & {
    children?: ReactNode,
}

const ButtonLogout = ({children, ...rest}:IButtonProps) => {
    return(
        <Button w={"100%"} bg={"transparent"} py={'0.44rem'} borderRadius={"5px"} height={"fit-content"}
        fontWeight={"bold"}
        fontSize={"1rem"}
        fontFamily={dm_serif_display.variable} {...rest} onClick={() => signOut({callbackUrl:"/"})}>    
            Sair
        </Button>
    )
}

export {ButtonLogout}