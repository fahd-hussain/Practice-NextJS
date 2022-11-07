import { GetServerSideProps, NextPage } from "next";
import { UserInterface } from "../../types/user.types";
import Image from "next/image";
import { imageLoader } from "../../utils";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";

interface UserProps {
  users: Array<UserInterface>;
}

const User: NextPage<UserProps> = ({ users }) => {
  const router = useRouter();
  const [cUsers, setCUsers] = useState<UserInterface[]>([]);

  useEffect(() => {
    setCUsers(users);
  }, [users]);

  const _handleDelete = (index: number) => {
    debugger;
    if (!cUsers) return;

    const tempUsers = [...cUsers];
    tempUsers.splice(index, 1);
    setCUsers(tempUsers);
  };

  return (
    <ul>
      <button onClick={() => router.push("/posts")}>Go To Posts</button>
      {cUsers.map(({ id, name, avatar }, index) => (
        <Fragment key={id}>
          <Link
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
          <button onClick={() => _handleDelete(index)}>Delete</button>
        </Fragment>
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
    props: { users },
  };
};

export default User;
