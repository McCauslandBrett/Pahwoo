import React from "react";
import { Audio } from "expo-av";
import PropTypes from "prop-types";
import Button from "./Button";

export default function Audio() {
  const [isRecording, setRecording] = React.useState(false);
  const [recordingInstance, setRecordingInstance] = React.useState(null);
  const [URI, setURI] = React.useState(null);
  const record = async () => {
    if (isRecording) {
      return;
    }

    try {
      const { granted } = await Audio.requestPermissionsAsync();
      if (granted) {
        const recording = new Audio.Recording();
        await recording.prepareToRecordAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        );
        const uri = await recording.getURI();
        await recording.startAsync();
        setRecording(true);
        setRecordingInstance(recording);
        setURI(uri);
      } // else do nothing for now
    } catch (e) {
      // TODO: display notification here
      console.log(e);
    }
  };

  const play = async () => {
    // docs: https://docs.expo.io/versions/latest/sdk/audio/
    // do something with the URI
  };

  const stopRecording = async () => {
    if (isRecording) {
      try {
        await recordingInstance.stopAndUnloadAsync();
        setRecording(false);
      } catch (e) {
        // TODO: display notification here
        console.log(e);
      }
    }
  };

  return (
    <Button onClick={isRecording ? stopRecording : record}>
      Click to record audio
    </Button>
  );
}
