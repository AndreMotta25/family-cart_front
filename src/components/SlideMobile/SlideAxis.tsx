import { Flex, FlexProps,Text } from "@chakra-ui/react";
import React, {
    ReactNode,
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useResize } from "@/hooks/useResize";
import ResponsiveShortText from "../ResponsiveShortText";

type SlideMobileProps = {
    children: ReactNode;
    title: string
} & FlexProps;


interface Touch extends React.TouchEvent<HTMLDivElement> {
 nativeEvent: TouchEvent & {
  movementX: number
 }
}

let press = false;
let initTouch = 0;

const SlideAxis = ({children,title, ...rest}: SlideMobileProps) => {
  const container = useRef<HTMLDivElement>(null);
  const mainAxis = useRef(0);
  const [widthScroll, setWidthScroll] = useState(0)
  
  const {resize} = useResize(() => {
    if(container.current) {
      container.current.style.transform = "translateX(0px)";
    }
  });

  const calculateMovement = useCallback(
    (event: SyntheticEvent) => {
      const needScrolling = (container.current?.scrollWidth || 0 )  >= (container.current?.parentElement?.clientWidth || 0);
      if ('movementX' in event.nativeEvent && container.current && needScrolling) {
        const { movementX } = event.nativeEvent;
        mainAxis.current += (movementX as number) 

        const scrollAt = (container.current.scrollWidth - (container.current.parentElement as Element).clientWidth)
        if(!(Math.abs(mainAxis.current) > scrollAt) && mainAxis.current < 0 ){
          container.current.style.transform = `translateX(${mainAxis.current}px)`
        }
        else {
          if(Math.abs(mainAxis.current) > scrollAt ) mainAxis.current = -scrollAt;
          else mainAxis.current = 0;
          container.current.style.transform = `translateX(${mainAxis.current}px)`
        }
      }
    },
    []
  );

  useEffect(() => {
    if(container.current) setWidthScroll(container.current.scrollWidth);
  },[children])

  return (
    <>
      <ResponsiveShortText color={"white"}>
        {title}
      </ResponsiveShortText>
      <Flex
        ref={container}
        gap={"1rem"}
        w={widthScroll}
        pl={"2rem"}
        transition={"all 0.3s linear"}
        cursor={"grabbing"}
        onMouseUp={() => press = false}
        onMouseDown={(e) => {
          e.preventDefault();
          press = true;  
        }}
        onMouseMove={(e) => {
          if(press) {
            calculateMovement(e);
          }
        }}
        onMouseLeave={() => press = false}
        onTouchStart={(e) => initTouch = e.changedTouches[0].clientX}
        onTouchMove={(e:Touch) => {
          const touch =  e.changedTouches[0].clientX  - initTouch;
          if(touch < 0) e.nativeEvent.movementX = -10
          else {
            e.nativeEvent.movementX = 10
          }

          calculateMovement(e);
        }}
        {...rest}
      >
      {children}
      </Flex>
    </>
  );
};

export default SlideAxis;

