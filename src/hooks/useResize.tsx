import { useEffect, useState } from "react";

const useResize = (callback: Function) => {
    const [callbackFunction, setCallbackFunction] = useState(() => callback);
    const [resize, setResize] = useState(false);

    useEffect(() => {
        const resize = (e: Event) => {
            if(callbackFunction) callbackFunction();

            setResize(true);
        };

        window.addEventListener("resize", resize);

        return () => window.removeEventListener("resize", resize);
    }, [callbackFunction]);

    useEffect(() => {
        const resetResize = (e: Event) => {
            setResize(false);
        };

        window.addEventListener("resize", resetResize);
        return () => window.removeEventListener("resize", resetResize);
    },[])


    return {callback: callbackFunction, setCallback: setCallbackFunction, resize: resize}
}
export {useResize}