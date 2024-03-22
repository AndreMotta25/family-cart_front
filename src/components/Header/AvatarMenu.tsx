import { forwardRef } from '@chakra-ui/react'
import { Avatar as ComponentAvatar, AvatarProps} from '../ModalShare/Avatar'
import { useSession } from 'next-auth/react'


// forwardRef é usado para que possamos passar o componente avatar para o componente MenuButton
const AvatarMenu = forwardRef<AvatarProps,'button'>((props,ref) => {
    const {data: session} = useSession();

    return (
        <ComponentAvatar cursor={"pointer"} boxSize={{base:"54px",lg: "84px"}} src={session?.user.image} name={session?.user.name} ref={ref} {...props}/>
    )})

export {AvatarMenu}