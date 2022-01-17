import React, { useEffect, useState } from "react";
import { CardStyle } from "../../styled-components/dashboard.js";
import { Container, Grid, Heading } from "../../styled-components";
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

export const Overview = () => {
  useRedirectUnauthorisedUser();
  const { store } = useGlobalState();
  const { profile } = store;
  const [eventsList, setEventsList] = useState(null);

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

  const laptop =  useMediaQuery("(min-width:1023px)");
  const desktop = useMediaQuery("(min-width:1400px)");

  return (
    <Container>
      <Heading>Welcome back, {profile ? profile.firstName : "user"}</Heading>
      <Grid desktop={desktop} laptop={laptop}>
        <CardStyle desktop>
          <CheckInWidget />
        </CardStyle>
        {profile && profile.isStaff && (
          <CardStyle desktop>
            <StaffEventsWidget events={eventsList} />
          </CardStyle>
        )}
        <CardStyle desktop>
          <UpcomingEventsWidget events={eventsList} />
        </CardStyle>
        <CardStyle desktop>
          <UpcomingCompsWidget events={eventsList} />
        </CardStyle>
        <CardStyle desktop>
          <ReportWidget />
        </CardStyle>
      </Grid>
    </Container>
  );
};
