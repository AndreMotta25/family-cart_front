import * as Chakra from '@chakra-ui/react';
import { ReactElement, ReactNode } from 'react';

type TooltipProps = {
    children: ReactNode[] | ReactNode | JSX.Element;
} & Chakra.TooltipProps;

const Tooltip = ({children, ...rest}:TooltipProps) => (
    <Chakra.Tooltip bg={"teal.500"} color={"white"} borderRadius={"0.5rem"} {...rest}>
        {children}
    </Chakra.Tooltip>
)

export {Tooltip}