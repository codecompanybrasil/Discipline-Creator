import { FiPlusCircle } from 'react-icons/fi'
import { ReactElement } from 'react'

type createNewQuestionProps = {
    onClick: () => void,
    icon?: ReactElement
}

function CreateNewQuestion({ onClick, icon: Icon=(<FiPlusCircle />) }: createNewQuestionProps) {
    return (
        <div onClick={onClick} className="create_new_question_area" >
            {Icon}
        </div>
    )
}

export default CreateNewQuestion