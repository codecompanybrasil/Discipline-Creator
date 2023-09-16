import styles from './InputArea.module.css'
import { ChangeEvent } from 'react';

type InputAreaProps = {
    title: string,
    textArea?: boolean,
    returnParam?: (param: any) => void,
    handleInputValue: (value: string) => void
}

function InputArea({title, textArea=false, handleInputValue, returnParam}: InputAreaProps) {
    const handleInternalInputValue = (event: (ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>)) => {
        handleInputValue(event.target.value)
        if (returnParam) {
            returnParam(event.target.value)
        }
    }

    return (
        <div className={styles.input_area}>
            <h3>{title}</h3>
            {textArea ? (
                <>
                    <textarea  cols={30} rows={10} onChange={handleInternalInputValue}  ></textarea>
                </>
            ) : (
                <input type="text" className={styles.input} onChange={handleInternalInputValue} />
            )}
        </div>
    )
}

export default InputArea;