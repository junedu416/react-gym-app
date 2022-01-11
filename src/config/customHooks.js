import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalState } from './globalStore';

export function useRedirectUnauthorisedUser() {
    const {dispatch} = useGlobalState();
    const navigate = useNavigate();
    useEffect(() => {
        if (!checkIfUserIsSaved()) {
          dispatch({type: "setNotification", data: "You must be logged in to view this page"})
          navigate("/auth/login")
        }
        return
      }, [dispatch, navigate])
}

export function useRedirectNonStaffMembers() {
    const {store, dispatch} = useGlobalState();
    const navigate = useNavigate();
    const {profile} = store;
    useEffect(() => {
        if (!profile) {
          dispatch({type: "setNotification", data: "You must be logged in to view this page"})
          navigate("/auth/login")
        } else if(!profile.isStaff) {
            dispatch({type: "setNotification", data: "You are not authorised to access thia page"})
            navigate(-1)
        }
        return
      }, [profile, dispatch, navigate])
}

function checkIfUserIsSaved() {
  const uid = window.localStorage.getItem('uid');
  return !!uid;
}
