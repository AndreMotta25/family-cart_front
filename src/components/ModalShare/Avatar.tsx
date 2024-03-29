import { Avatar as AvatarChakra, AvatarProps as AvatarChakraProps, forwardRef } from "@chakra-ui/react";
import { ReactElement, ReactNode } from "react";
import { AvatarTooltip } from "../AvatarTooltip";



export type AvatarProps = {
    children?: ReactNode | ReactElement;
    label?: string
} & AvatarChakraProps;

const Avatar = forwardRef<AvatarProps,'span'>(({src,label, name,children,_hover, ...rest}, ref) => {    
    return (<AvatarTooltip size={"lg"} color={"black"}
        _after={{top:0,w:'100%', h:"inherit", bg:"blackAlpha.600", borderRadius:"999999", position:'absolute', display:'block', content:'""', zIndex:2, opacity:0, transition:"all 0.3s ease"}}
        _hover={{_after:{opacity:1}, ..._hover}}
        name={name}
        src={src}
        ref={ref}
        tooltipProps={{label: label, placement:"bottom", my: '-0.5rem'}}
        {...rest}
    >
        {children}
    </AvatarTooltip>)
})

export {Avatar}



// O heigth do after esta como inherit assim vai herdar a altura do pai. 
