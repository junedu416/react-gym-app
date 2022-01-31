import { useEffect } from "react";
import { useGlobalState } from "../config/globalStore";
import { getUserProfile } from "../services/userServices";

const RememberMe = () => {
  const { dispatch } = useGlobalState();
  //if uid is in local storage then fetch the profile for the user.
  //Called at app level
  useEffect(() => {
    console.log("remembering user");
    const uid = window.localStorage.getItem("uid");
    if (uid) {
      getUserProfile(uid).then((response) => {
        console.log(response);
        dispatch({ type: "setProfile", data: response });
      });
    }
  }, [dispatch]);

  return <></>;
};

export default RememberMe;
