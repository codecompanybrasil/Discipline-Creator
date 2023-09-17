import styles from './QuestionVisualizer.module.css'
import { FiTrash } from 'react-icons/fi'

type QuestionVisualizerProps = {
    title: string,
    order: number
    onClick: () => void,
    onTrashClick: (order: number) => void
}

function QuestionVisualizer({title, order, onClick, onTrashClick}: QuestionVisualizerProps) {
    return (
        <div style={{display: "flex", gap: "10px", alignItems: "center"}}>
            <div className={styles.query_main} onClick={onClick} >
                <h2>{`Question ${title}`}</h2>
            </div>
            <div className="clickable_icon" onClick={() => onTrashClick(order)} >
                <FiTrash />
            </div>
        </div>
    )
}


export default QuestionVisualizer