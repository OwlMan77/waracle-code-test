import './index.css'
import React, { ChangeEvent, useState } from 'react'
import * as CatAPI from './../../api/cat.api'
import Error from '../../components/Error'
import { useHistory } from "react-router-dom";
import Dropzone from '../../components/DropZone';

function Upload() {
    const history = useHistory();
    const [selectedFile, setSelectedFile] = useState<File>()
    const [disabled, setDisabled] = useState<boolean>(true)
    const [error, setError] = useState('')

    const routeToIndex = () => {
      history.push("/");
    }

    const onFormSubmit = () => {
      setDisabled(true)
      const formData = new FormData();

      if (selectedFile) {
          formData.append('file', selectedFile);
          formData.append('sub_id', CatAPI.subId);
          CatAPI.upload(formData)
              .then(() => routeToIndex())
              .catch(() => {
                  setError('Unable to upload image')
              })

      }
    }

    const onDrop = (file: File) => {
      setSelectedFile(file);
      setDisabled(false)
    }

    return (
      <div className="page Upload">
        <div className="upload-container">
          <Dropzone fileSetCallback={onDrop}></Dropzone>
          <button disabled={disabled} className="submit" onClick={onFormSubmit}>Submit</button>
          <Error errorMessage={error} />
        </div>
      </div>
    )
}
  
  export default Upload