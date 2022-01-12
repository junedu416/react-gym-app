import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserProfile } from '../services/userServices';
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

export function useRedirectNonStaffMembers(redirectRoute) {
    const {store, dispatch} = useGlobalState();
    const navigate = useNavigate();
    const {profile} = store;
    useEffect(() => {
        if (!checkIfUserIsSaved()) {
          dispatch({type: "setNotification", data: "You must be logged in to view this page"})
          navigate("/auth/login")
        } else {
          getUserProfile(window.localStorage.getItem('uid')).then((response) => {
            if (!response.isStaff) {
              dispatch({type: "setNotification", data: "You are not authorised to access this page"})
              navigate(redirectRoute)
            }
          }) 
        }
        return
      }, [profile, dispatch, navigate])
}

function checkIfUserIsSaved() {
  const uid = window.localStorage.getItem('uid');
  return !!uid;
}
