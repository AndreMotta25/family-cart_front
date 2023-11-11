import { ReactElement , cloneElement, Children} from "react"

type SlideItemProps = {
    children: ReactElement | ReactElement[]
}

const SlideItem = ({children}:SlideItemProps) => {
    return (
        <>
            {
                Children.map(children, (child, index) => cloneElement(child, {flexShrink:0}))
            }
        </>
    )
}

export {SlideItem}