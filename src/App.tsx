import { useState, useEffect } from "react";

import "./App.css";

import { DcpQuestionAndQuestionGroup, DcpItemHeader } from "./_types/Question";

import WatchArea from "./Components/WatchArea/WatchArea";
import ItemCreationArea from "./Components/ItemCreationArea/ItemCreationArea";
import CreateNewQuestion from "./Components/CreateNewQuestion/CreateNewQuestion";
import { InputArea } from "./Components/InputArea/InputArea";

interface item {
    order: number,
    content: JSX.Element
}

function App() {
    const [itemsDiscipline, setItemsDiscipline] = useState<DcpQuestionAndQuestionGroup[]>([])
    const [titleAvaliacao, setTitleAvaliacao] = useState<string>("")
    const [hashAvaliacao, setHashAvaliacao] = useState<string>("")
    const [hashItem, setHashItem] = useState<string[]>([])
    const [typeItem, setTypeItem] = useState<string[]>([])
    const [orderItem, setOrderItem] = useState<number[]>([])
    const [headerItems, setHeaderItems] = useState<DcpItemHeader[]>([])

    // useEffect(() => {
    //     console.log(hashItem)
    //     console.log(hashItem.find(element => element.order == 1)?.content)
    // }, [hashItem])

    // useEffect(() => {
    //     console.log(hashItem)
    // }, [hashItem])

    useEffect(() => {
        console.log(titleAvaliacao)
    }, [titleAvaliacao])

    useEffect(() => {
        const copyItemsArray = [...itemsDiscipline]

        for (let i = 0; i < hashItem.length; i++) {
            if (hashItem[i] == undefined) {
                hashItem.splice(i, 1)
            }
        }

        console.log(hashItem)

        for (let i = 0; i < copyItemsArray.length; i++) {
            const hash = hashItem[i]
            const type = typeItem[i]
            const order = orderItem[i]

            copyItemsArray[i] = {
                hash: hash ? String(hash) : "Vazio",
                type: type ? String(type) : "Vazio",
                questionType: "radio",
                order: order,
                header: copyItemsArray[i].header
            }
        }

        setItemsDiscipline(copyItemsArray)
    }, [hashItem, typeItem, orderItem, headerItems])

    const handleHashItem = (index: number, value: string) => {
        setHashItem(prevHashItem => {
            const copyHashItem = [...prevHashItem];
            copyHashItem[index - 1] = value
            return copyHashItem;
        });
    }

    const handleTypeItem = (index: number, value: string) => {
        setTypeItem(prevTypeItem => {
            const copyTypeItem = [...prevTypeItem]
            copyTypeItem[index - 1] = value
            return copyTypeItem
        })
    }

    const handleOrderItem = (index: number, value: string) => {
        setOrderItem(prevOrderItem => {
            const copyOrderItem = [...prevOrderItem];
            copyOrderItem[index - 1] = Number(value)
            return copyOrderItem;
        });
    }

    const [items, setItems] = useState<item[]>([])

    const disciplineCreator = {
        sections: [
            {
                items: itemsDiscipline,
            }
        ],
        answers: []
    }

    const handleTrashClick = (order: number) => {
        console.log("Orderm para deletar ", order)


        setItems(prevItems => {
            const newPrevItems = prevItems.filter(item => item.order !== order)
            for (let i = 0; i < newPrevItems.length; i++) {
                if (newPrevItems[i].order == order + 1) {
                    newPrevItems[i].content = (
                        <ItemCreationArea order={order} setHashItem={handleHashItem} setTypeItem={handleTypeItem} onTrashClick={handleTrashClick} setOrderItem={handleOrderItem} />
                    )
                }
                console.log(newPrevItems[i].order)
            }
            return prevItems.filter(item => item.order !== order)
        });
        setItemsDiscipline(prevItemsDiscipline => prevItemsDiscipline.filter(item => item.order !== order));
        setHashItem(prevHashItem => prevHashItem.filter((value, index) => index + 1 !== order));
    }

    const handleAddItemComponent = () => {
        // Cria um novo array copiando os estados dos componentes <Teste /> existentes
        const copyItems = [...items]
        const copyItemsArray = [...itemsDiscipline]
        const myOrder = copyItems.length ? copyItems[copyItems.length - 1].order + 1 : 1

        // handleHashItem(myOrder, "")

        copyItems.push(
            {
                order: myOrder,
                content: (<ItemCreationArea order={myOrder} onTrashClick={handleTrashClick} setHashItem={handleHashItem} setTypeItem={handleTypeItem} setOrderItem={handleOrderItem} />)
            }
        )
        copyItemsArray.push({
            // hash: String(hashItem.find(element => element.order == myOrder)?.content),
            hash: hashItem.find((item, index) => index === myOrder) || '',
            type: "question",
            order: myOrder,
            questionType: "radio",
            header: []
        })

        console.log(`HashItems Lenght ${hashItem.length}`)

        setItems(copyItems)
        setItemsDiscipline(copyItemsArray)
    };

    // const handleContentChange = (index, content) => {
    //     const updatedContents = [...testeContents];
    //     updatedContents[index] = content;
    //     setTesteContents(updatedContents);
    // };

    const handleQuestionReadyTitles = (order: number, value: string) => {
        setTitleAvaliacao(value)
    }

    const handleHashAvaliacao = (order: number, value: string) => {
        setHashAvaliacao(value)
    }

    return (
        <main className="container py-3">
            <div className="row">
                <div className="col-12 col-md-4">
                    <InputArea title="Título da avaliacao" placeholder="Título da Avaliacao" handleInputValue={handleQuestionReadyTitles} />
                    <InputArea title="Hash da avaliacao" handleInputValue={handleHashAvaliacao} />
                    {items.map((value) => (
                        <div key={value ? value.order : ""}>
                            {value.content}
                        </div>
                    ))}
                    <CreateNewQuestion onClick={handleAddItemComponent} />
                </div>
                <div className="col-12 col-md-8">
                    <WatchArea disciplineObject={disciplineCreator} />
                </div>
            </div>
        </main>
    );
}

export default App;
