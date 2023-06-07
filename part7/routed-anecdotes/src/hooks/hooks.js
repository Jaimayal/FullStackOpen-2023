import { useState } from 'react'


export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        const updatedVal = event.target.value;
        console.log(updatedVal);
        setValue(updatedVal)
    }

    const onClear = () => {
        setValue('')
    }

    return {
        type,
        value,
        onChange,
        onClear
    }
}