import { Box, Button, Flex } from "@chakra-ui/react"
import { ISectionsProps, SectionBase } from "./SectionBase"
import { Input } from "../Input"
import { NextButton } from "./NextButton"

const EmailSection = ({next, back,error,value, ...rest}:ISectionsProps) => {
    return (
    <SectionBase>
            <Input id="email" label="email" placeholder="Digite seu email" bg={"white"} error={error} value={value} {...rest}/>
            <Flex marginTop={"2rem"}>
                <NextButton error={error} next={next} value={value}/>
            </Flex>
    </SectionBase>)
}
export {EmailSection}