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
    const [hashAvaliacao, setHashAvaliacao] = useState<string>(() => self.crypto.randomUUID())
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

    // useEffect(() => {
    //     console.log(itemsDiscipline)
    // }, [itemsDiscipline])

    const correctingItemsDiscipline = () => {
        const copyItemsArray = [...itemsDiscipline]

        for (let i = 0; i < copyItemsArray.length; i++) {
            const hash = hashItem[i]
            const type = typeItem[i]
            const order = orderItem[i]
            getCorrectOrder(i)

            copyItemsArray[i] = {
                hash: hash ? String(hash) : "Vazio",
                type: type ? String(type) : "Vazio",
                questionType: "radio",
                order: order ?? itemsDiscipline[i].order,
                header: copyItemsArray[i].header
            }
        }
        //console.log(copyItemsArray)

        setItemsDiscipline(copyItemsArray)
    }

    useEffect(() => correctingItemsDiscipline(), [hashItem, typeItem, orderItem, headerItems])

    const getCorrectOrder = (i: number) => {
        return itemsDiscipline[i].order
    }

    const handleHashItem = (index: number, value: string) => {
        setHashItem(prevHashItem => {
            const copyHashItem = [...prevHashItem];
            copyHashItem[index] = value
            return copyHashItem;
        });
    }

    const handleTypeItem = (index: number, value: string) => {
        setTypeItem(prevTypeItem => {
            const copyTypeItem = [...prevTypeItem]
            copyTypeItem[index] = value
            return copyTypeItem
        })
    }

    const handleOrderItem = (index: number, value: string) => {
        setOrderItem(prevOrderItem => {
            const copyOrderItem = [...prevOrderItem];
            copyOrderItem[index] = Number(value)
            return copyOrderItem;
        });
    }

    const [items, setItems] = useState<item[]>([])

    const disciplineCreator = {
        hash: hashAvaliacao,
        title: titleAvaliacao,
        sections: [
            {
                items: itemsDiscipline,
            }
        ],
        answers: []
    }

    // useEffect(() => {
    //     console.log(itemsDiscipline)
    // }, [items])

    const handleTrashClick = (order: number) => {
        setItems(prevItems => {
            const ItemsFiltered = prevItems.filter((item, index) => {
                //console.log(`Item Order: ${item.order} - Order: ${order} - Index: ${index}`)
                return index !== order
            })
            console.log(ItemsFiltered)
            return ItemsFiltered
        });
        setItemsDiscipline(prevItemsDiscipline => {
            //console.log(prevItemsDiscipline)
            return prevItemsDiscipline.filter((_, index) => index !== order)
        });
        setHashItem(prevHashItem => prevHashItem.filter((_, index) => index !== order));
        //correctingItemsDiscipline()
    }

    const handleAddItemComponent = () => {
        // Cria um novo array copiando os estados dos componentes <Teste /> existentes
        const copyItems = [...items]
        const copyItemsArray = [...itemsDiscipline]
        const myOrder = itemsDiscipline.length ?? 1
        //const myOrder = copyItems.length ? copyItems[copyItems.length - 1].order + 1 : 1

        // handleHashItem(myOrder, "")

        copyItems.push(
            {
                order: myOrder,
                content: (<ItemCreationArea order={myOrder} onTrashClick={handleTrashClick} setHashItem={handleHashItem} setTypeItem={handleTypeItem} setOrderItem={handleOrderItem} hashValue={hashItem.find((item, index) => index === myOrder) || ''} />)
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

        setItems(copyItems)
        setItemsDiscipline(copyItemsArray)
    };

    // const handleContentChange = (index, content) => {
    //     const updatedContents = [...testeContents];
    //     updatedContents[index] = content;
    //     setTesteContents(updatedContents);
    // };

    const handleQuestionReadyTitles = (_: number, value: string) => { //_ == order
        setTitleAvaliacao(value)
    }

    const handleHashAvaliacao = (_: number, value: string) => { // _ == order
        setHashAvaliacao(value)
    }

    return (
        <main className="container py-3">
            <div className="row">
                <div className="col-12 col-md-4 form-area">
                    <InputArea
                        title="Título da avaliacao"
                        placeholder="Título da Avaliacao"
                        handleInputValue={handleQuestionReadyTitles} />
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
                    <WatchArea disciplineObject={disciplineCreator} />
                </div>
            </div>
        </main>
    );
}

export default App;
