import { useState, useEffect } from "react";

import "./App.css";

import { DcpQuestionAndQuestionGroup} from "./_types/Question";
import WatchArea from "./Components/WatchArea/WatchArea";
import ItemCreationArea from "./Components/ItemCreationArea/ItemCreationArea";
import CreateNewQuestion from "./Components/CreateNewQuestion/CreateNewQuestion";
import { InputArea } from "./Components/InputArea/InputArea";

interface item {
    content: JSX.Element
}

function App() {
    const [itemsObj, setItemsObj] = useState<DcpQuestionAndQuestionGroup[]>([])
    const [items, setItems] = useState<item[]>([])
    const [hashAvaliacao, setHashAvaliacao] = useState<string>(() => self.crypto.randomUUID())
    const [titleAvaliacao, setTitleAvaliacao] = useState<string>("")

    //Items do ItemsObj:
    const [hashItem, setHashItem] = useState<string[]>([])

    const disciplineObj = {
        hash: hashAvaliacao,
        title: titleAvaliacao,
        sections: [
            {
                items: itemsObj
            }
        ],
        answers: []
    }

    useEffect(() => {
        console.log(hashItem)
    }, [hashItem])

    useEffect(() => {
        console.log(items)
    }, [items])

    const handleTashClick = (order: number) => {
        setItems(prevItem => prevItem.filter((_, index) => index !== order))

        setItemsObj(prevItemsObj => prevItemsObj.filter((_, index) => index !== order))

        setHashItem(prevHashItem => prevHashItem.filter((_, index) => index !== order))

        handleRefreshOrdemItems()
    }

    const handleRefreshOrdemItems = () => {
        setItems(prevItems => {
            const copyPrevItems = [...prevItems]
            for (let i=0;i<copyPrevItems.length-1;i++) {
                copyPrevItems[i] = {
                    content: (<ItemCreationArea order={i} handleHashItem={handleHashItem} handleTrashClick={handleTashClick} /> )
                }
            } 

            return copyPrevItems
        })
    }

    const handleAddItemComponent = () => {
        const myOrder = itemsObj.length ?? 1

        setItems(prevItems => {
            const copyPrevItems = [...prevItems]
            copyPrevItems.push(
                {
                    content: (<ItemCreationArea order={myOrder} handleHashItem={handleHashItem} handleTrashClick={handleTashClick} /> )
                }
            )

            return copyPrevItems
        })

        setItemsObj(prevItemsObj => {
            const copyPrevObj = [...prevItemsObj]
            copyPrevObj.push(
                {
                    hash: hashItem.find((_, index) => index === myOrder) || "",
                    type: "question",
                    questionType: "radio",
                    header: []
                }
            )

            return copyPrevObj
        })

    }

    const handleHashAvaliacao = (_: number, value: string) => { // _ == order
        setHashAvaliacao(value)
    }

    const handleTitleAvaliacao = (_: number, value: string) => { // _ == order
        setTitleAvaliacao(value)
    }

    const handleHashItem = (index: number, value: string) => {
        setHashItem(prevHashItem => {
            const copyPrevHashItem = [...prevHashItem]
            copyPrevHashItem[index] = value
            return copyPrevHashItem;
        });
    }
    return (
        <main className="container py-3">
            <div className="row">
                <div className="col-12 col-md-4 form-area">
                    <InputArea
                        title="Título da avaliacao"
                        placeholder="Título da Avaliacao"
                        handleInputValue={handleTitleAvaliacao} />
                    <InputArea
                        title="Hash da avaliacao (UUID)"
                        placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                        handleInputValue={handleHashAvaliacao} />
                    {items.map((value, index) => (
                        <div key={index}>
                            {value.content}
                        </div>
                    ))}
                    <CreateNewQuestion onClick={handleAddItemComponent} />
                </div>
                <div className="col-12 col-md-8">
                    <WatchArea disciplineObject={disciplineObj} />
                </div>
            </div>
        </main>
    );
}

export default App;
