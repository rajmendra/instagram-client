import React, { useState, useEffect, useCallback, useMemo, useRef, forwardRef } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component'
import { useInfiniteQuery } from 'react-query';


import { Skeleton } from '../Common/Skeleton';
import { fetchStatus, fetchData } from '../../apis/status';
import { getFollowingList } from '../../apis/user';
import StatusItem from './StatusItem/StatusItem';
import { useAuth } from './../Auth/AuthContext';
import { Status } from '../../apis/userInterfaces';

const StatusList: React.FC = () => {
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [followers, setFollowers] = useState<any[]>([]);
  const [loading, setLoader] = useState(false);
  const { loggedInUserId } = useAuth();

  const fetchStatuses = async (showLoader: boolean = true) => {
    if (showLoader) setLoader(true);
  
    try {
      const response = await fetchStatus(loggedInUserId);
      setStatuses(response?.statuses);
    } catch (error) {
      console.error('Error fetching statuses:', error);
    } finally {
      if (showLoader) setLoader(false);
    }
  };

  const getFollowingListUser = async () => {
    if (loggedInUserId) {
      try {
        const followingList = await getFollowingList(loggedInUserId);
        setFollowers(followingList);
      } catch (error) {
        console.error('Error fetching statuses:', error);
      }
    }
  };

  useEffect(() => {
    getFollowingListUser();
  }, []);


  const { data, error, fetchNextPage, hasNextPage, isFetching, isLoading } =
    useInfiniteQuery('status', fetchData, {
      getNextPageParam: (lastPage, pages) => lastPage.offset,
    });

    const flattenedData = useMemo(
      () => (data ? data?.pages.flatMap(item => item.results) : []),
      [data]
    );
    
  const refetchFollowers = () => {
    getFollowingListUser();
  };
  if (isLoading) {
    return (
      <div>
        <Skeleton/>
        <Skeleton/>
        <Skeleton/>
      </div>
    );
  }

  return (<InfiniteScroll
    dataLength={flattenedData.length}
    next={fetchNextPage}
    hasMore={!!hasNextPage}
    loader={<Skeleton/>}
    endMessage={
      <p style={{ textAlign: 'center' }}>
        <b>Yay! You have seen it all</b>
      </p>
    }
  >
    {flattenedData.map((status, i) => (
        <StatusItem
          followers={followers}
          key={status._id}
          status={status}
          refetchStatuses={fetchStatuses}
          refetchFollowers={refetchFollowers}
        />
      ))}
  </InfiniteScroll>);
};

export default StatusList;
