import React, { useState } from "react";

const ArticlePage: React.FC = () => {
  // State for comments
  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState<string>("");

  // Handle new comment submission
  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      setComments([...comments, newComment]); // Add the new comment to the list
      setNewComment(""); // Clear the input field
    }
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#fdfbf7",
        color: "#3b2d18",
        padding: "20px",
        overflowY: "auto",
      }}
    >
      {/* Header */}
      <header
        style={{
          color: "white",
          padding: "15px",
          textAlign: "center",
          borderRadius: "8px",
          backgroundImage:
            "url('https://bestanimations.com/Nature/winter/winter-snow-nature-animated-gif-30.gif')",
          backgroundSize: "cover",
          fontWeight: "bold",
        }}
      >
        <h1>Article Title</h1>
        <p>Insights, Ideas, and Inspiration</p>
      </header>

      {/* Main Article Content */}
      <main style={{ marginTop: "20px", lineHeight: "1.6" }}>
        {/* Author Info */}
        <section style={{ marginBottom: "20px" }}>
          <h3>Written by:</h3>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src="https://headshots-inc.com/wp-content/uploads/2021/04/author-headshots-1.jpg"
              alt="Author"
              style={{
                borderRadius: "50%",
                marginRight: "10px",
                width: "40px",
                height: "40px",
              }}
            />
            <div>
              <p style={{ margin: "0", fontWeight: "bold" }}>Alice</p>
              <p style={{ margin: "0", color: "#555" }}>
                Published on: January 13, 2025
              </p>
            </div>
          </div>
        </section>

        {/* Article Body */}
        <article>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget
            orci eros. Curabitur nec venenatis velit. Aenean facilisis lectus
            non risus cursus, eget malesuada metus vehicula. Integer at sapien
            velit. Mauris vulputate velit a magna vehicula, vel dapibus lacus
            commodo.
          </p>
          <p>
            Fusce placerat nisi quis nulla tempus, sed interdum est eleifend.
            Pellentesque id eros at elit maximus pharetra. Sed et sapien sit
            amet quam pharetra euismod. Suspendisse nec tincidunt ex, et
            vehicula velit.
          </p>
        </article>

        {/* Tags */}
        <section style={{ marginTop: "20px" }}>
          <h4>Tags:</h4>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <span
              style={{
                backgroundColor: "#278e50",
                color: "white",
                padding: "5px 10px",
                borderRadius: "15px",
              }}
            >
              Technology
            </span>
            <span
              style={{
                backgroundColor: "#278e50",
                color: "white",
                padding: "5px 10px",
                borderRadius: "15px",
              }}
            >
              Innovation
            </span>
            <span
              style={{
                backgroundColor: "#278e50",
                color: "white",
                padding: "5px 10px",
                borderRadius: "15px",
              }}
            >
              Inspiration
            </span>
          </div>
        </section>
      </main>

      {/* Comments Section */}
      <section style={{ marginTop: "40px" }}>
        <h3>Comments</h3>
        <div
          style={{
            marginTop: "10px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <textarea
            placeholder="Write your comment here..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)} // Update input value
            style={{
              width: "70%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          ></textarea>
          <button
            onClick={handleCommentSubmit}
            style={{
              marginTop: "10px",
              backgroundColor: "#278e50",
              color: "white",
              border: "none",
              padding: "8px 10px",
              borderRadius: "5px",
              cursor: "pointer",
              width: "10%",
            }}
          >
            Submit
          </button>
        </div>

        {/* Display Comments */}
        <div style={{ marginTop: "20px" }}>
          {comments.length > 0 ? (
            <ul style={{ listStyleType: "none", padding: "0" }}>
              {comments.map((comment, index) => (
                <li
                  key={index}
                  style={{
                    backgroundColor: "#f9f9f9",
                    padding: "10px",
                    marginBottom: "10px",
                    borderRadius: "8px",
                    border: "1px solid #ddd",
                  }}
                >
                  {comment}
                </li>
              ))}
            </ul>
          ) : (
            <p>No comments yet. Be the first to comment!</p>
          )}
        </div>
      </section>

      {/* Related Articles */}
      <section style={{ marginTop: "40px" }}>
        <h3>Related Articles</h3>
        <ul style={{ listStyleType: "none", padding: "0" }}>
          <li style={{ marginBottom: "10px" }}>
            <a
              href="#"
              style={{
                color: "#278e50",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Understanding the Basics of React
            </a>
          </li>
          <li style={{ marginBottom: "10px" }}>
            <a
              href="#"
              style={{
                color: "#278e50",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              10 Tips for Writing Clean Code
            </a>
          </li>
          <li style={{ marginBottom: "10px" }}>
            <a
              href="#"
              style={{
                color: "#278e50",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Exploring TypeScript with React
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default ArticlePage;
