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
    const formData = new FormData();
    if (bio.current.value !== '') formData.append('bio', bio);
    if (profileImage) formData.append('profilePicture', profileImage);
    if (coverImage) formData.append('coverPicture', coverImage);
    updateUser(user && user._id, formData);
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
                  profileUser && profileUser.user._doc.coverPicture
                    ? pf + profileUser.user._doc.coverPicture
                    : pf + '/person/noCover.png'
                }
                alt='Cover'
                className='profileCoverImage'
              />
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

              <label
                className='profileEditImage'
                htmlFor={profileImage}
                style={{ display: 'inline-block' }}
              >
                <CameraAlt className='profileEditImageLogo' />
                <input
                  type='file'
                  name='image'
                  accept='.png, .jpeg, .jpg'
                  onChange={(e) => setProfileImage(e.target.files[0])}
                  style={{ display: 'none' }}
                />
              </label>
              {profileImage && (
                <Cancel
                  className='profileCancelImage'
                  onClick={() => setProfileImage(null)}
                />
              )}
            </div>
            <div className='profileInfo'>
              <h4 className='profileInfoName'>
                {profileUser && profileUser.user._doc.username}
              </h4>
              {!edit ? (
                <span className='profileInfoDesc'>
                  {profileUser && profileUser.user._doc.bio}
                </span>
              ) : (
                <input
                  className='profileInfoInputBio'
                  ref={bio}
                  placeholder={
                    (profileUser && profileUser.user._doc.bio) || 'Enter Bio'
                  }
                />
              )}
              <button
                className='profileInfoEdit'
                onClick={() => setEdit(!edit)}
              >
                {!edit ? 'Edit Bio And Profile Picture' : 'Cancel'}
                <Edit style={{ marginLeft: '5px' }} />
              </button>
              {edit && (
                <button className='profileInfoEdit' onClick={submitHandler}>
                  Update Bio And Profile Picture
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
