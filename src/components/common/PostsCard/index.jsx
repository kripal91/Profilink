import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "antd";
import { BsPencil, BsTrash } from "react-icons/bs";
import {
  getCurrentUser,
  getAllUsers,
  deletePost,
  getConnections,
} from "../../../api/FirestoreAPI";
import LikeButton from "../LikeButton";
import "./index.scss";

export default function PostsCard({ posts, id, getEditData }) {
  let navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [imageModal, setImageModal] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    getCurrentUser(setCurrentUser);
    getAllUsers(setAllUsers);
  }, []);

  useEffect(() => {
    if (currentUser.id && posts.userID) {
      getConnections(currentUser.id, posts.userID, setIsConnected);
    }
  }, [currentUser.id, posts.userID]);

  const postUser = allUsers.find(user => user.id === posts.userID);

  if (!isConnected && currentUser.id !== posts.userID) {
    return null;
  }

  return (
    <div className="posts-card" key={id}>
      <div className="post-image-wrapper">
        {currentUser.id === posts.userID && (
          <div className="action-container">
            <BsPencil
              size={20}
              className="action-icon"
              onClick={() => getEditData(posts)}
            />
            <BsTrash
              size={20}
              className="action-icon"
              onClick={() => deletePost(posts.id)}
            />
          </div>
        )}

        {postUser && (
          <img
            alt="profile-image"
            className="profile-image"
            src={postUser.imageLink}
          />
        )}
        <div>
          {postUser && (
            <>
              <p
                className="name"
                onClick={() =>
                  navigate("/profile", {
                    state: { id: posts.userID, email: posts.userEmail },
                  })
                }
              >
                {postUser.name}
              </p>
              <p className="headline">{postUser.headline}</p>
            </>
          )}
          <p className="timestamp">{posts.timeStamp}</p>
        </div>
      </div>
      {posts.postImage && (
        <img
          onClick={() => setImageModal(true)}
          src={posts.postImage}
          className="post-image"
          alt="post-image"
        />
      )}
      <p
        className="status"
        dangerouslySetInnerHTML={{ __html: posts.status }}
      ></p>

      <LikeButton
        userId={currentUser?.id}
        postId={posts.id}
        currentUser={currentUser}
      />

      <Modal
        centered
        open={imageModal}
        onOk={() => setImageModal(false)}
        onCancel={() => setImageModal(false)}
        footer={[]}
      >
        <img
          src={posts.postImage}
          className="post-image modal"
          alt="post-image"
        />
      </Modal>
    </div>
  );
}
