import React, { Suspense, lazy } from 'react';
import { Player } from 'video-react';
import { ImageSkeleton } from '../../Common/Skeleton';
 
const LazyImage = lazy(() => import('../../Common/LazyImage'));

const ContentSection: React.FC<any> = ({ status }) => (
  <div className='status-content'>
    {status.type === 'text' && <span>{status.content} </span>}
    {status.type === 'image' && (
      <Suspense fallback={<ImageSkeleton />}>
        <LazyImage src={status.content} alt="Status" />
      </Suspense>
    )}
    {status.type === 'video' && (
      <Player>
        <source src={status.content} />
      </Player>
    )}
  </div>
);

export default ContentSection;
