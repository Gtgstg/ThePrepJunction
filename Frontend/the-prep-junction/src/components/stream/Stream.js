import React, { useState } from "react";
import { Button, Container, Grid } from "@mui/material";
import {
  MeetingProvider,
  Constants,
} from "@videosdk.live/react-sdk";
import SpeakerView from "./SpeakerView";
import ViewerView from "./ViewerView";

const Stream = () => {
  const [mode, setMode] = useState(null);

  return (
    <Container maxWidth="sm">
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        style={{ height: "100vh" }}
      >
        <Grid item xs={12} container justifyContent="center">
          <Grid item>
            {mode ? (
              <MeetingProvider
                config={{
                  meetingId: "5kkf-4u84-k1se",
                  micEnabled: true,
                  webcamEnabled: true,
                  name: "Vishwajeet's Org",
                  mode,
                }}
                joinWithoutUserInteraction
                token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiI3NWJiNmJiMi1hNDVmLTQ2MGItYTUzYS1iNzNiZWRmMmIxYjUiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcxMjMyMzQ0NywiZXhwIjoxNzEyNDA5ODQ3fQ.wVW8OGu5fBTdDkv97Ger1tzxltie4d4XR6recIFpVi0"
    
              >
                {mode === Constants.modes.CONFERENCE ? (
                  <SpeakerView />
                ) : (
                  <ViewerView />
                )}
              </MeetingProvider>
            ) : (
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setMode(Constants.modes.CONFERENCE);
                  }}
                >
                  Join as Speaker
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ marginLeft: 12 }}
                  onClick={() => {
                    setMode(Constants.modes.VIEWER);
                  }}
                >
                  Join as Viewer
                </Button>
              </div>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Stream;
