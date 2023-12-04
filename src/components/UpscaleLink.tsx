import NextLink from 'next/link';
import {Link, LinkProps, forwardRef} from '@chakra-ui/react';
import { ReactNode } from 'react';
import { sizeButton } from './ItemList/Actions';
import { Tooltip } from './Tooltip';

type UpscaleLinkProps = {
    children: ReactNode;
    tooltip?: string;
} & LinkProps

const UpscaleLink = ({children,tooltip, _hover, ...rest}:UpscaleLinkProps) => {
    return (
        <Tooltip label={tooltip}>
            <Link as={NextLink} bg={"gray.100"} borderRadius={'0.4rem'} _hover={{bg:"teal.400", transition:"all 0.3 ease", transform: 'scale(1.1)',..._hover}} display={'flex'} alignItems={'center'} justifyContent={'center'} minW={sizeButton} minH={{base:"2.5rem", md: '2.5rem'}} {...rest}>
                {children}
            </Link>
        </Tooltip>
    )
}
export {UpscaleLink}