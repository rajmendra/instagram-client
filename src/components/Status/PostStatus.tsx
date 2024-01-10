import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { postStatus } from '../../apis/status';
import './Status.css';
import { useAuth } from './../Auth/AuthContext';

const PostStatus: React.FC = () => {
  const [statusContent, setStatusContent] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const [postType, setPostType] = useState('text');
  const [file, setFile] = useState<File | null>(null);
  const { loggedInUserId, login, logout } = useAuth();
  const navigate = useNavigate();
  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setStatusContent(e.target.value);
  };

  const handlePostTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPostType(e.target.value);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const checkLogin = () => {
    if (!loggedInUserId || loggedInUserId === '') {
      toast.error('Please login fist');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    console.log(loggedInUserId)
    e.preventDefault();
    if (!checkLogin()) {
      return;
    }
    setIsPosting(true);
    const formData = new FormData();
    formData.append('content', statusContent);
    formData.append('type', postType);
    if (file) {
      formData.append('file', file);
    }
    
    console.log('postStatus')
    const response = await postStatus(loggedInUserId, formData);
    console.log(response);
    setIsPosting(false);
    navigate('/status-list');
  };

  return (
    <div className="post-status-container">
      <h2>Post a New Status</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Type:</label>
          <select value={postType} onChange={handlePostTypeChange}>
            <option value="text">Text</option>
            <option value="image">Image</option>
            <option value="video">Video</option>
          </select>
        </div>

        {postType !== 'text' && (
          <div className="form-group">
            <label>
              {postType === 'image' ? 'Upload Image:' : 'Upload Video:'}
            </label>
            <input
              required
              type="file"
              accept={postType === 'image' ? 'image/*' : 'video/*'}
              onChange={handleFileChange}
            />
          </div>
        )}
        {postType === 'text' && (
          <div className="form-group">
            <label>Content:</label>
            <textarea
              placeholder={`What's on your mind?`}
              value={statusContent}
              onChange={handleInputChange}
              required
            />
          </div>
        )}
        <button disabled={isPosting} type="submit">
          {isPosting ? 'Posting...' : 'Post'}
        </button>
      </form>
    </div>
  );
};

export default PostStatus;
