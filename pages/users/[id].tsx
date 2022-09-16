import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { UserInterface } from "../../types/user.types";
import { imageLoader } from "../../utils";

interface UserProps {
  user: UserInterface;
}

const User: NextPage<UserProps> = ({ user }) => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="_container_div">
      <Image
        loader={imageLoader}
        src={user.avatar}
        alt={user.name}
        width={80}
        height={80}
      />
      <h1>{id} - {user.name}</h1>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<any, any> = async ({
  params,
}) => {
  const res = await fetch(
    `${process.env.REACT_APP_ENDPOINT_BASE_URL}/users/${params.id}`
  );
  const user: UserInterface = await res.json();

  if (!user) {
    return {
      redirect: {
        destination: "/users",
        permanent: false,
      },
    };
  }

  return {
    props: { user }, // will be passed to the page component as props
  };
};

export default User;
