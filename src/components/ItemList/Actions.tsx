import * as Chakra from '@chakra-ui/react';
import { IItemProps } from './Item';
import { useBreakpointValue } from '@chakra-ui/react';
import { EditButton } from '../List/EditButton';
import { TrashButton } from '../List/TrashButton';
import { ExternalLink } from './ExternalLink';
import { useListChanges } from '@/contexts/listChanges';

export const sizeButton = {base:"2rem", md: '2.5rem'};

const ActionsItem = ({item,  updateItem}:IItemProps) => {
  const {excludeItem: removeItem} = useListChanges()

    return (
    <Chakra.HStack spacing={"0.5rem"}>
      <EditButton aria-label='edit-item' color={"black"} _hover={{color:"white"}} bg={"gray.100"} minW={sizeButton} minH={sizeButton} onClick={() =>  updateItem(item.id as string)}/>
      <TrashButton aria-label='delete-item' color={"black"} _hover={{color:"white"}} bg={"gray.100"} minW={sizeButton} minH={sizeButton} onClick={() =>  removeItem(item.id as string)}/>

      {item.url && (
        <ExternalLink href={item.url} color={"black"} _hover={{color:"white"}}/>
      )}
    </Chakra.HStack>)
}
export {ActionsItem}