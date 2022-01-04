import { useGlobalState } from "../config/globalStore"
import { NotificationContainer } from "../styled-components/notification";

const Notification = () => {
    const {store, dispatch} = useGlobalState();
    const {notificationMsg} = store;

    function handleClick(event) {
        event.preventDefault();
        dispatch({type: "setNotification", data: ""});
    }

    return (
        <>
        {
            notificationMsg &&
            <NotificationContainer>
                <h3>{notificationMsg}</h3>
                <button onClick={handleClick}>Dismiss</button>
            </NotificationContainer>
        }
        </>
    )
}

export default Notification