import NextLink from 'next/link';
import {Link, LinkProps} from '@chakra-ui/react';
import { ReactNode } from 'react';
import { sizeButton } from './ItemList/Actions';

type UpscaleLinkProps = {
    children: ReactNode;
} & LinkProps

const UpscaleLink = ({children, _hover, ...rest}:UpscaleLinkProps) => {
    return (
        <Link as={NextLink} bg={"gray.100"} borderRadius={'0.4rem'} _hover={{bg:"teal.400", transition:"all 0.3 ease", transform: 'scale(1.1)',..._hover}} display={'flex'} alignItems={'center'} justifyContent={'center'} minW={sizeButton} minH={{base:"2.5rem", md: '2.5rem'}} {...rest}>
            {children}
        </Link>
    )
}
export {UpscaleLink}