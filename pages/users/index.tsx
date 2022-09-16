import { GetServerSideProps, NextPage } from "next";
import { UserInterface } from "../../types/user.types";
import Image from "next/image";
import { imageLoader } from "../../utils";
import Link from "next/link";
import { useRouter } from "next/router";

interface UserProps {
  users: Array<UserInterface>;
}

const User: NextPage<UserProps> = ({ users }) => {
  const router = useRouter();

  return (
    <ul>
      <button onClick={() => router.push("/posts")}>Go To Posts</button>
      {users.map(({ id, name, avatar }) => (
        <Link
          key={id}
          href={{
            pathname: "/users/[id]",
            query: { id },
          }}
        >
          <li style={{ display: "flex", alignItems: "center" }}>
            <Image
              loader={imageLoader}
              src={avatar}
              alt={name}
              width={80}
              height={80}
            />
            <span>{name}</span>
          </li>
        </Link>
      ))}
    </ul>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(`${process.env.REACT_APP_ENDPOINT_BASE_URL}/users`);
  const users: UserInterface[] = await res.json();

  if (!users) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { users }, // will be passed to the page component as props
  };
};

export default User;
