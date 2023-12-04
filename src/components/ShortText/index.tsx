import React from 'react'
import * as Chakra from '@chakra-ui/react';

type ShortTextProps = {
  children: React.ReactNode;
} & Chakra.TextProps

const ShortText = ({children, ...rest}:ShortTextProps) => {
  return (
    <Chakra.Text whiteSpace={"nowrap"} overflow={"hidden"} textOverflow={"ellipsis"} {...rest}>
      {children}
    </Chakra.Text>
  )
}

export {ShortText}
