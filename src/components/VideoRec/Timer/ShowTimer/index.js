import React from "react";
import Container from '@mui/material/Container';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { useSelector, useDispatch } from 'react-redux'

import StartRecButton from "../../StartRecButton";
import { SUB_COLOR, DEF_COLOR } from "../../../../containers/constants";
import { showTimerStyle } from './styles'
import { startTimer } from "../../../../store/VideoRec/reducer";

const ShowTimer = () => {
    const dispatch = useDispatch()
    const timerStarted = useSelector((state) => state?.VideoRecReducer?.timerStarted)

    const startRecording = () => {        
        dispatch(startTimer())
    }

    return (
        <Container onClick={startRecording}>
            <CountdownCircleTimer
                isPlaying={timerStarted}
                trailColor={`${DEF_COLOR}50`}
                colors={[SUB_COLOR]}
                size={100}
                duration={15}
                trailStrokeWidth={1}
                strokeWidth={8}
            >
                {({ remainingTime }) => (
                    <>{remainingTime}</>                    
                )}
            </CountdownCircleTimer>             
        </Container>
    )
}

export default ShowTimer;