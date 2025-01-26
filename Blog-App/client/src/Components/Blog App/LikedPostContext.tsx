import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface Post {
  id: number;
  username: string;
  postContent: string;
  likes: number;
  comments: number;
  shares: number;
  views: number;
  isDraft: boolean;
}

interface LikedPostContextType {
  likedPosts: Post[];
  addLikedPost: (post: Post) => void;
  removeLikedPost: (id: number) => void;
}

const LikedPostContext = createContext<LikedPostContextType | undefined>(undefined);

export const LikedPostProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [likedPosts, setLikedPosts] = useState<Post[]>([]);

  useEffect(() => {
    const storedLikedPosts = JSON.parse(localStorage.getItem("likedPosts") || "[]");
    setLikedPosts(storedLikedPosts);
  }, []);

  const addLikedPost = (post: Post) => {
    setLikedPosts((prevLikedPosts) => {
      const updatedLikedPosts = [...prevLikedPosts, post];
      localStorage.setItem("likedPosts", JSON.stringify(updatedLikedPosts));
      return updatedLikedPosts;
    });
  };

  const removeLikedPost = (id: number) => {
    setLikedPosts((prevLikedPosts) => {
      const updatedLikedPosts = prevLikedPosts.filter((post) => post.id !== id);
      localStorage.setItem("likedPosts", JSON.stringify(updatedLikedPosts));
      return updatedLikedPosts;
    });
  };

  return (
    <LikedPostContext.Provider value={{ likedPosts, addLikedPost, removeLikedPost }}>
      {children}
    </LikedPostContext.Provider>
  );
};

export const useLikedPosts = (): LikedPostContextType => {
  const context = useContext(LikedPostContext);
  if (!context) {
    throw new Error("useLikedPosts must be used within a LikedPostProvider");
  }
  return context;
};
