import { FiTrash } from 'react-icons/fi'
import { DcpButton, DcpIconButton } from '@codecompanybrasil/discipline-core';

import styles from './QuestionVisualizer.module.css'

type QuestionVisualizerProps = {
    title: string,
    order: number
    onClick: () => void,
    onTrashClick: (order: number) => void
}

function QuestionVisualizer({ title, order, onClick, onTrashClick }: QuestionVisualizerProps) {
    return (
        <div className='my-2 dcp-btn-group'>
            <DcpButton className={styles.query_main} onClick={onClick} text={`Question ${title}`}></DcpButton>
            <DcpIconButton color='primary' onClick={() => onTrashClick(order)}>
                <FiTrash />
            </DcpIconButton>
        </div>
    )
}


export default QuestionVisualizer