import React from 'react';
import PlaceHolder from '../../assets/noimg.jpg';
import './Common.css'

const LazyImage: React.FC<any> = ({ src, alt }) => (
  <img
    className="lazy-image"
    src={src ?? PlaceHolder}
    alt={alt}
    onError={(e: any) => {
      e.target.src = PlaceHolder;
    }}
  />
);

export default LazyImage;