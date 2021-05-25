import React, { useContext, useEffect, useRef, useState } from 'react';
import './rightbar.css';
import { Users } from '../../dummyData';
import Online from '../online/Online';
import { Link } from 'react-router-dom';
import {
  Cancel,
  Edit,
  PersonAdd,
  PersonAddDisabled,
  VideoCall,
} from '@material-ui/icons';
import { useParams } from 'react-router';
import AuthContext from '../../context/auth/authContext';

const Rightbar = ({ user }) => {
  const username = useParams().username;
  const {
    friends,
    getFriends,
    user: currentUser,
    followUser,
    updateUser,
  } = useContext(AuthContext);

  const school = useRef();
  const college = useRef();
  const title = useRef();
  const company = useRef();
  const address = useRef();
  const gender = useRef();
  const website = useRef();
  const mobile = useRef();
  const facebook = useRef();
  const instagram = useRef();
  const twitter = useRef();
  const relationship = useRef();

  const pf = process.env.REACT_APP_PUBLIC_FOLDER;
  const [followed, setFollowed] = useState(false);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    setFollowed(
      currentUser &&
        currentUser.followings.some((following) => following.user === user?._id)
    );
  }, [currentUser, user]);

  useEffect(() => {
    if (user) getFriends(username);
  }, [user, username]);

  const followClickHandler = () => {
    if (user) {
      followUser(user._id, followed);
      setFollowed(!followed);
    }
  };

  const editClickHandler = () => {
    setEdit(!edit);
  };

  const editSubmitHandler = () => {
    const formData = {};
    if (school && school.current.value !== '')
      formData.school = school.current.value;
    if (college && college.current.value !== '')
      formData.college = college.current.value;
    if (title && title.current.value !== '')
      formData.title = title.current.value;
    if (company && company.current.value !== '')
      formData.company = company.current.value;
    if (mobile && mobile.current.value !== '')
      formData.mobile = mobile.current.value;
    if (address && address.current.value !== '')
      formData.address = address.current.value;
    if (gender && gender.current.value !== '')
      formData.gender = gender.current.value;
    if (relationship && relationship.current.value !== '')
      formData.relationship = relationship.current.value;
    if (website && website.current.value !== '')
      formData.website = website.current.value;
    if (facebook && facebook.current.value !== '')
      formData.facebook = facebook.current.value;
    if (instagram && instagram.current.value !== '')
      formData.instagram = instagram.current.value;
    if (twitter && twitter.current.value !== '')
      formData.twitter = twitter.current.value;
    updateUser(currentUser && currentUser._id, formData);
    setEdit(!edit);
  };

  const HomeRightbar = () => {
    return (
      <>
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
        {currentUser && currentUser.username !== user.username ? (
          <button className='rightbarFollowButton' onClick={followClickHandler}>
            <span className='rightbarFollowButtonText'>
              {followed ? 'Unfollow' : 'Follow'}{' '}
            </span>
            {followed ? (
              <PersonAddDisabled className='rightbarFollowButtonIcon' />
            ) : (
              <PersonAdd className='rightbarFollowButtonIcon' />
            )}
          </button>
        ) : (
          <>
            <button
              className='rightbarEditButton'
              onClick={!edit ? editClickHandler : editSubmitHandler}
            >
              <span className='rightbarEditButtonText'>
                {!edit ? 'Edit Profile Information ' : 'Confirm Changes '}
              </span>
              <Edit classname='rightbarEditButtonIcon' />
            </button>
            <button
              className='rightbarEditCancelButton'
              onClick={editClickHandler}
              style={!edit ? { display: 'none' } : {}}
            >
              <span className='rightbarEditCancelButtonText'>
                {!edit ? '' : 'Cancel '}
              </span>
              <Cancel classname='rightbarEditCancelButtonIcon' />
            </button>
          </>
        )}
        <h4 className='rightbarTitle'>User Information</h4>
        <div className='rightbarInfo'>
          {(user.education.length > 0 || edit) && (
            <>
              <div className='rightbarInfoItem'>
                {(edit || user.education[0].school) && (
                  <span className='rightbarInfoKey'>School: </span>
                )}

                {(edit || user.education[0].school) &&
                  (!edit ? (
                    <span className='rightbarInfoValue'>
                      {user.education[0].school}
                    </span>
                  ) : (
                    <input
                      className='rightbarEditStateInput'
                      ref={school}
                      placeholder={
                        ' ' +
                        ((user.education &&
                          user.education[0] &&
                          user.education[0].school) ||
                          'Enter information')
                      }
                    />
                  ))}
              </div>
              <div className='rightbarInfoItem'>
                {(edit || user.education[0].college) && (
                  <span className='rightbarInfoKey'>College: </span>
                )}
                {(edit || user.education[0].college) &&
                  (!edit ? (
                    <span className='rightbarInfoValue'>
                      {user.education[0].college}
                    </span>
                  ) : (
                    <input
                      className='rightbarEditStateInput'
                      ref={college}
                      placeholder={
                        ' ' +
                        ((user.education &&
                          user.education[0] &&
                          user.education[0].college) ||
                          'Enter information')
                      }
                    />
                  ))}
              </div>
            </>
          )}
          {(user.work.length > 0 || edit) && (
            <>
              <div className='rightbarInfoItem'>
                {(edit || user.work[0].title) && (
                  <span className='rightbarInfoKey'>Profession: </span>
                )}
                {(edit || user.work[0].title) &&
                  (!edit ? (
                    <span className='rightbarInfoValue'>
                      {user.work[0].title}
                    </span>
                  ) : (
                    <input
                      className='rightbarEditStateInput'
                      ref={title}
                      placeholder={
                        ' ' +
                        ((user.work && user.work[0] && user.work[0].title) ||
                          'Enter information')
                      }
                    />
                  ))}
              </div>
              <div className='rightbarInfoItem'>
                {(edit || user.work[0].company) && (
                  <span className='rightbarInfoKey'>Company: </span>
                )}
                {(edit || user.work[0].company) &&
                  (!edit ? (
                    <span className='rightbarInfoValue'>
                      {user.work[0].company}
                    </span>
                  ) : (
                    <input
                      className='rightbarEditStateInput'
                      ref={company}
                      placeholder={
                        ' ' +
                        ((user.work && user.work[0] && user.work[0].company) ||
                          'Enter information')
                      }
                    />
                  ))}
              </div>
            </>
          )}
          {(user.address || edit) && (
            <div className='rightbarInfoItem'>
              <span className='rightbarInfoKey'>Address: </span>
              {!edit ? (
                <span className='rightbarInfoValue'>{user.address}</span>
              ) : (
                <input
                  className='rightbarEditStateInput'
                  ref={address}
                  placeholder={' ' + (user.address || 'Enter information')}
                />
              )}
            </div>
          )}
          {(user.gender || edit) && (
            <div className='rightbarInfoItem'>
              <span className='rightbarInfoKey'>Gender: </span>
              {!edit ? (
                <span className='rightbarInfoValue'>{user.gender}</span>
              ) : (
                <input
                  className='rightbarEditStateInput'
                  ref={gender}
                  placeholder={' ' + (user.gender || 'Enter information')}
                />
              )}
            </div>
          )}
          {(user.mobile || edit) && (
            <div className='rightbarInfoItem'>
              <span className='rightbarInfoKey'>Mobile: </span>
              {!edit ? (
                <span className='rightbarInfoValue'>{user.mobile}</span>
              ) : (
                <input
                  className='rightbarEditStateInput'
                  ref={mobile}
                  placeholder={' ' + (user.mobile || 'Enter information')}
                />
              )}
            </div>
          )}
          {(user.website || edit) && (
            <div className='rightbarInfoItem'>
              <span className='rightbarInfoKey'>Website: </span>
              {!edit ? (
                <span className='rightbarInfoValue'>{user.website}</span>
              ) : (
                <input
                  className='rightbarEditStateInput'
                  ref={website}
                  placeholder={' ' + (user.website || 'Enter information')}
                />
              )}
            </div>
          )}
          {(user.social || edit) && (
            <>
              <div className='rightbarInfoItem'>
                {(edit || user.social.facebook) && (
                  <span className='rightbarInfoKey'>Facebook: </span>
                )}
                {(edit || user.social.facebook) &&
                  (!edit ? (
                    <span className='rightbarInfoValue'>
                      {user.social.facebook}
                    </span>
                  ) : (
                    <input
                      className='rightbarEditStateInput'
                      ref={facebook}
                      placeholder={
                        ' ' +
                        ((user.social && user.social.facebook) ||
                          'Enter information')
                      }
                    />
                  ))}
              </div>
              <div className='rightbarInfoItem'>
                {(edit || user.social.instagram) && (
                  <span className='rightbarInfoKey'>Instagram: </span>
                )}
                {(edit || user.social.instagram) &&
                  (!edit ? (
                    <span className='rightbarInfoValue'>
                      {user.social.instagram}
                    </span>
                  ) : (
                    <input
                      className='rightbarEditStateInput'
                      ref={instagram}
                      placeholder={
                        ' ' +
                        ((user.social && user.social.instagram) ||
                          'Enter information')
                      }
                    />
                  ))}
              </div>
              <div className='rightbarInfoItem'>
                {(edit || user.social.twitter) && (
                  <span className='rightbarInfoKey'>Twitter: </span>
                )}
                {(edit || user.social.twitter) &&
                  (!edit ? (
                    <span className='rightbarInfoValue'>
                      {user.social.twitter}
                    </span>
                  ) : (
                    <input
                      className='rightbarEditStateInput'
                      ref={twitter}
                      placeholder={
                        ' ' +
                        ((user.social && user.social.twitter) ||
                          'Enter information')
                      }
                    />
                  ))}
              </div>
            </>
          )}
          {(user.relationship || edit) && (
            <div className='rightbarInfoItem'>
              <span className='rightbarInfoKey'>Relationship: </span>
              {!edit ? (
                <span className='rightbarInfoValue'>{user.relationship}</span>
              ) : (
                <input
                  className='rightbarEditStateInput'
                  ref={relationship}
                  placeholder={' ' + (user.relationship || 'Enter information')}
                />
              )}
            </div>
          )}
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
