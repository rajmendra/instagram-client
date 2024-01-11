import PropTypes from 'prop-types';
import React, { Suspense, lazy } from 'react';
import { Player, BigPlayButton } from 'video-react';
import 'video-react/dist/video-react.css';
import { ImageSkeleton } from '../../Common/Skeleton';

const LazyImage = lazy(() => import('../../Common/LazyImage'));

const ContentSection: React.FC<any> = React.memo(
  ({ status: { type, content } }) => {
    switch (type) {
      case 'text':
        return (
          <div className="status-content">
            <span>{content}</span>
          </div>
        );
      case 'image':
        return (
          <div className="status-content">
            <Suspense fallback={<ImageSkeleton />}>
              <LazyImage src={content} alt="Status" />
            </Suspense>
          </div>
        );
      case 'video':
        return (
          <div className="status-content">
            <Player preload="auto" src={content}>
            < BigPlayButton position="center" />
            </Player>
          </div>
        );
      default:
        return null;
    }
  },
);

ContentSection.propTypes = {
  status: PropTypes.shape({
    type: PropTypes.oneOf(['text', 'image', 'video']).isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
};

export default ContentSection;
