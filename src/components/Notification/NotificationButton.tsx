import { Button, ButtonProps } from "@chakra-ui/react"
import { ReactNode } from "react"

interface INotification extends ButtonProps {
    children: ReactNode
}
const NotificationButton = ({children, ...rest}:INotification) => {
    return(
        <Button boxSize={"2rem"} padding={"0"} {...rest}>
            {children}
        </Button>
    )
}
export {NotificationButton}