import { Button } from "@chakra-ui/react";

type ButtonProps = {
    next: () => void;
    error?: string;
    value?: string | number | readonly string[];
}

const NextButton = ({next, error, value}:ButtonProps) => {
    return(
        <Button type="button" onClick={next} bg={"white"} marginLeft={'auto'} isDisabled={(error && true || value === "") || false}>Proximo</Button>
    )
}
export {NextButton}