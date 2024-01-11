import React from 'react';
import { IKImage } from 'imagekitio-react';
import PlaceHolder from '../../assets/noimg.jpg';
import './Common.css';

const urlEndpoint = 'https://ik.imagekit.io/j5laypcak';
const LazyImage: React.FC<any> = ({ src, alt }) => (
  <IKImage
    urlEndpoint={urlEndpoint}
    alt="User"
    loading="lazy"
    src={src ?? PlaceHolder}
    className="lazy-image"
    onError={(e: any) => {
      e.target.src = PlaceHolder;
    }}
  />
);

export default LazyImage;
