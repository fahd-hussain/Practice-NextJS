// Static Generation with data
// Scenario 1: Your page content depends on external data

import { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { PostInterface } from "../../types/post.types";

interface BlogProps {
  posts: Array<PostInterface>;
}

const Blog: NextPage<BlogProps> = ({ posts }) => {
  return (
    <ul>
      {posts.map(({ id, title }) => (
        <Link key={id} href={`/posts/${id}`}>
          <li>{title}</li>
        </Link>
      ))}
    </ul>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(process.env.REACT_APP_ENDPOINT_BASE_URL + "/posts");
  const posts = await res.json();

  return {
    props: {
      posts,
    },
    revalidate: 5,
  };
};

export default Blog;
