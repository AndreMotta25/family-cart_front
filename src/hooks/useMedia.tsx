import { useEffect, useState } from "react";
import { useResize } from "./useResize";

const useMedia = (media: string) => {
    const [isMatch, setIsMatch] = useState(false);
  
    const {resize} = useResize(() => {
      const {matches} = window.matchMedia(media);
      setIsMatch(matches);
    })
  
    useEffect(() => {
      const {matches} = window.matchMedia(media);
      setIsMatch(matches);
    },[media])
  
    return {isMatch}
  }

  export {useMedia}