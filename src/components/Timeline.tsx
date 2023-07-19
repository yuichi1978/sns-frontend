import { FormEvent, useState, useEffect } from "react";
import apiClient from "@/lib/apiClient";
import Post from "./Post";
import { PostType } from "../types";

const Timeline = () => {
  const [ postText, setPostText ] = useState<string>("");
  const [ latestPosts, setLatestPosts ] = useState<PostType[]>([]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const newPost = await apiClient.post("/posts/post", {
        content: postText,
      });
      setLatestPosts((prevPosts) => [newPost.data, ...prevPosts]);
      setPostText("");
    } catch(err) {
      alert("ログインしてください。");
    }
  };

  useEffect(() => {
    const fetchLatestPost = async () => {
      try {
        const response = await apiClient.get("/posts/get_latest_post");
        setLatestPosts(response.data);
      } catch(err) {
        console.log(err);
      }
    };

    fetchLatestPost();
  }, [])

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="w-4/5 lg:w-full container mx-auto py-4">
        <div className="bg-white shadow-md rounded p-4 mb-4">
          <form onSubmit={handleSubmit}>
            <textarea
              className="w-full h-24 p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-gray-300"
              placeholder="What's on your mind?"
              value={postText}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setPostText(e.target.value)}
            ></textarea>
            <button
              type="submit"
              className="mt-2 bg-teal-300 hover:opacity-60 duration-200 text-white font-semibold py-2 px-4 rounded transition-all hover:translate-y-1"
            >
              投稿
            </button>
          </form>
        </div>
        {latestPosts.map((post: PostType) => (
          <Post key={post.id} post={post} />
        ))}
      </main>
    </div>
  );
};

export default Timeline;