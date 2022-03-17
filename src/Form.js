import { useState } from 'react';
import { BlobService } from './BlobService';
import './App.css';

const blobService = new BlobService();

const NotificationForm = () => {
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState('');

  const handleUploadData = async () => {
    try {
      if (files.length) {
        blobService.createContainerClient();
        const reposponse = await blobService.uploadFiles({
          files,
          description,
        });
        console.log('reposponse:', reposponse);
      }
    } catch (error) {
      console.log('error: handleUploadData');
    }
    // this.setState({ selectedFile: event.target.files[0] });
  };

  const onChangeFiles = (event) => {
    setFiles(event.target.files);
  };

  const onChangeText = (event) => {
    setDescription(event.target.value);
  };

  return (
    <div className="form">
      <div className="form-control">
        <label for="description">Description</label>
        <input
          type="text"
          id="description"
          onChange={onChangeText}
          value={description}
          name="description"
        />
      </div>
      <div className="form-control">
        <label for="files">Anexo</label>
        <input
          name="files"
          type="file"
          id="file-input"
          multiple
          onChange={onChangeFiles}
          onClick={(event) => {
            event.target.value = null;
          }}
        />
      </div>
      <div>
        <button onClick={handleUploadData} className="submit-button">
          Submit
        </button>
      </div>
    </div>
  );
};

export default NotificationForm;
