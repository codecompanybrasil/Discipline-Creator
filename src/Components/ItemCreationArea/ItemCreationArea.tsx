import { InputArea } from "../InputArea/InputArea"
import { InputAreaGroup, InputAreaProps } from "../InputArea/InputArea"
import QuestionVisualizer from "../QuestionVisualizer/QuestionVisualizer"
import styles from './ItemCreationArea.module.css'
import { CSSProperties, useState } from "react"

type ItemCreationArea = {
    setHashItem: (order: number, value: string) => void,
    setTypeItem: (order: number, value: string) => void,
    setOrderItem: (order: number, value: string) => void,
    onTrashClick: (order: number) => void,
    order: number
}

function ItemCreationArea(props: ItemCreationArea) {
    const [questionStyle, setQuestionStyle] = useState<CSSProperties>({display: "flex"})
    const inputsList: InputAreaProps[] = []
    const inputsListDetails = {
        titles: ["title", "order", "image"],
        textAreas: [false, false, false, true]
    }

    for (let i=0;i<inputsListDetails.titles.length;i++) {
        inputsList.push({
            title: inputsListDetails.titles[i],
            order: i,
            textArea: inputsListDetails.textAreas[i],
            handleInputValue: inputsListDetails.handleInputValue
        })
    }


    const handleQuestionStyle = () => {
        if (questionStyle.display == "flex") {
            setQuestionStyle({
                display: "none"
            })
        } else {
            setQuestionStyle({
                display: "flex"
            })
        }
    }

    return (
        <div className={styles.item_area} >
            <QuestionVisualizer order={props.order} title={props.order ? String(props.order) : "Question"} onClick={handleQuestionStyle} onTrashClick={props.onTrashClick} />
            <div className={styles.item_question_area} style={questionStyle}>
                <InputArea title="hash" handleInputValue={props.setHashItem} order={props.order} />
                <InputArea title="type" handleInputValue={props.setTypeItem} order={props.order} />
                <InputArea title="order" handleInputValue={props.setOrderItem} order={props.order} />
                <InputAreaGroup title="header" inputsList={inputsList} />
            </div>
        </div>
    )
}

export default ItemCreationArea