import { useGlobalState } from "../config/globalStore";
import { NotificationContainer } from "../styled-components/notification";
import CancelIcon from "@mui/icons-material/Cancel";
import { useEffect } from "react";

const Notification = (props) => {
  const { store, dispatch } = useGlobalState();
  const { notificationMsg } = store;
  const { open, desktop} = props;

  function handleClick(event) {
    event.preventDefault();
    dispatch({ type: "setNotification", data: "" });
  }

  useEffect(() => {
    if (notificationMsg) {
      setTimeout(() => {
        dispatch({ type: "setNotification", data: "" });
      }, 4000);
    }
  }, [notificationMsg, dispatch]);

  return (
    <>
      <NotificationContainer active={!!notificationMsg} open={open} desktop={desktop} >
        {notificationMsg && (
          <>
            <span></span>
            <h3 style={{ zIndex: 20 }}>{notificationMsg}</h3>
            <button onClick={handleClick}>
              <CancelIcon style={{ color: "white" }} />
            </button>
          </>
        )}
      </NotificationContainer>
    </>
  );
};

export default Notification;
