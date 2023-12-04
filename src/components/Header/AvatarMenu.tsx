import { forwardRef } from '@chakra-ui/react'
import { Avatar as ComponentAvatar, AvatarProps} from '../ModalShare/Avatar'


// forwardRef é usado para que possamos passar o componente avatar para o componente MenuButton
const AvatarMenu = forwardRef<AvatarProps,'span'>((props,ref) => (
    <ComponentAvatar cursor={"pointer"} boxSize={{base:"54px",lg: "84px"}} src='https://avatars.githubusercontent.com/u/28240286?v=4' name='Andre Motta' ref={ref} {...props}/>
))
export {AvatarMenu}