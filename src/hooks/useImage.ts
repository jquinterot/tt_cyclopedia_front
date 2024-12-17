import { useState } from "react";
import defaultImage from '../assets/default.jpeg';

export const useImage = () => {
    const [image, setImage] = useState(defaultImage);
    
    const updateImage = (img:string) => {
        setImage(img)
    }

  return { image, updateImage };
};