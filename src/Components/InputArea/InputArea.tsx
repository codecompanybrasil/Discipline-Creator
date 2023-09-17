import styles from './InputArea.module.css'
import { ChangeEvent } from 'react';

export type InputAreaProps = {
    title: string,
    order?: number,
    textArea?: boolean,
    returnParam?: (param: any) => void,
    handleInputValue: (order: number, value: string) => void
}

type InputAreaGroupProps = {
    title: string,
    returnParam?: (param: any) => void,
    inputsList: InputAreaProps[]
}

export function InputAreaGroup({title, inputsList}: InputAreaGroupProps) {
    return (
        <div className={styles.input_group_area}>
            <h3>{title}</h3>
            {inputsList.map((value) => (
                <div className={styles.inputs_input_group}>
                    <InputArea title={value.title} order={value.order} textArea={value.textArea ? value.textArea : false} handleInputValue={value.handleInputValue} returnParam={value.returnParam} />
                </div>
            ))}
        </div>
    )
}

export function InputArea({title, textArea=false, handleInputValue, returnParam, order}: InputAreaProps) {
    const handleInternalInputValue = (event: (ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>)) => {
        if (order) {
            handleInputValue(order, event.target.value)
        } else {
            handleInputValue(0, event.target.value)
        }
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
