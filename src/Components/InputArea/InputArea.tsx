import styles from './InputArea.module.css'
import { ChangeEvent } from 'react';

export type InputAreaProps = {
    title: string,
    type?: "text" | "textArea"
    order?: number,
    placeholder?: string,
    returnParam?: (param: any) => void,
    handleInputValue: (order: number, value: string) => void
}

type InputAreaGroupProps = {
    title: string,
    returnParam?: (param: any) => void,
    inputsList: InputAreaProps[]
}

export function InputAreaGroup({ title, inputsList }: InputAreaGroupProps) {
    return (
        <div className={styles.input_group_area}>
            <h3>{title}</h3>
            {inputsList.map((value, index) => (
                <div key={index} className={styles.inputs_input_group}>
                    <InputArea title={value.title} type={value.type} order={value.order} handleInputValue={value.handleInputValue} returnParam={value.returnParam} />
                </div>
            ))}
        </div>
    )
}

export function InputArea({
    title,
    type = 'text',
    placeholder,
    handleInputValue,
    returnParam,
    order
}: InputAreaProps) {
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
        <>
            <h3>{title}</h3>

            {(type === 'textArea') ? (
                <>
                    <textarea cols={30} rows={10} onChange={handleInternalInputValue} placeholder={placeholder}></textarea>
                </>
            ) : (
                <input type="text" className={styles.input + ' form-control'} onChange={handleInternalInputValue} placeholder={placeholder} />
            )}
        </>
    )
}
