import { useContext } from "react";
import { UserContext } from "../context/user.context";

const Home = () => {
  const { user } = useContext(UserContext);

  return (
    <div>
      <p> {user?.email}</p>
      <p> {user?.id}</p>
    </div>
  );
};

export default Home;
