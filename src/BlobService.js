import { BlobServiceClient } from '@azure/storage-blob';

const BLOBSASURL =
  'http://127.0.0.1:10000/devstoreaccount1?sv=2018-03-28&st=2021-12-16T16%3A43%3A11Z&se=2021-12-17T16%3A43%3A11Z&sr=c&sp=racwl&sig=ByZGrzRidfeWGT6s1WDUCDXNjPUrRVPow5r0dRBA3K0%3D';

export class BlobService {
  blobServiceClient;
  containerClient;
  constructor() {
    this.blobServiceClient = new BlobServiceClient(BLOBSASURL);
  }

  createContainerClient(containerName = 'attachments') {
    this.containerClient = this.blobServiceClient.getContainerClient(containerName);
  }

  async listFiles() {
    let size = 0;
    let fileList = [];
    try {
      console.log('Retrieving file list...');
      let iter = await this.containerClient.listBlobsFlat();
      let blobItem = await iter.next();
      while (!blobItem.done) {
        size += 1;
        fileList.push(blobItem.value.name);
        blobItem = await iter.next();
      }
      if (size > 0) {
        console.log('Done.');
      } else {
        console.log('The container does not contain any files.');
      }
      return fileList;
    } catch (error) {
      console.log(error.message);
    }
  }

  async uploadFiles(formData) {
    console.log('formData:', formData);
    try {
      const promises = [];
      for (const file of formData.files) {
        const blockBlobClient = this.containerClient.getBlockBlobClient(file.name);
        promises.push(
          blockBlobClient.uploadBrowserData(file, {
            metadata: {
              fileName: file.name,
              notificationDescription: formData.description,
            },
          })
        );
      }
      await Promise.all(promises);
      alert('created');
    } catch (error) {
      console.log('error: uploadFiles', error);
    }
  }
}
