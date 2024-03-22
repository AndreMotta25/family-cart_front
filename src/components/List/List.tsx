import * as Chakra from '@chakra-ui/react'
import React from 'react'
import { TrashButton } from './TrashButton'
import { ShareButton } from './ShareButton'
import { EditLink } from './LinkEdit'
import { IList, useLists } from '@/contexts/list'
import ListTitle from './ListTitle'
import { UpscaleButton } from '../UpscaleButton'
import OwnerIcon from '../Icons/OwnerIcon'

type ListProps = {
    details: IList;
}

const List = ({details,...rest}:ListProps & Chakra.FlexProps) => {
  const {selectList, remove} = useLists()
  return (
    <Chakra.Flex padding={"1rem"} bg={"white"} borderRadius={"0.3125rem"} justifyContent={"space-between"} w={"300px"} maxW={"18.75rem"} h={"200px"} position={"relative"} {...rest}>
        <ListTitle details={details}/>
        <Chakra.Flex alignSelf={"flex-end"} gap={"0.5rem"} position={"absolute"} right={"1rem"} >
          {!details.owner && <EditLink href={`/lists/view/${details.id}`}/>}
          {details.owner && <EditLink href={`/lists/view/${details.id}?isShared=true`}/>}
          {!details.owner && 
          <>
            <ShareButton aria-label='share-list' bg={"gray.800"}  colorIcon='white' onClick={() => selectList(details.id)}/>
            <TrashButton aria-label='remove-list' bg={"gray.800"} colorIcon='white' onClick={() => remove(details.id)}/>
          </>}
          {details.owner && 
              <UpscaleButton cursor={"default"} aria-label='owner' icon={<OwnerIcon boxSize={"1.5rem"}/>} tooltip={details.owner.name} boxSize={10} bg={"gray.800"} padding={0}/>
          }
        </Chakra.Flex>
    </Chakra.Flex>
  )
}

export default List;
