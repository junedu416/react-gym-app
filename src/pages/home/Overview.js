import React, { useEffect, useState } from "react";
import { CardStyle } from "../../styled-components/dashboard.js";
import { Container, Grid, Heading, MainWindow } from "../../styled-components";
import { useGlobalState } from "../../config/globalStore.js";
import CheckInWidget from "../../widgets/CheckInWidget.js";
import ReportWidget from "../../widgets/ReportWidget";
import { useRedirectUnauthorisedUser } from "../../config/customHooks.js";
import { getAllEvents } from "../../services/eventsServices.js";
import { convertTimeToAcceptedFormat } from "../../utils/events-helper-functions.js";
import { UpcomingEventsWidget } from "../../widgets/UpcomingEventsWidget";
import { UpcomingCompsWidget } from "../../widgets/UpcomingCompsWidget.js";
import { StaffEventsWidget } from "../../widgets/StaffEventsWidget.js";

import useMediaQuery from "@mui/material/useMediaQuery";

export const Overview = (props) => {
  useRedirectUnauthorisedUser();
  const { store } = useGlobalState();
  const { profile } = store;
  const [eventsList, setEventsList] = useState(null);
  // const [eventsList, dispatchEventsList] = useReducer(eventsReducer, {events: null})

  useEffect(() => {
    if (!eventsList) {
      getAllEvents()
        .then((response) => {
          console.log("fetched data");
          response.forEach((event) => {
            convertTimeToAcceptedFormat(event);
          });
          setEventsList(response);
        })
        .catch((error) => console.log(`error caught fetching events: `, error));
    }
  }, [eventsList]);

  const desktop = useMediaQuery("(min-width:1400px)");

  return (
    <Container>
      <Heading>Welcome back, {profile ? profile.firstName : "user"}</Heading>
      <Grid desktop>
        <CardStyle>
          <CheckInWidget />
        </CardStyle>
        {profile && profile.isStaff && (
          <CardStyle>
            <StaffEventsWidget events={eventsList} />
          </CardStyle>
        )}
        <CardStyle>
          <UpcomingEventsWidget events={eventsList} />
        </CardStyle>
        <CardStyle>
          <UpcomingCompsWidget events={eventsList} />
        </CardStyle>
        <CardStyle>
          <ReportWidget />
        </CardStyle>
        <CardStyle />
        <CardStyle />
      </Grid>
    </Container>
  );
};
