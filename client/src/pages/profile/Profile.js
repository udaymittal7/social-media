import React, { useContext, useEffect } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightbar/Rightbar';
import './profile.css';
import { useParams } from 'react-router';
import AuthContext from '../../context/auth/authContext';

const Profile = () => {
  const username = useParams().username;

  const { getUser, profileUser } = useContext(AuthContext);

  const pf = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    getUser(username);
    //eslint-disable-next-line
  }, [username]);

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
                  profileUser && profileUser.user._doc.profilePicture
                    ? pf + profileUser.user._doc.profilePicture
                    : pf + '/person/noAvatar.png'
                }
                alt=''
                className='profileUserImage'
              />
            </div>
            <div className='profileInfo'>
              <h4 className='profileInfoName'>
                {profileUser && profileUser.user._doc.username}
              </h4>
              <span className='profileInfoDesc'>
                {profileUser && profileUser.user._doc.bio}
              </span>
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
