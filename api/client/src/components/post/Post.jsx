import "./post.scss";
import { Link } from "react-router-dom";
export default function Post({ post }) {
  const ImgFolder = "http://localhost:5000/images/";
  return (
    <Link to={`/post/${post._id}`} className="link">
      <div className="post">
        {(post.photo && (
          <img className="postImg" src={ImgFolder + post.photo} />
        )) || <img src="./assets/postimage.jpg" alt="" className="postImg" />}
        <div className="postInfo">
          <div className="postCats">
            {post.categories.map((c) => {
              return (
                <div key={Math.random()} className="postCat">
                  {c.name}
                </div>
              );
            })}
          </div>
          <div className="postTitle">{post.title}</div>
          <div className="postTime">
            {new Date(post.createdAt).toDateString()}
          </div>
          <div className="postDesc">{post.desc}</div>
        </div>
      </div>
    </Link>
  );
}
