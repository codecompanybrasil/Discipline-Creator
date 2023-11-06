import { useRef, useState } from 'react'

import { DcpButton } from '@codecompanybrasil/discipline-core'

// import { DisciplineFileData } from '../../_types/Question'

import styles from './WatchArea.module.css'

type WatchAreaProps = {
    disciplineObject: any;
}

function WatchArea({ disciplineObject }: WatchAreaProps) {
    const onCopyButtonClick = () => {
        const jsonData = JSON.stringify(disciplineObject);

        if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(jsonData);
        } else {
            var dummy = document.createElement("input");
            dummy.type = 'hidden';

            dummy.value = jsonData;

            document.body.appendChild(dummy);
            dummy.select();
            document.execCommand("copy");

            document.body.removeChild(dummy);
        }
    }

    const handleDownloadJSON = () => {
        const blob = new Blob([JSON.stringify(disciplineObject, null, 4)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${disciplineObject.hash}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    return (
        <div className={styles.watchAreaContainer}>
            <pre id="jsonData" className={styles.textArea + ' form-control'}>
                {JSON.stringify(disciplineObject, null, 4)}
            </pre>

            <div className={styles.button_area}>
                <DcpButton onClick={onCopyButtonClick} text="Copiar"></DcpButton>
                <DcpButton onClick={handleDownloadJSON} text="Download"></DcpButton>
            </div>
        </div>
    )
}

export default WatchArea