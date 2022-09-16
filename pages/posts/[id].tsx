// Static Generation with data
// Scenario 2: Your page paths depend on external data

import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { PostInterface } from "../../types/post.types";

interface PostProps {
  post: PostInterface;
}

const Post: NextPage<PostProps> = ({ post }) => {
  const router = useRouter();
  const { id } = router.query;

  if (router.isFallback) {
    return <div className="_container_div">Loading...</div>;
  }

  return (
    <div className="_container_div">
      <h1>
        {id} - {post.title}
      </h1>
      <p>{post.description}</p>
    </div>
  );
};

// This function gets called at build time
export const getStaticPaths: GetStaticPaths = async () => {
  // Call an external API endpoint to get posts
  const res = await fetch(`${process.env.REACT_APP_ENDPOINT_BASE_URL}/posts`);
  const posts: PostInterface[] = await res.json();

  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post) => ({
    params: { id: post.id },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: "blocking" };
};

// This also gets called at build time
export const getStaticProps: GetStaticProps<any, any> = async ({ params }) => {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const res = await fetch(
    `${process.env.REACT_APP_ENDPOINT_BASE_URL}/posts/${params.id}`
  );
  const post: PostInterface = await res.json();

  if (!post) {
    return {
      notFound: true,
    };
  }

  // Pass post data to the page via props
  return { props: { post }, revalidate: 5 };
};

export default Post;
