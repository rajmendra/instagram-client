import React, { useState, useEffect, useMemo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useInfiniteQuery } from 'react-query';

import { Skeleton } from '../Common/Skeleton';
import { fetchStatus, fetchData } from '../../apis/status';
import { getFollowingList, getUserLikes } from '../../apis/user';
import StatusItem from './StatusItem/StatusItem';
import { useAuth } from './../Auth/AuthContext';
import { Status } from '../../interface/status-interfaces';

const StatusList: React.FC = () => {
  const [likes, setLikes] = useState<Status[]>([]);
  const [followers, setFollowers] = useState<any[]>([]);
  const { loggedInUserId } = useAuth();

  const getUserLikesAndFollows  = async () => {
    if (loggedInUserId) {
      try {
        const followingList = await getFollowingList(loggedInUserId);
        const likeList = await getUserLikes(loggedInUserId);
        setFollowers(followingList);
        setLikes(likeList);
      } catch (error) {
        console.error('Error fetching statuses:', error);
      }
    }
  };

  useEffect(() => {
    getUserLikesAndFollows();
  }, []);

  const {
    data,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
  } = useInfiniteQuery('status', fetchData, {
    getNextPageParam: (lastPage, pages) => lastPage.offset,
  });

  const flattenedData = useMemo(
    () => (data ? data?.pages.flatMap((item) => item.results) : []),
    [data],
  );

  const refetchStatuses = async (showLoader: boolean = true) => {
    refetch();
  };

  const refetchFollowers = () => {
    refetch();
    getUserLikesAndFollows();
  };

  if (isLoading) {
    return (
      <div>
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>
    );
  }
  if (!isLoading && !flattenedData.length) {
    return (
      <div style={{ textAlign: 'center' }}>
        <b>No Status</b>
      </div>
    );
  }

  return (
    <InfiniteScroll
      dataLength={flattenedData.length}
      next={fetchNextPage}
      hasMore={!!hasNextPage}
      loader={<div />}
      endMessage={
        <div style={{ textAlign: 'center' }}>
          <b>Yay! You have seen it all</b>
        </div>
      }
    >
      {flattenedData.map((status, i) => (
        <StatusItem
          followers={followers}
          likes={likes}
          key={status._id}
          status={status}
          refetchStatuses={refetchStatuses}
          refetchFollowers={refetchFollowers}
        />
      ))}
    </InfiniteScroll>
  );
};

export default StatusList;
