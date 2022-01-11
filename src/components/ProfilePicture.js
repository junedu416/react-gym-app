import { useGlobalState } from "../config/globalStore"
import { NotificationContainer } from "../styled-components/notification";
import CancelIcon from '@mui/icons-material/Cancel';
import { useEffect } from "react";

export const ProfilePicture = () => {
    const {store, dispatch} = useGlobalState();
    const {notificationMsg} = store;

    return (
        <ProfileImage />
    )

}