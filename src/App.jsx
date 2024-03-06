import { useState, useEffect } from "react";
import "./App.css";
import AddPost from "./components/addPost";
import Post from "./components/post";

/*  When a request is made via a REST API, it sends a representation of the resource's
    current state to the requester or endpoint.
    This state representation can take the form of JSON(JavaScript Object Notation),
    XML, or HTML. JSON  is the most widely used file format because it is 
    language - independent and can be read by both humans and machines.
*/
function App() {

    const [posts, setPosts] = useState([]);
    const limitFetch = 4;
  
    const fetchPosts = async() => {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limitFetch}`);
      const data = await response.json();
      setPosts(data);

      /*  // This is a different way
          fetch("https://jsonplaceholder.typicode.com/posts?_limit=8")
          .then((Response) => Response.json())
          .then((data) => setPosts(data));
      */
    };
  
    // Call the fetchPost() inside the useEffect to prevent rerendering using []
    useEffect(() => {
      fetchPosts();
    }, []);
  
    // 3. When we want to add new post to the api.
    // We have to have these arguments. title, body.

    

    const addPost = async (postTitle, postBody) => {
        // To add post we have to add an object to describe what kind of request it is.
        // We need to add a header to our message to tell what kind of data we are sending.
        const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            body: JSON.stringify({
              title: postTitle,
              body: postBody,
              userID: 1, // Math.random().toString(36).slice(2),
            }),
            headers: {
              "content-type": "application/json; charset=UTF-8",
            },
        });

        // Handle response data
        const data = await response.json();
         console.log('add data: ', data);

        // Created => status 201
        if (response.status >= 200 && response.status < 300) {
          // Add post first in the gui
          // setPosts((prevPosts) => [data, ...prevPosts]);
          setPosts([data, ...posts]);
        }
        else {
          console.error('Error: ', response);
        }
    };


  // Delete!
  const deletePost = async (id) => {
    // Delete post by sendig post id and using method "DELETE" - status 200 on success
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`,
      {
        method: "DELETE",
      }
    );
    // console.log('Delete response: ', response);

    if (response.status === 200) {
      setPosts(
        posts.filter((post) => {
          return post.id !== id;
        })
      );
    }
    else {
      console.error('Error: ', response);
    }

   };

  return (
    <main>
      <h1>Post message via REST api</h1>
      <AddPost addPost={addPost} />
      <section className="posts-container">
        <h2>Posts</h2>
        {posts.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            title={post.title}
            body={post.body}
            deletePost={deletePost}
          />
        ))}
      </section>
    </main>
  );
}

export default App;
