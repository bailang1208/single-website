import React from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import { API } from '../constants/defaultValues'

const UploadModal = ({ modalOpen, toggleModal, loadImages }) => {

  const getUploadParams = ({ meta }) => {
    return { url: API.UPLOAD_IMAGE, meta: { fileUrl: `${API.UPLOAD_IMAGE}/${encodeURIComponent(meta.name)}` } }
  }

  const handleChangeStatus = ({ meta }, status) => {
    if(status === 'done') {
      loadImages();
    }
  }

  const handleSubmit = (files, allFiles) => {
    allFiles.forEach(f => f.remove());
  }

  return (
    <Modal
      isOpen={modalOpen}
      toggle={toggleModal}
      wrapClassName="modal-right"
      backdrop="static"
      size="lg"
    >
      <ModalHeader>
        Upload Image
      </ModalHeader>
      <ModalBody>
        <Dropzone
          getUploadParams={getUploadParams}
          onChangeStatus={handleChangeStatus}
          onSubmit={handleSubmit}
          accept="image/*"
          inputContent={(files, extra) => (extra.reject ? 'Image files only' : 'Drag Files')}
          styles={{
            dropzoneReject: { borderColor: 'red', backgroundColor: '#DAA' },
            inputLabel: (files, extra) => (extra.reject ? { color: 'red' } : {}),
          }}
        />
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" outline onClick={toggleModal}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default UploadModal;
