import React, { useContext, useEffect, useRef, useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightbar/Rightbar';
import './profile.css';
import { useParams } from 'react-router';
import AuthContext from '../../context/auth/authContext';
import { CameraAlt, Cancel, Edit } from '@material-ui/icons';

const Profile = () => {
  const username = useParams().username;

  const { getUser, profileUser, user, updateUser } = useContext(AuthContext);

  const [edit, setEdit] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const bio = useRef();

  const pf = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    getUser(username);
    //eslint-disable-next-line
  }, [username]);

  const submitHandler = (e) => {
    e.preventDefault();
    let formData;
    if (coverImage || profileImage) {
      formData = new FormData();
      if (bio.current.value !== '') formData.append('bio', bio.current.value);
      if (coverImage) formData.append('cover', coverImage);
      if (profileImage) formData.append('profile', profileImage);
      updateUser(user && user._id, formData, 'multifile');
    } else {
      formData = {};
      formData.bio = bio.current.value;
      updateUser(user && user._id, formData, 'text');
    }
    setEdit(!edit);
  };

  return (
    <>
      <Navbar />
      <div className='profile'>
        <Sidebar />
        <div className='profileRight'>
          <div className='profileRightTop'>
            <div className='profileCover'>
              <img
                src={
                  !coverImage
                    ? profileUser && profileUser.user._doc.coverPicture
                      ? pf + profileUser.user._doc.coverPicture
                      : pf + '/person/noCover.png'
                    : URL.createObjectURL(coverImage)
                }
                alt='Cover'
                className='profileCoverImage'
              />
              {user && user.username === username && edit && (
                <label
                  className='coverEditImage'
                  htmlFor={coverImage}
                  style={{ display: 'inline-block' }}
                >
                  {!coverImage ? (
                    <>
                      <CameraAlt className='coverEditImageLogo' />
                      <input
                        type='file'
                        name='image'
                        accept='.png, .jpeg, .jpg'
                        onChange={(e) => setCoverImage(e.target.files[0])}
                        style={{ display: 'none' }}
                      />
                    </>
                  ) : (
                    <Cancel
                      className='coverCancelImage'
                      onClick={(e) => {
                        e.preventDefault();
                        setCoverImage(null);
                      }}
                    />
                  )}
                </label>
              )}
              <img
                src={
                  !profileImage
                    ? profileUser && profileUser.user._doc.profilePicture
                      ? pf + profileUser.user._doc.profilePicture
                      : pf + '/person/noAvatar.png'
                    : URL.createObjectURL(profileImage)
                }
                alt=''
                className='profileUserImage'
              />
              {user && user.username === username && edit && (
                <label
                  className='profileEditImage'
                  htmlFor={profileImage}
                  style={{ display: 'inline-block' }}
                >
                  {!profileImage ? (
                    <>
                      <CameraAlt className='profileEditImageLogo' />
                      <input
                        type='file'
                        name='image'
                        accept='.png, .jpeg, .jpg'
                        onChange={(e) => setProfileImage(e.target.files[0])}
                        style={{ display: 'none' }}
                      />
                    </>
                  ) : (
                    <Cancel
                      className='profileCancelImage'
                      onClick={(e) => {
                        e.preventDefault();
                        setProfileImage(null);
                      }}
                    />
                  )}
                </label>
              )}
            </div>
            <div className='profileInfo'>
              <h4 className='profileInfoName'>
                {profileUser && profileUser.user._doc.username}
              </h4>
              {user && user.username === username && edit ? (
                <input
                  className='profileInfoInputBio'
                  ref={bio}
                  placeholder={
                    (profileUser && profileUser.user._doc.bio) || 'Enter Bio'
                  }
                />
              ) : (
                <span className='profileInfoDesc'>
                  {profileUser && profileUser.user._doc.bio}
                </span>
              )}
              {user && user.username === username && (
                <button
                  className='profileInfoEdit'
                  onClick={() => setEdit(!edit)}
                >
                  {!edit ? 'Edit Bio And Pictures' : 'Cancel'}
                  <Edit style={{ marginLeft: '5px' }} />
                </button>
              )}
              {user && user.username === username && edit && (
                <button className='profileInfoEdit' onClick={submitHandler}>
                  Update Bio And Images
                </button>
              )}
            </div>
          </div>
          <div className='profileRightBottom'>
            <Feed username={username} />
            <Rightbar user={profileUser && profileUser.user._doc} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
