import { Icon, IconProps } from "@chakra-ui/react"

const OwnerIcon = ({...props}:IconProps) => {
    return (
      <>
          <Icon width="24" height="24" viewBox='0 0 24 24' fill="none" {...props}>
                <g transform="translate(0.000000,24.000000) scale(0.100000,-0.100000)" fill="#fff" stroke="none">
                      <path d="M80 210 c-11 -11 -20 -29 -20 -40 0 -26 34 -60 60 -60 26 0 60 34 60 60 0 26 -34 60 -60 60 -11 0 -29 -9 -40 -20z"/>
                      <path d="M35 84 c-9 -9 -15 -28 -13 -43 l3 -26 95 0 95 0 3 26 c6 52 -62 83 -74 34 -4 -15 -13 -25 -24 -25 -11 0 -20 10 -24 25 -7 29 -36 33 -61 9z"/>
                      <path d="M110 90 c0 -5 5 -10 10 -10 6 0 10 5 10 10 0 6 -4 10 -10 10 -5 0 -10 -4 -10 -10z"/>
                </g>
          </Icon>
      </>
    )
  }
  
  export default OwnerIcon