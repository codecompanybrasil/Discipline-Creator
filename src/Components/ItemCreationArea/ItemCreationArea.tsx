import InputArea from "../InputArea/InputArea"
import QuestionVisualizer from "../QuestionVisualizer/QuestionVisualizer"
import styles from './ItemCreationArea.module.css'
import { CSSProperties, useState } from "react"

type ItemCreationArea = {
    setHashItem: (value: string) => void,
    setTypeItem: (value: string) => void,
    order?: number
}

function ItemCreationArea(props: ItemCreationArea) {
    const [questionStyle, setQuestionStyle] = useState<CSSProperties>({display: "flex"})

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
            <QuestionVisualizer title={props.order ? String(props.order) : "Question"} onClick={handleQuestionStyle} />
            <div className={styles.item_question_area} style={questionStyle}>
                <InputArea title="hash" handleInputValue={props.setHashItem} />
                <InputArea title="type" handleInputValue={props.setTypeItem} />
            </div>
        </div>
    )
}

export default ItemCreationArea