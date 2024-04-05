import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  MeetingProvider,
  useMeeting,
  useParticipant,
  Constants,
} from "@videosdk.live/react-sdk";
import ReactPlayer from "react-player";
import Hls from "hls.js";
import ParticipantView from './ParticipantView';
import Controls from "./Controls";
export default function SpeakerView() {
    const [joined, setJoined] = useState(null);
    //Get the method which will be used to join the meeting.
    //We will also get the participant list to display all participants
    const { participants } = useMeeting();
    const mMeeting = useMeeting({
      onMeetingJoined: () => {
        setJoined("JOINED");
        //we will pin the local participant if he joins in CONFERENCE mode
        if (mMeetingRef.current.localParticipant.mode == "CONFERENCE") {
          mMeetingRef.current.localParticipant.pin();
        }
      },
  });
  //We will create a ref to meeting object so that when used inside the
  //Callback functions, meeting state is maintained
  const mMeetingRef = useRef(mMeeting);
  useEffect(() => {
    mMeetingRef.current = mMeeting;
  }, [mMeeting]);
  //Filtering the host/speakers from all the participants
  const speakers = useMemo(() => {
    const speakerParticipants = [...participants.values()].filter(
      (participant) => {
        return participant.mode == Constants.modes.CONFERENCE;
      }
    );
    return speakerParticipants;
  }, [participants]);
  return (
    <div className="container">
      {joined && joined == "JOINED" ? (
        <div>
          {speakers.map((participant) => (
            <ParticipantView
              participantId={participant.id}
              key={participant.id}
            />
          ))}
          <Controls />
        </div>
      ) : (
        <p>Joining the meeting...</p>
      )}
    </div>
  );
}