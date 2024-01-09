import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchStatus } from '../../apis/status'
import { getFollowingList } from '../../apis/user'
import StatusItem from './StatusItem'
import { useAuth } from './../Auth/AuthContext'
import { Status } from '../../apis/interfaceDefs'

const StatusList: React.FC = () => {
  const [statuses, setStatuses] = useState<Status[]>([])
  const [followers, setFollowers] = useState<any[]>([])
  const [loading, setLoader]  = useState(false);
  const { loggedInUserId, login, logout } = useAuth()
  const [editProfileVisible, setEditProfileVisible] = useState(false)
  const navigate = useNavigate()

  const fetchStatuses = async () => {
    setLoader(true);
    try {
      const statuses = await fetchStatus(loggedInUserId) // Assuming fetchStatus directly returns an array
      setStatuses(statuses)
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.error('Error fetching statuses:', error)
    }
  }

  const getFollowingListUser = async () => {
    try {
      const followers_data = await getFollowingList(loggedInUserId) // Assuming fetchStatus directly returns an array
      setFollowers(followers_data)
    } catch (error) {
      console.error('Error fetching statuses:', error)
    }
  }

  useEffect(() => {
    fetchStatuses()
    getFollowingListUser()
  }, [])

  const refetchStatuses = () => {
    // Function to refetch statuses
    fetchStatuses()
    getFollowingListUser()
  }
if(loading){
  return (<div className="status-list center">
    Loading status ....
    </div>)
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
  )
}

export default StatusList
