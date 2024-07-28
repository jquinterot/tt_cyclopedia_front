import {  useState } from "react";

export const useInputValue = () => {
    const [value, setValue] = useState('');

    const updateInputValue = (value:string) =>{
        setValue(value)
    }
    return {value, updateInputValue}
}