import React from "react";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux'
import { ReactMic } from 'react-mic';
import { forEach, get } from 'lodash';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import StartRecButton from '../StartRecButton'
import { recorderStyle } from "./styles";
import { startTimer, stopTimer } from "../../../store/VideoRec/reducer";
import { initSpeechRecognition, stopSpeechRecognition, getSpeechRecognition } from "../../../utils/speechRecognition";

import { SUB_COLOR, MAIN_COLOR } from "../../../containers/constants";

export const RecoderComponent = () => {
    const dispatch = useDispatch();
    const timerStarted = useSelector((state) => state?.VideoRecReducer?.timerStarted)
    const [recStart, setRecStart] = React.useState()
    navigator.mediaDevices.getUserMedia({ audio: true, video: false });

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

    console.warn(`transcript:`, transcript)
    console.warn(`listening:`, listening)

    const onStop = () => {
        SpeechRecognition.stopListening();
    }

    const onData = (recordedBlob) => { }

    const startRecording = () => {
        try {
            if (!recStart) {
                SpeechRecognition.startListening({ language: 'te', continuous: true, interimResults: true })
                dispatch(startTimer())
                setRecStart(true)
                return;
            }

            dispatch(stopTimer())
            setRecStart(false)
        } catch (e) {
            console.warn(`ERR:`, e)
        }
    }

    return (
        <Container sx={recorderStyle}>
            <Box sx={{padding: 0}}>
                <span>{`listening: ${listening}`}</span>
                <span>{transcript ?? '</>'}</span>
            </Box>
            <ReactMic
                record={timerStarted}
                className="sound-wave"
                mimeType="audio/mp3"
                noiseSuppression={true}
                echoCancellation={true}
                onStop={onStop}
                onData={onData}
                strokeColor={SUB_COLOR}
                backgroundColor={MAIN_COLOR} />
            <StartRecButton startRecording={startRecording} />            
        </Container>
    )
}

export default RecoderComponent;