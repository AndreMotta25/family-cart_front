import React from 'react'
import { UpscaleButton } from './UpscaleButton'
import { GoogleIcon } from './Icons/GoogleIcon'
import { Box, ButtonProps, Flex } from '@chakra-ui/react'
import { signIn } from 'next-auth/react'
import { dm_serif_display } from '@/fonts'

type GoogleButtonProps = {} & ButtonProps;

const GoogleButton = ({...rest}:GoogleButtonProps) => {
  return (
        <UpscaleButton  onClick={() => signIn("google", {redirect: true, callbackUrl:"/dashboard"})} text='Entrar Com' icon={<GoogleIcon boxSize={"2rem"}/>} _hover={{bg:"teal.100"}} aria-label='Fazer login com o google' marginBottom={"1rem"} padding={"1.5rem"} {...rest}/> 
  )
}

export default GoogleButton
 