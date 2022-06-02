import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UploadModal from '../../components/UploadModal';
import { API } from '../../constants/defaultValues';
import { Row } from 'reactstrap';
import ImageListView from '../../components/ImageListView';

const Images = () => {

  const [modalOpen, setModalOpen] = useState(false);
  const [images, setImages] = useState([]);

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = () => {
    axios.get(API.GET_IMAGES)
      .then((res) => res.data)
      .then((data) => {
        if (data.files) {
          setImages(data.files);
        }
      })
  }

  const onClickUpload = () => {
    console.log("===== onClickUpload =====");
    setModalOpen(true);
  }

  const onClickItem = (img) => {
    console.log("===== onClickItem:", img);
  }

  return <>
    <div className='d-flex align-items-center justify-content-end'>
      <div className='btn btn-primary' onClick={onClickUpload}>Upload</div>
    </div>
    <UploadModal
      modalOpen={modalOpen}
      toggleModal={() => setModalOpen(!modalOpen)}
      loadImages={loadImages}
    />
    <div className='mt-4'>
      <Row>
        {images.map((img) => {
          return <ImageListView
            key={img}
            image={img}
            onClickItem={onClickItem}
          />
        })}
      </Row>
    </div>
  </>
};

export default Images;
