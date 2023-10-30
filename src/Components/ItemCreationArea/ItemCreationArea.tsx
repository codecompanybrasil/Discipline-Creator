import { InputArea } from "../InputArea/InputArea"
import { InputAreaGroup, InputAreaProps } from "../InputArea/InputArea"
import QuestionVisualizer from "../QuestionVisualizer/QuestionVisualizer"
import styles from './ItemCreationArea.module.css'
import { CSSProperties, useState } from "react"

type ItemCreationArea = {
    handleHashItem: (order: number, value: string) => void,
    // handleTypeItem: (order: number, value: string) => void,
    handleTrashClick: (order: number) => void,
    order: number
}

type InputListDetailsProps = {
    titles: string[],
    types: ("text"|"textArea")[],
    handleInputValue: () => void
}

function ItemCreationArea(props: ItemCreationArea) {
    const [questionStyle, setQuestionStyle] = useState<CSSProperties>({display: "flex"})
    const inputsList: InputAreaProps[] = []
    const inputsListDetails: InputListDetailsProps = {
        titles: ["title", "order", "image"],
        types: ["text", "text", "text", "textArea"],
        handleInputValue: () => {}
    }

    for (let i=0;i<inputsListDetails.titles.length;i++) {
        inputsList.push({
            title: inputsListDetails.titles[i],
            order: i,
            type: inputsListDetails.types[i],
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
            <QuestionVisualizer order={props.order} title={String(props.order + 1)} onClick={handleQuestionStyle} onTrashClick={props.handleTrashClick} />
            <div className={styles.item_question_area} style={questionStyle}>
                <InputArea title="hash" handleInputValue={props.handleHashItem} order={props.order} />
                {/* <InputArea title="type" handleInputValue={props.handleTypeItem} order={props.order} /> */}
                <InputAreaGroup title="header" inputsList={inputsList} />
            </div>
        </div>
    )
}

export default ItemCreationArea