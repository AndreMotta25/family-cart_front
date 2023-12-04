import * as Chakra from '@chakra-ui/react';
import { ReactElement } from 'react';

type TooltipProps = {
    children: ReactElement;
} & Chakra.TooltipProps;

const Tooltip = ({children, ...rest}:TooltipProps) => (
    <Chakra.Tooltip bg={"teal.500"} color={"white"} borderRadius={"0.5rem"} {...rest}>
        {children}
    </Chakra.Tooltip>
)

export {Tooltip}