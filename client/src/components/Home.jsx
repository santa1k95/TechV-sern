import './home.scss'
import React from 'react'
import { useState } from 'react';

export default function Home({ documents, updateDocuments }) {
    const [selectedFiles, setSelectedFiles] = useState(null);
    const [fileNames, setFileNames] = useState("");

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" }
        return new Date(dateString).toLocaleDateString(undefined, options)
    }

    const handleOnChange = (e) => {
        const files = e.target.files
        let selectedFileNames = ""
        try {
            for (const file of files) {
                if (selectedFileNames == "") {
                    selectedFileNames = file.name
                } else {
                    selectedFileNames = selectedFileNames.concat(',', file.name)
                }
            }
            setSelectedFiles(e.target.files)
            setFileNames(selectedFileNames)
        } catch (error) {
            console.log('error :>> ', error);
        }
    }

    const handleUpload = async function (event) {
        try {
            console.log(selectedFiles)
            let formData = new FormData();
            for (let file of selectedFiles) {
                formData.append('files', file)
            }

            const requestOptions = {
                method: 'POST',
                body: formData,
                redirect: 'follow'
            };

            await setSelectedFiles(null)
            await setFileNames("")


            fetch("http://localhost:5000/document/upload", requestOptions)
                .then(response => response.text())
                .then(result => {
                    updateDocuments()

                    console.log(result)
                })
                .catch(error => console.log('error', error));
        } catch (error) {
            console.log('error :>> ', error);
        }
    }

    const deleteDocument = async function (id) {
        try {
            const res = fetch('http://localhost:5000/document/delete/' + id, {
                method: 'DELETE',
            })
            if ((await res).status === 200) {
                updateDocuments()
            }
        } catch (error) {

        }

    }

    return (
        <div className="home">
            <div className="topbar">
                <h1>Document Managemnt System</h1>
            </div>

            <div className="btnwrapper">
                <div className="form">
                    {/* <div className="displayFNames">
                        <input type="text" value={fileNames}/>
                    </div> */}
                    <input
                        id="documents"
                        multiple
                        type="file"
                        onChange={(e) => handleOnChange(e)}
                    />
                    {/* <label id="lblDocuments" for="documents">
                        Choose Files
                    </label> */}
                    <div className="btn-upload" onClick={event => handleUpload(event)}>Upload</div>
                </div>
            </div>
            <div className="tablewrapper">
                <table id="doument-table">
                    <tr>
                        <th className="tableHeader">File Name</th>
                        <th className="tableHeader">Type</th>
                        <th className="tableHeader">Expires On</th>
                        <th className="tableHeader">Delete</th>
                    </tr>
                    {
                        documents.map(el => {
                            return (
                                <tr className="data-row">
                                    {/* <td>
                                        {el.id}
                                    </td> */}
                                    <td className="tableData">
                                        {el.fileName.trim()}
                                    </td>
                                    <td className="tableData">
                                        {el.type.trim()}
                                    </td>
                                    <td className="tableData">
                                        {formatDate(el.expiresOn)}
                                    </td>
                                    <td className="tableData">
                                        <a onClick={() => deleteDocument(el.id)}>Delete</a>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </table>
            </div>
        </div>
    )
}
