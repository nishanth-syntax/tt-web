import React from "react";
import Container from '@mui/material/Container';
import { useDispatch, useSelector } from 'react-redux'

import StartRecButton from '../StartRecButton'
import VideoPreview from "../VideoPreview";
import { recorderStyle } from "./styles";
import { startTimer } from "../../../store/VideoRec/reducer";
import ProgressDisplay from '../Timer/Progress'

export const RecoderComponent = () => {
    const mimeType = "video/webm";
    const dispatch = useDispatch();
    const timerStarted = useSelector((state) => state?.VideoRecReducer?.timerStarted)

    const [permission, setPermission] = React.useState(false);
    const mediaRecorder = React.useRef(null);
    const liveVideoFeed = React.useRef(null);
    const [recordingStatus, setRecordingStatus] = React.useState("inactive");
    const [stream, setStream] = React.useState(null);
    const [videoChunks, setVideoChunks] = React.useState([]);
    const [audioChunks, setAudioChunks] = React.useState([]);
    const [audio, setAudio] = React.useState(null);
    const [recordedVideo, setRecordedVideo] = React.useState(null);

    const getCameraPermission = async () => {
        setRecordedVideo(null);
        if ("MediaRecorder" in window) {
            try {
                const videoConstraints = {
                    audio: false,
                    video: true,
                };
                const audioConstraints = { audio: true };
                // create audio and video streams separately
                const audioStream = await navigator.mediaDevices.getUserMedia(
                    audioConstraints
                );
                const videoStream = await navigator.mediaDevices.getUserMedia(
                    videoConstraints
                );
                setPermission(true);
                //combine both audio and video streams
                const combinedStream = new MediaStream([
                    ...videoStream.getVideoTracks(),
                    ...audioStream.getAudioTracks(),
                ]);
                setStream(combinedStream);
                //set videostream to live feed player
                if (liveVideoFeed.current) liveVideoFeed.current.srcObject = videoStream;
            } catch (err) {
                alert(err.message);
            }
        } else {
            alert("The MediaRecorder API is not supported in your browser.");
        }
    };

    React.useEffect(() => {
        getCameraPermission();
    }, [])

    const initRecording = () => {
        setRecordingStatus("recording");
        const media = new MediaRecorder(stream, { mimeType });
        mediaRecorder.current = media;
        mediaRecorder.current.start();
        let localVideoChunks = [];
        mediaRecorder.current.ondataavailable = (event) => {
            if (typeof event.data === "undefined") return;
            if (event.data.size === 0) return;
            localVideoChunks.push(event.data);
        };
        setVideoChunks(localVideoChunks);
    }

    const stopRecording = () => {
        setPermission(false);
        setRecordingStatus("inactive");
        mediaRecorder.current.stop();
        mediaRecorder.current.onstop = () => {
            const videoBlob = new Blob(videoChunks, { type: mimeType });
            const videoUrl = URL.createObjectURL(videoBlob);
            setRecordedVideo(videoUrl);
            setVideoChunks([]);
        };
    }

    const startRecording = () => {
        dispatch(startTimer())
    }

    return (
        <Container sx={recorderStyle}>
            <ProgressDisplay />
            <VideoPreview liveVideoFeed={liveVideoFeed} />             
            <StartRecButton startRecording={startRecording} />
        </Container>
    )
}

export default RecoderComponent;