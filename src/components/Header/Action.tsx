import { Button, ButtonProps as ButtonPropsChakra} from '@chakra-ui/react'
import React, { ReactElement } from 'react'

type ActionProps = ButtonPropsChakra & {
  children: ReactElement[] | ReactElement 
};

const Action = ({children, ...rest}:ActionProps) => {
  return (
    <Button bg={"transparent"} px={"0.5rem"} position={"relative"} {...rest}>
      {children}
    </Button>
  )
}

export default Action
