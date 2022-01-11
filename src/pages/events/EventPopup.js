import React, { useState, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import { showEventReducer } from "../../utils/showEvent-reducer";
import BasicButton from "../../components/buttons/BasicButton";
import { useGlobalState } from "../../config/globalStore";
import { editEvent } from "../../services/eventsServices";
import {
  cancelUserRegistration,
  isUserRegistered,
  registerUserToEvent,
} from "../../utils/events-helper-functions";
import { DateDisplay } from "./DateDisplay";
import { PopupCard } from "../../components/PopupCard";

export const EventPopup = ({
  open,
  setOpen,
  event,
  setEvent,
  dispatchEventsVars,
}) => {
  const { store, dispatch } = useGlobalState();
  const { profile } = store;
  const navigate = useNavigate();
  const [confirmMessage, setConfirmMessage] = useState("");
  const [userIsRegistered, setUserIsRegistered] = useState(false);

  const initialEventDates = {
    startDate: null,
    startTime: null,
    endDate: null,
    endTime: null,
    isFinished: false,
  };
  const [eventDates, dispatchEventDates] = useReducer(
    showEventReducer,
    initialEventDates
  );

  useEffect(() => {
    if (event) {
      dispatchEventDates({
        type: "setEventTimes",
        data: {
          startTime: event.startTime,
          endTime: event.endTime,
        },
      });
      const userIsRegistered = isUserRegistered(profile, event.registeredUsers);
      setUserIsRegistered(userIsRegistered);
    }
  }, [event, profile]);

  const handleClose = () => {
    setOpen(false);
    setEvent(null);
  };

  const bookClass = (e) => {
    e.preventDefault();
    setConfirmMessage("confirm");
  };

  const cancelBooking = (e) => {
    e.preventDefault();
    setConfirmMessage("cancel");
  };

  const navigateToShowPage = (e) => {
    navigate(`./${event._id}`);
  };

  const updateEvent = (columnsToUpdate, message) => {
    const updatedEvent = {
      ...event,
      ...columnsToUpdate,
    };
    console.log("updated event object is: ", updatedEvent);
    editEvent(event._id, updatedEvent)
      .then((response) => {
        console.log(`successfully updates event: `, response);
        dispatchEventsVars({ type: "updateSingleEvent", data: response });
      })
      .then(() => {
        dispatch({ type: "setNotification", data: message });
        setEvent(null);
        setOpen(false);
      })
      .catch((e) => console.log(e));
  };

  const registerToEvent = (e) => {
    registerUserToEvent(event, profile._id, updateEvent);
  };

  const cancelRegistration = (e) => {
    cancelUserRegistration(event, profile._id, updateEvent);
  };

  function determineColor(category) {
    if (category === "Class") return "success";
    else if (category === "Personal Training") return "warning";
    else if (category === "Competition") return "error";
    else return "primary";
  }

  return (
    <>
      {event && (
        <PopupCard open={open} handleClose={handleClose}>
          <Typography
            id="booking-confirmation-title"
            variant="h5"
            fontWeight="bold"
            component="h2"
          >
            {event.name}
          </Typography>
          <Typography id="booking-confirmation-description" sx={{ my: 3 }}>
            <p>
              <Chip
                label={event.category}
                color={determineColor(event.category)}
                variant="outlined"
              />
            </p>
            <DateDisplay formatDates={eventDates} />
          </Typography>
          {!eventDates.isFinished && (
            <>
              {!userIsRegistered && (
                <>
                  {event.category === "Competition" ? (
                    <BasicButton
                      text="Register"
                      btnFunction={bookClass}
                    />
                  ) : (
                    <>
                      {profile._id !== event.createdBy && (
                        <BasicButton
                          text="Join"
                          btnFunction={bookClass}
                        />
                      )}
                    </>
                  )}
                </>
              )}
              {userIsRegistered && (
                <BasicButton
                  text="Cancel Registration"
                  color="success"
                  size="medium"
                  btnFunction={cancelBooking}
                />
              )}
            </>
          )}

          <BasicButton
            text="More Details"
            color="secondary"
            size="medium"
            btnFunction={navigateToShowPage}
          />
          {confirmMessage && (
            <div>
              <p>Are you sure?</p>
              {confirmMessage === "confirm" && (
                <BasicButton
                  text="Confirm"
                  size="medium"
                  btnFunction={registerToEvent}
                />
              )}
              {confirmMessage === "cancel" && (
                <BasicButton
                  text="Cancel"
                  color="error"
                  btnFunction={cancelRegistration}
                />
              )}
            </div>
          )}
        </PopupCard>
      )}
    </>
  );
};
