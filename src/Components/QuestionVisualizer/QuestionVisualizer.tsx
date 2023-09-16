import styles from './QuestionVisualizer.module.css'
import { FiTrash } from 'react-icons/fi'

type QuestionVisualizerProps = {
    title: string,
    onClick: () => void
}

function QuestionVisualizer({title, onClick}: QuestionVisualizerProps) {
    return (
        <div style={{display: "flex", gap: "10px", justifyContent: "center", alignItems: "center"}}>
            <div className={styles.query_main} onClick={onClick} >
                <h2>{title}</h2>
            </div>
            <div className="clickable_icon" >
                <FiTrash />
            </div>
        </div>
    )
}


export default QuestionVisualizer