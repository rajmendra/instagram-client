import React, { useState, useEffect } from 'react';
import Skeleton from './Skeleton';

import { fetchStatus } from '../../apis/status';
import { getFollowingList } from '../../apis/user';
import StatusItem from './StatusItem';
import { useAuth } from './../Auth/AuthContext';
import { Status } from '../../apis/userInterfaces';

const StatusList: React.FC = () => {
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [followers, setFollowers] = useState<any[]>([]);
  const [loading, setLoader] = useState(false);
  const { loggedInUserId } = useAuth();

  const fetchStatuses = async () => {
    setLoader(true);
    try {
      const response = await fetchStatus(loggedInUserId);
      setStatuses(response?.statuses);
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.error('Error fetching statuses:', error);
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
    fetchStatuses();
    getFollowingListUser();
  }, []);

  const refetchStatuses = () => {
    // Function to refetch statuses
    fetchStatuses();
    getFollowingListUser();
  };
  if (loading) {
    return (
      <p>
        <Skeleton count={3} />
      </p>
    );
  }

  return (
    <div className="status-list">
      {statuses.map((status) => (
        <StatusItem
          followers={followers}
          key={status._id}
          status={status}
          refetchStatuses={refetchStatuses}
        />
      ))}
    </div>
  );
};

export default StatusList;
