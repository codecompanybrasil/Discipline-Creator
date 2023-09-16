import "./App.css";
import QuestionVisualizer from "./Components/QuestionVisualizer/QuestionVisualizer";
import InputArea from "./Components/InputArea/InputArea";
import { useState } from "react";
import WatchArea from "./Components/WatchArea/WatchArea";
import { FiPlusCircle } from 'react-icons/fi'
import { DisciplineFileData, DcpQuestionAndQuestionGroup } from "./_types/Question";
import ItemCreationArea from "./Components/ItemCreationArea/ItemCreationArea";

type createNewQuestionProps = {
    onClick: () => void
}

function CreateNewQuestion({ onClick }: createNewQuestionProps) {
    return (
        <div onClick={onClick} className="create_new_question_area" >
            <FiPlusCircle />
        </div>
    )
}

function App() {
    const [itemsDiscipline, setItemsDiscipline] = useState<DcpQuestionAndQuestionGroup[]>()
    const [titleAvaliacao, setTitleAvaliacao] = useState<string>("")
    const [hashAvaliacao, setHashAvaliacao] = useState<string>("")
    const [hashItem, setHashItem] = useState<string>("")
    const [typeItem, setTypeItem] = useState<string>("")
    const [testeContents, setTesteContents] = useState(['']); // Estado inicial com um componente <Teste />

    const disciplineCreator = {
        sections: [
            {
                title: titleAvaliacao,
                hash: hashAvaliacao,
                items: itemsDiscipline
            }
        ],
        answers: []
    }

    const handleAddTesteComponent = () => {
        // Cria um novo array copiando os estados dos componentes <Teste /> existentes
        const updatedContents = [...testeContents, ''];
        setTesteContents(updatedContents);
    };

    // const handleContentChange = (index, content) => {
    //     const updatedContents = [...testeContents];
    //     updatedContents[index] = content;
    //     setTesteContents(updatedContents);
    // };

    const handleQuestionReadyTitles = (value: string) => {
        setTitleAvaliacao(value)
    }

    const handleHashAvaliacao = (value: string) => {
        setHashAvaliacao(value)
    }

    const handleHashItem = (value: string) => {
        setHashItem(value)
    }

    const handleTypeItem = (value: string) => {
        setTypeItem(value)
    }

    return (
        <div className="main">
            <div>
                <InputArea title="Titulo da avaliacao" handleInputValue={handleQuestionReadyTitles} />
                <InputArea title="Hash da avaliacao" handleInputValue={handleHashAvaliacao} />
                <CreateNewQuestion onClick={handleAddTesteComponent} />
                <ItemCreationArea setHashItem={handleHashItem} setTypeItem={handleTypeItem} />
            </div>
            <div>
                <WatchArea disciplineObject={disciplineCreator} />
            </div>
        </div>
    );
}

export default App;
