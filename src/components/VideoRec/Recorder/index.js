import React from "react";
import Container from '@mui/material/Container';
import { useDispatch, useSelector } from 'react-redux'
import { ReactMic } from 'react-mic';
import { forEach, get } from 'lodash';

import StartRecButton from '../StartRecButton'
import { recorderStyle } from "./styles";
import { startTimer, stopTimer } from "../../../store/VideoRec/reducer";
import { initSpeechRecognition, stopSpeechRecognition, getSpeechRecognition } from "../../../utils/speechRecognition";

import { SUB_COLOR, MAIN_COLOR } from "../../../containers/constants";

export const RecoderComponent = () => {
    const dispatch = useDispatch();    
    const timerStarted = useSelector((state) => state?.VideoRecReducer?.timerStarted)
    const [recStart, setRecStart] =  React.useState()

    React.useEffect(() => {
        initSpeechRecognition(`te`);
    }, [])

    const onStop = (recordedBlob) => {
        stopSpeechRecognition();
    }

    const getRecognition = (txData) => {
        const txResults = get(txData, `results`);
        Object.keys(txResults).forEach((key) => {
            const txObj = txResults?.[key];     
            console.warn(txObj?.[0]?.transcript);
        })
        // txResults.forEach(element => {
        //     const txObj = element?.[0];       
        //     const { transcript } = txObj;
        //     console.warn(`transcript:`, transcript) 
        // });        
    }

    const onData = (recordedBlob) => {}

    const startRecording = () => {
        if (!recStart) {
            dispatch(startTimer())
            getSpeechRecognition(getRecognition);    
            setRecStart(true)
            return;
        }

        dispatch(stopTimer())
        stopSpeechRecognition();
        setRecStart(false)
    }

    return (
        <Container sx={recorderStyle}>
            <ReactMic
                record={timerStarted}
                className="sound-wave"
                mimeType="audio/mp3"
                onStop={onStop}
                onData={onData}
                strokeColor={SUB_COLOR}
                backgroundColor={MAIN_COLOR} />
            <StartRecButton startRecording={startRecording} />
        </Container>
    )
}

export default RecoderComponent;