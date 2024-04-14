import React from "react";
import PropTypes from "prop-types";
import "./Message.css"; // Import your CSS file for styling
import {getAuth, app} from './Firebase';

const auth=getAuth(app);
const Message = ({ name, text, url_pic, curr_uid }) => {
  
  let left=false;
  const {uid}=auth.currentUser;
  if(uid!=curr_uid)
  {
    left=true;
  }
  return (
    <>
      <div className={uid==curr_uid ? 'message-container-user': 'message-container'}>
        {left ? <img src={url_pic} className="pfp"></img> : null}
        <div className="message-bubble">
          <div class="d-flex flex-row mb-3">
            <div className="message-name p-2">{name}</div>
          </div>

          <div className="message-text">{text}</div>
        </div>
        {!left ? <img src={url_pic} className="pfp"></img> : null }
      </div>
    </>
  );
};

Message.propTypes = {
  //using propTypes to validate the props
  name: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Message;
