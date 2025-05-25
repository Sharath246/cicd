import { useEffect } from "react";
import "./home.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setUserData } from "../redux/user.reducer.ts";
import { STATUS_SUCCESS } from "../utils/constants.ts";
import { useNavigate } from "react-router-dom";
import { HomeBody } from "./homebody.tsx";
import { RootState } from "../store.ts";
import { UserDataType } from "../utils/types.ts";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const status: string = useSelector((state:RootState) => state.user.userFetchStatus);
  const userData = useSelector((state: RootState) => state.user.user) as UserDataType | undefined;

  useEffect(() => {
    if (!sessionStorage.getItem('user')) {
      navigate("/login");
      return;
    }
    async function fetchUserData() {
      try {
        const response = await axios.get(
          "http://localhost:8080/getUserDetails",
          {
            headers: {
              email: sessionStorage.getItem('user'),
            },
          }
        );
        dispatch(setUserData(response.data));
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    }
    if(status !== STATUS_SUCCESS)
    fetchUserData();
  }, [dispatch, navigate, status]);

  return status === STATUS_SUCCESS ? (
    <div>
      <Heading name={userData?.name ?? ""}/>
      <HomeBody/>
    </div>
  ) : (
    <>Loading Data...</>
  );
};

export default Home;

const Heading = ({name}) =>{
  return(
    <div style={{width:"100%",textAlign:"center",fontSize:"2rem"}}>
      Hello {name}
    </div>
  )
}
