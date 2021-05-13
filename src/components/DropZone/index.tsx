import React, { PropsWithChildren, PropsWithoutRef, PropsWithRef, useCallback, useEffect, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const baseStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  transition: 'border .3s ease-in-out',
  height: '150px',
  justifyContent: 'center'
};

const activeStyle: React.CSSProperties = {
  borderColor: '#2196f3'
};

const acceptStyle: React.CSSProperties = {
  borderColor: '#00e676'
};

const rejectStyle: React.CSSProperties = {
  borderColor: '#ff1744'
};

type DropzoneProps = {
    fileSetCallback: (file: File) => void 
}

interface FileWithPreview extends File {
    preview: string
}

function Dropzone(props: PropsWithChildren<DropzoneProps>) {
  const [ file, setFile ] = useState<FileWithPreview>();
  const { fileSetCallback } = props
  const onDrop = useCallback(acceptedFiles => {
    fileSetCallback(acceptedFiles[0])
    setFile(Object.assign(acceptedFiles[0], {
        preview: URL.createObjectURL(acceptedFiles[0])
    }))
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png, image/gif'
  });

  const style: React.CSSProperties = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ]);

  let thumbs = null;

  if (file) {
   thumbs = <>
    <h3>Preview</h3>
    <div className="thumb" key={file?.name}>
      <img
        className="thumbnail"
        src={file?.preview}
        alt={file?.name}
      />
    </div> </>
  }

  useEffect(() => () => {
      if (file) {
        URL.revokeObjectURL(file.preview);
      }

  }, [file]);

  return (
    <section className="dropzone-container">
      <div {...getRootProps({style})}>
        <input {...getInputProps()} />
        <div>Drag and drop your images here. Or click here to choose a file</div>
      </div>
      <aside style={{height: '210px'}} className="thumbnail-container">
        {thumbs}
      </aside>
    </section>
  )
}


export default Dropzone;