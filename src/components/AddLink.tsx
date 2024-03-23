import React from 'react'
import LayoutIcon from './Icons/LayoutIcon'
import NextLink from 'next/link'
import {ButtonProps, Link,LinkProps} from '@chakra-ui/react'
import Add from './Icons/Add'
import { UpscaleLink } from './UpscaleLink'

type AddProps = ButtonProps & LinkProps & {}

const AddLink = ({...rest}:AddProps) => {
  return (
    <UpscaleLink w={{base: "50px",md:"60px"}} display={"flex"} alignItems={"center"} 
          justifyContent={"center"} 
          px={"0.5rem"}
          borderRadius={"0.5rem"}
          bg={'transparent'} 
          _hover={{bg:"whiteAlpha.900"}}
          href=''
          tooltip='Criar nova lista'
          {...rest}
    >
          <LayoutIcon icon={Add} boxSize={"34px"}/>
    </UpscaleLink>
  )
}


export default AddLink
