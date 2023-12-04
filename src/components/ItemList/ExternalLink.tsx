import { LinkProps} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { UpscaleLink } from '../UpscaleLink';

type ExternalLinkProps = {
    colorIcon?:string;
} & LinkProps

const ExternalLink = ({colorIcon,_hover,...rest}:ExternalLinkProps) => {
    return (
        <UpscaleLink tooltip='Ir até' _hover={_hover} {...rest}>
            <ExternalLinkIcon boxSize={"1.5rem"} color={colorIcon} />
        </UpscaleLink>
    )
}
export {ExternalLink}