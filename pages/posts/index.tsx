// Static Generation with data
// Scenario 1: Your page content depends on external data

import { NextPage } from "next";
import { PostInterface } from "../../types/post.types";

interface BlogProps {
  posts: Array<PostInterface>;
}

const Blog: NextPage<BlogProps> = ({ posts }) => {
  return (
    <ul>
      {posts.map(({ id, title }) => (
        <li key={id}>{title}</li>
      ))}
    </ul>
  );
};

export async function getStaticProps() {
  const res = await fetch(process.env.REACT_APP_ENDPOINT_BASE_URL + "/posts");
  const posts = await res.json();

  return {
    props: {
      posts,
    },
  };
}

export default Blog;
