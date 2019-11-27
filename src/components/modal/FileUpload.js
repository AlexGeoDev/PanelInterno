import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

function FileUpload(props) {
    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
        if (props.onSelectedFiles) {
            props.onSelectedFiles(acceptedFiles);
        }
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <React.Fragment>
            <div {...getRootProps()} className="fileuploadzone">
                <input multiple="false" {...getInputProps()} />
                {
                    isDragActive ?
                        <p>Drop the files here ...</p> :
                        <p>Drag 'n' drop some files here, or click to select files</p>
                }
            </div>
            <style jsx>
                {
                    `
                .fileuploadzone{
                    background-color: white;
                    outline: 2px dashed #0c2a4b;
                    outline-offset: -10px;
                    height:10rem;
                    display:flex;
                    justify-content:center;
                    align-items:center;
                }
                `
                }
            </style>
        </React.Fragment>
    )
}

export { FileUpload };