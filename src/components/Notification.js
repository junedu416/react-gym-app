import { useGlobalState } from "../config/globalStore"
import { NotificationContainer } from "../styled-components/notification";
import CancelIcon from '@mui/icons-material/Cancel';

const Notification = () => {
    const {store, dispatch} = useGlobalState();
    const {notificationMsg} = store;

    function handleClick(event) {
        event.preventDefault();
        dispatch({type: "setNotification", data: ""});
    }

    return (
        <>
        <NotificationContainer active={!!notificationMsg}>
            {
                notificationMsg 
                && 
                <>
                <h3>{notificationMsg}</h3>
                <button onClick={handleClick}><CancelIcon style={{color: "white"}}/></button>
                </>
            }
        </NotificationContainer>
        </>
    )
}

export default Notification