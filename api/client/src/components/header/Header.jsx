import "./header.scss";

export default function Header() {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSm">Node & React</span>
        <span className="headerTitleLg">Blog</span>
      </div>
      <img className="headerImg" src="./assets/headerImg.jpg"></img>
    </div>
  );
}
