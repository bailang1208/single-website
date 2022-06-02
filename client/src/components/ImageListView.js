import React from 'react';
import {
  Card,
  CardBody,
  CardImg,
} from 'reactstrap';
import { Colxx } from '../components/CustomBootstrap';
import { API } from '../constants/defaultValues';

const ImageListView = ({ image, onClickItem }) => {
  return (
    <Colxx sm="6" lg="4" xl="3" className="mb-3" key={image}>
      <Card onClick={() => onClickItem(image)}>
        <CardBody>
          <CardImg src={`${API.DOWNLOAD_IMAGE}/${image}`} />
        </CardBody>
      </Card>
    </Colxx>
  );
};

export default React.memo(ImageListView);
