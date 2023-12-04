import { Icon, IconProps } from '@chakra-ui/react'
import React from 'react'

type AddProps = IconProps & {}

const Add = ({...rest}:AddProps) => {
  return (
    <Icon viewBox='0 0 44 44' {...rest}>
        <path d="M44 25.1429H25.1429V44H18.8571V25.1429H0V18.8571H18.8571V0H25.1429V18.8571H44V25.1429Z" fill="currentColor"/>
    </Icon>
  )
}

export default Add
