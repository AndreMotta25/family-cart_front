import { Box, BoxProps } from '@chakra-ui/react'
import React, { ReactNode } from 'react'

interface IBoxInfoProps extends BoxProps {
    children: ReactNode;
}

const BoxRoot = ({children, ...rest}:IBoxInfoProps) => {
  return (
    <Box w="100%" bg={"gray.800"} padding={'1.5rem'} borderRadius={"0.5rem"} {...rest}>
        {children}
    </Box>
  )
}

export default BoxRoot