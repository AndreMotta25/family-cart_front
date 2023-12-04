import React, { ReactNode } from 'react'
import {Text, TextProps} from '@chakra-ui/react'

export type ResponsiveTextProps  = {
    children: ReactNode;
    type: "heading" | "normal" | "bold"
} & TextProps

export const textTypes = {
    heading: {
        base: "1.5rem",
        md: "2rem"
    },
    normal: {
        base: "0.875rem",
        md: "1rem"
    },
    bold: {
        base: "1rem",
        md: "1.25rem"
    }
} 

const ResponsiveText = ({type,children, ...rest}:ResponsiveTextProps) => {
  return (
    <Text fontSize={textTypes[type]} {...rest}>{children}</Text>
  )
}

export default ResponsiveText
