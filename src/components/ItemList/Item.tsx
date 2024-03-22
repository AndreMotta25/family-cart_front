
import * as Chakra from '@chakra-ui/react';
import { ActionsItem } from './Actions';
import { ShortText } from '../ShortText';
import ResponsiveShortText from '../ResponsiveShortText';

export interface IItem {
  name:string;
  url: string;
  id?: string;
}
export interface IItemProps {
    item: IItem;
    updateItem: (id:string) => void;
}

const Item = ({item,updateItem}:IItemProps) => {
  return (
  <Chakra.ListItem
    key={item.id}
    bg={"whiteAlpha.400"}
    listStyleType={"none"}
    mx={"auto"}
    my={"1rem"}
    borderRadius={"0.5rem"}
    p={"0.5rem"}
    display={"flex"}
    alignItems={"center"}
    justifyContent={{base:"center",md:"space-between"}}
    gap={'0.5rem'}
  >
    <ShortText flex={1} fontSize={"1.5rem"}>
      {item.name}
    </ShortText>
    <ActionsItem item={item} updateItem={updateItem}/>
  </Chakra.ListItem>);
};
export { Item };
