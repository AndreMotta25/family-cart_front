import { Icon, IconProps } from '@chakra-ui/react'
import React, { ElementType } from 'react'

type LayoutIconProps =  IconProps & {
    icon: ElementType
}
const LayoutIcon = ({icon, ...rest}:LayoutIconProps) => {
  return (
    <Icon as={icon} boxSize={{ base: "34px", md: "44px" }} color={"teal.200"} {...rest}/>
  )
}

export default LayoutIcon
