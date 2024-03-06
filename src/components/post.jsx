import { useState } from "react";

export default function Post(props) {
  // This generat a random function for the post-it 
    const randomColors = (colorArray) => {
      const randomIndex = Math.floor(Math.random() * colorArray.length);
      return colorArray[randomIndex];
    };
    // only these colors are allowed
    const colors = ["pink", "orange", "yellow", "aqua", "green"];

    const [backgroundColor] = useState(
      randomColors(colors)
    );
  return (
    <div className="post-card" style={{ backgroundColor: backgroundColor }}>
      <h2 className="post-title">{props.id}) {props.title.substr(0, 18)}</h2>
      <p className="post-body">{props.body.substr(0,24)}</p>
      <button className="btn-delete" onClick={() => props.deletePost(props.id)}>
        Delete
      </button>
    </div>
  );
}
