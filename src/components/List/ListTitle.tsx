import React from 'react'
import * as Chakra from '@chakra-ui/react';
import ResponsiveShortText from '../ResponsiveShortText';
import { IList } from '@/contexts/list';

type ListTitleProps = {
    details: IList
}

const ListTitle = ({details}:ListTitleProps) => {
  return (
    <Chakra.Box w={"100%"}>
          <ResponsiveShortText as={"h3"}>
            {details.name}
          </ResponsiveShortText>
          <Chakra.Text as={"span"} fontSize={"0.8rem"} color={"gray.400"}>
            Ultima modificação: {details.update_at}
          </Chakra.Text>
    </Chakra.Box>
  )
}

export default ListTitle
