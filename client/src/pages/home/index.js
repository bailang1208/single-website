import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Rnd } from "react-rnd";
import * as htmlToImage from 'html-to-image';

import { API, data } from '../../constants/defaultValues';

const Home = () => {

  const [background, setBackground] = useState();
  const [backgrounds, setBackgrounds] = useState(data.backgrounds);
  const [frame, setFrame] = useState();
  const [frames, setFrames] = useState(data.frames);
  const [image, setImage] = useState();
  const [imageList, setImageList] = useState([]);

  const [framePosX, setFramePosX] = useState(0);
  const [framePosY, setFramePosY] = useState(0);
  const [frameWidth, setFrameWidth] = useState(200);
  const [frameHeight, setFrameHeight] = useState(200);

  const [backgroundWidth, setBackgroundWidth] = useState(0);
  const [backgroundHeight, setBackgroundHeight] = useState(0);

  const container = useRef(null);

  useEffect(() => {
    loadImages();

    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, [])

  const loadImages = () => {
    axios.get(API.GET_IMAGES)
      .then((res) => res.data)
      .then((data) => {
        if (data.files) {
          setImageList(data.files);
        }
      })
  }

  const updateSize = () => {
    if(container.current != null) {
      setBackgroundWidth(container.current.clientWidth);
      setBackgroundHeight(container.current.clientHeight);
    }
  }

  const onClickBackground = (value) => {
    if (background != value) {
      setBackground(value);
    }
  }

  const onClickFrame = (value) => {
    if (frame != value) {
      setFrame(value);

      let img = new Image();
      img.onload = function () {
        setFrameWidth(400);
        setFrameHeight(400 * this.height / this.width);
      }
      img.src = `/assets/img/frame/${value}`;
    }
  }

  const onClickImage = (value) => {
    if (image != value) {
      setImage(value);
    }
  }

  const onClickDownload = (value) => {
    console.log("===== onClickDownload =====");
    htmlToImage.toJpeg(document.getElementById('work-container'))
      .then(function (dataUrl) {
        var link = document.createElement('a');
        link.download = 'download.jpeg';
        link.href = dataUrl;
        link.click();
      })
  }

  return <>
    <div className='home'>
      <div className='work-container' ref={container} id="work-container" >
        <div className='background-container' style={{width: backgroundWidth, height: backgroundHeight}}>
          {background && <img src={`/assets/img/wall/${background}`} className="bg-img" />}

          <Rnd
            className='frame-container'
            size={{ width: frameWidth, height: frameHeight }}
            position={{ x: framePosX, y: framePosY }}
            onDragStop={(e, d) => {
              setFramePosX(d.x);
              setFramePosY(d.y);
            }}
            onResizeStop={(e, direction, ref, delta, position) => {
              setFrameWidth(ref.style.width);
              setFrameHeight(ref.style.height);
            }}
            enableUserSelectHack={true}
            lockAspectRatio={true}
          >
            {image && <img src={`${API.DOWNLOAD_IMAGE}/${image}`} />}
            {frame && <img src={`/assets/img/frame/${frame}`} className="frame" />}
          </Rnd>
        </div>
      </div>
      <div className='control-pan'>
        <div>
          <label>Backgrounds</label>
          <div className='item-container'>
            {backgrounds.map((item) => {
              return <div key={item} className="item" onClick={() => onClickBackground(item)}>
                <img src={`/assets/img/wall/${item}`} />
              </div>
            })}
          </div>
        </div>
        <div className='mt-4'>
          <label>Frames</label>
          <div className='item-container'>
            {frames.map((item) => {
              return <div key={item} className="item" onClick={() => onClickFrame(item)}>
                <img src={`/assets/img/frame/${item}`} />
              </div>
            })}
          </div>
        </div>
        <div className='mt-4'>
          <label>Images</label>
          <div className='item-container'>
            {imageList.map((item) => {
              return <div key={item} className="item" onClick={() => onClickImage(item)}>
                <img src={`${API.DOWNLOAD_IMAGE}/${item}`} />
              </div>
            })}
          </div>
        </div>
        <div className='d-flex justify-content-center mt-4'>
          <div className='btn btn-primary' onClick={onClickDownload}>Download</div>
        </div>
      </div>
    </div>
  </>
};

export default Home;
