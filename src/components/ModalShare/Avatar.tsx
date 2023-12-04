import { Avatar as AvatarChakra, AvatarProps as AvatarChakraProps, forwardRef } from "@chakra-ui/react";
import { ReactElement } from "react";



export type AvatarProps = {
    children?: ReactElement
} & AvatarChakraProps;

// forwardRef é usado para que possamos passar o componente avatar para o componente MenuButton
const Avatar = forwardRef<AvatarProps,'span'>(({src, name,children, ...rest}, ref) => (
     (<AvatarChakra size={"lg"} color={"black"}
        _after={{w:'100%', h:"inherit", bg:"blackAlpha.600", borderRadius:"999999", position:'absolute', display:'block', content:'""', zIndex:1, opacity:0, transition:"all 0.3s ease"}}
        _hover={{_after:{opacity:1}}}
        name={name}
        src={src}
        ref={ref}
        {...rest}
    >
        {children}
    </AvatarChakra>)
))

export {Avatar}


// O heigth do after esta como inherit assim vai herdar a altura do pai. 