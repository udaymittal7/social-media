import React, { useContext, useEffect, useState } from 'react';
import './rightbar.css';
import { Users } from '../../dummyData';
import Online from '../online/Online';
import { Link } from 'react-router-dom';
import { PersonAdd, PersonAddDisabled, VideoCall } from '@material-ui/icons';
import { useParams } from 'react-router';
import AuthContext from '../../context/auth/authContext';

const Rightbar = ({ user }) => {
  const username = useParams().username;
  const {
    friends,
    getFriends,
    user: currentUser,
    followUser,
  } = useContext(AuthContext);
  const pf = process.env.REACT_APP_PUBLIC_FOLDER;
  const [followed, setFollowed] = useState(false);

  useEffect(() => {
    setFollowed(
      currentUser &&
        currentUser.followings.some((following) => following.user === user?._id)
    );
  }, [currentUser, user]);

  useEffect(() => {
    if (user) getFriends(username);
  }, [user, username]);

  const clickHandler = () => {
    if (user) {
      followUser(user._id, followed);
      setFollowed(!followed);
    }
  };

  const HomeRightbar = () => {
    return (
      <>
        {/* <div className='birthdayContainer'>
          <img src={`${pf}gift.png`} alt='' className='birthdayImg' />
          <span className='birthdayText'>
            <b>Kush</b> and <b>3 other friends</b> have birthday today
          </span>
        </div>
        <img src={`${pf}ad.png`} alt='' className='rightbarAd' /> */}
        <div className='rightbarTitle'>
          <h4 className='rightbarTitleText'>Online Friends</h4>
          <VideoCall className='rightbarTitleIcon' />
        </div>
        <ul className='rightbarFriendList'>
          {Users.map((user1) => (
            <Online key={user1.id} user={user1} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        {currentUser && currentUser.username !== user.username && (
          <button className='rightbarFollowButton' onClick={clickHandler}>
            <span className='rightbarFollowButtonText'>
              {followed ? 'Unfollow' : 'Follow'}{' '}
            </span>
            {followed ? (
              <PersonAddDisabled className='rightbarFollowButtonIcon' />
            ) : (
              <PersonAdd className='rightbarFollowButtonIcon' />
            )}
          </button>
        )}
        <h4 className='rightbarTitle'>User Information</h4>
        <div className='rightbarInfo'>
          <div className='rightbarInfoItem'>
            <span className='rightbarInfoKey'>Address: </span>
            <span className='rightbarInfoValue'>{user.address}</span>
          </div>
          <div className='rightbarInfoItem'>
            <span className='rightbarInfoKey'>Gender: </span>
            <span className='rightbarInfoValue'>{user.gender}</span>
          </div>
          <div className='rightbarInfoItem'>
            <span className='rightbarInfoKey'>Relationship: </span>
            <span className='rightbarInfoValue'>{user.relationship}</span>
          </div>
        </div>
        <h4 className='rightbarTitle'>User Friends</h4>
        <div className='rightbarFollowings'>
          {friends &&
            friends.map((friend) => (
              <Link
                to={`/users/${friend.username}`}
                style={{ textDecoration: 'none' }}
              >
                <div className='rightbarFollowing'>
                  <img
                    src={
                      friend.profilePicture
                        ? pf + friend.profilePicture
                        : pf + 'person/noAvatar.png'
                    }
                    alt=''
                    className='rightbarFollowingImage'
                  />
                  <span className='rightbarFollowingName'>
                    {friend.username}
                  </span>
                </div>
              </Link>
            ))}
        </div>
      </>
    );
  };

  return (
    <div
      className={`rightbar ${
        currentUser && currentUser.username !== username ? 'mt60' : 'mt20'
      } ${!username && 'mt0'}`}
    >
      <div className='rightbarWrapper'>
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
};

export default Rightbar;
