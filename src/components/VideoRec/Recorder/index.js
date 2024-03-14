import React from "react";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux'
import { ReactMic } from 'react-mic';
import { forEach, get } from 'lodash';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import StartRecButton from '../StartRecButton'
import { recorderStyle } from "./styles";
import { startTimer, stopTimer, setTranscription, clearTranscription } from "../../../store/VideoRec/reducer";
import { initSpeechRecognition, stopSpeechRecognition, getSpeechRecognition } from "../../../utils/speechRecognition";

import { SUB_COLOR, MAIN_COLOR, DEF_COLOR, LANG_DEF, SAMPLE_GIBBERISH } from "../../../containers/constants";

export const RecoderComponent = () => {
    const scrollRef = React.useRef();
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

    const onStop = () => {
        SpeechRecognition.stopListening();
    }

    const onData = (recordedBlob) => {
        console.warn(`onData:`, transcript);
        // // if(transcript?.length > 0) dispatch(setTranscription(transcript))
        // if (scrollRef.current) {
        //     scrollRef.current.scrollIntoView?.({ behaviour: "smooth" });
        // }
    }


    const startRecording = () => {
        try {
            if (!recStart) {
                SpeechRecognition.startListening({ language: LANG_DEF, continuous: true, interimResults: true })
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

    const clickToCopy = () => {
        navigator.clipboard.writeText(transcript)
    }

    return (
        <Container sx={recorderStyle}>
            <Button sx={{display: transcript?.length > 0 ? 'flex' : 'none', padding: 5}} color="info" onClick={clickToCopy}>
                Click to Copy Text
            </Button>
            <Box sx={{
                display: 'flex',
                width: '100%',
                padding: 5,
                overflow: 'auto',
                width: '100%',
                height: 800,
                backgroundColor: MAIN_COLOR,
                alignContent: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                '& ul': { padding: 1 },
            }}>
                <List ref={scrollRef}>
                    <span>
                        {`${transcript}`}
                    </span>
                </List>
            </Box>
            <Box sx={{ position: 'absolute', bottom: 0 }}>
                <ReactMic
                    record={timerStarted}
                    visualSetting="sinewave"
                    mimeType="audio/mp3"
                    noiseSuppression={true}
                    echoCancellation={true}
                    onStop={onStop}
                    onData={onData}
                    strokeColor={timerStarted ? MAIN_COLOR : SUB_COLOR}
                    backgroundColor={MAIN_COLOR}
                    bitRate={256000}
                    sampleRate={96000}
                    timeSlice={3000} />
            </Box>
            <Box sx={{ display: 'flex', alignContent: 'center', alignItems: 'center', justifyContent: 'center', }}>
                <StartRecButton startRecording={startRecording} />
            </Box>


        </Container>
    )
}

export default RecoderComponent;