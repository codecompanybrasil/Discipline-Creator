import { useRef, useState } from 'react'

import { DcpButton } from '@codecompanybrasil/discipline-core'

// import { DisciplineFileData } from '../../_types/Question'

import styles from './WatchArea.module.css'

type WatchAreaProps = {
    disciplineObject: any;
}

function WatchArea({ disciplineObject }: WatchAreaProps) {
    const textAreaRef = useRef(null)
    const [textDestravar, setTextDestravar] = useState<("Destravar" | "Travar")>("Destravar")
    const [textAreaReadOnly, setTextAreaReadOnly] = useState<boolean>(true)

    const onCopyButtonClick = () => {
        if (textAreaRef.current) {
            textAreaRef.current.select();
            document.execCommand('copy');
            window.getSelection()?.removeAllRanges()
        }
    }

    const handleDownloadJSON = () => {
        const blob = new Blob([JSON.stringify(disciplineObject, null, 4)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        const titleSanited = disciplineObject.sections[0].title?.replace(" ", "_")
        a.href = url;
        a.download = `${titleSanited}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    const handleDestravar = () => {
        if (textAreaReadOnly) {
            setTextDestravar("Travar")
            setTextAreaReadOnly(false)
        } else {
            setTextDestravar("Destravar")
            setTextAreaReadOnly(true)
        }
    }

    return (
        <div className={styles.watchAreaContainer}>
            <textarea
                ref={textAreaRef}
                value={JSON.stringify(disciplineObject, null, 4)}
                readOnly={textAreaReadOnly}
                className={styles.textArea + ' form-control'}
                style={{ resize: "none" }}></textarea>
            <div className={styles.button_area}>
                <DcpButton onClick={onCopyButtonClick} text="Copiar"></DcpButton>
                <DcpButton onClick={handleDownloadJSON} text="Download"></DcpButton>
                <DcpButton onClick={handleDestravar} text={textDestravar}></DcpButton>
            </div>
        </div>
    )
}

export default WatchArea