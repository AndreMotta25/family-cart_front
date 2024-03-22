import React from 'react'
import BoxRoot from './BoxRoot'
import ResponsiveShortText from './ResponsiveShortText'
import {Text, BoxProps} from "@chakra-ui/react";

interface IBoxDashBoardProps extends BoxProps {
    title: string;
    total: number
}

const BoxDashboard = ({title,total,...rest}:IBoxDashBoardProps) =>  {
  return (
    <BoxRoot w={"100%"} color={"white"} _hover={{bg:"teal.200", transition:"all 0.5s"}} {...rest}>
        <ResponsiveShortText textAlign={"center"} fontWeight={"bold"}>
          {title}
          <Text>
            {total}
          </Text>
        </ResponsiveShortText>
      </BoxRoot>
  )
}

export {BoxDashboard}