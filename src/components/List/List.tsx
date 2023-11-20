import * as Chakra from '@chakra-ui/react'
import React from 'react'
import { TrashButton } from './TrashButton'
import { ShareButton } from './ShareButton'
import { EditLink } from './LinkEdit'
import ResponsiveShortText from '../ResponsiveShortText'
import { IList } from '@/contexts/list'
import ListTitle from './ListTitle'


type ListProps = {
    details: IList;
}

const List = ({details, ...rest}:ListProps & Chakra.FlexProps) => {
  return (
    <Chakra.Flex padding={"1rem"} bg={"white"} borderRadius={"0.3125rem"} justifyContent={"space-between"} w={"300px"} maxW={"18.75rem"} h={"200px"} position={"relative"} {...rest}>
        <ListTitle details={details}/>
        <Chakra.Flex alignSelf={"flex-end"} gap={"0.5rem"} position={"absolute"} right={"1rem"} >
          <TrashButton aria-label='remove-list' bg={"gray.800"} colorIcon='white'/>
          <ShareButton aria-label='share-list' bg={"gray.800"}  colorIcon='white'/>
          <EditLink href={`/lists/view/${details.id}`}/>
        </Chakra.Flex>
    </Chakra.Flex>
  )
}

export default List;
