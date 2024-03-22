import { useDisclosure, useToast as useToastChakra } from "@chakra-ui/react";

const useToast = () => {
    const toast = useToastChakra({
        duration: 5000,
        isClosable: true,
        position:"top-right"
    });

    return {toast}
}

export {useToast}