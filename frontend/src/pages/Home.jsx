import { useContext } from "react";
import { UserContext } from "../context/user.context";

const Home = () => {
  const { user } = useContext(UserContext);

  return <div>{user ? <h1>Welcome, {user.email}</h1> : <h1>Welcome</h1>}</div>;
};

export default Home;
