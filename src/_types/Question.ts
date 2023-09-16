interface DcpImage {
    source: string | HTMLImageElement;
    caption?: string;
}

interface DcpTip {
    order: number;
    text: string;
}

interface DcpQuestionOption {
    order: number;
    text?: number | string;
    value: number | string;
    image?: DcpImage;
}

interface DcpItemHeader {
    order: number;
    title?: string;
    message?: DcpMessage;
    image?: DcpImage;
}

interface DcpMessage {
    text: string;
    caption?: string;
}

interface DcpSectionItem {
    _comment?: string;
    order: number;
    hash: string;
    type: "question" | "group";
    header: DcpItemHeader[];
}

export interface DcpQuestion extends DcpSectionItem {
    order: number;
    questionType: "radio" | "checkbox";
    options: DcpQuestionOption[];
    questions?: DcpQuestion[]
    tips?: DcpTip[];
}

export interface DcpQuestionGroup extends DcpSectionItem {
    questions: DcpQuestion[];
}

// interface DcpSection { //versão antiga
//     hash: string;
//     title?: string;
//     items: (DcpQuestionGroup | DcpQuestion)[];
// }

export interface DcpQuestionAndQuestionGroup {
    _comment?: string;
    order: number;
    hash: string;
    type: "question" | "group";
    questionType?: "radio" | "checkbox";
    options?: DcpQuestionOption[],
    header: DcpItemHeader[],
    questions?: DcpQuestion[]
}

interface DcpSection { // adulterado
    hash: string;
    title?: string;
    items: DcpQuestionAndQuestionGroup[];
}

export interface QuestionAnswer {
    questionHash: string;
    value: number | string;
}

export interface UserAnswer {
    questionHash: string,
    value: number | string | undefined
}

export interface DisciplineFileData {
    sections: DcpSection[];
    answers: QuestionAnswer[];
    userAnswer?: UserAnswer[];
}
