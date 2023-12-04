import React from 'react'
import * as Chakra from '@chakra-ui/react';
import { ShortText } from '../ShortText';

type ResponsiveShortTextProps = {
  children: React.ReactNode;
} & Chakra.TextProps; 

const ResponsiveShortText = ({children, ...rest}:ResponsiveShortTextProps) => {
  return (
    <ShortText fontSize={"clamp(1.5rem, 2.5vw, 2rem)"} {...rest}>
      {children}
    </ShortText>
  )
}

export default ResponsiveShortText
