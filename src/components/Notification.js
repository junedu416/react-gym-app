import { useGlobalState } from "../config/globalStore"

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
            <div>
                <h3>{notificationMsg}</h3>
                <button onClick={handleClick}>Dismiss</button>
            </div>
        }
        </>
    )
}