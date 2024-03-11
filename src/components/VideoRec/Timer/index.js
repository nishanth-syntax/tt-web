import React from "react";
import Container from '@mui/material/Container';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { useSelector } from 'react-redux'

import { timerStyle } from './styles'
import { DEF_COLOR, SUB_COLOR } from "../../../containers/constants";
import ShowTimer from './ShowTimer'

const TimerComponent = () => {
    const recIsPlaying = useSelector((state) => state?.VideoRecReducer?.recIsPlaying)
    console.warn(`recIsPlaying:`, recIsPlaying);
    
    return (
        <Container sx={timerStyle}>
            <CountdownCircleTimer
                isPlaying={recIsPlaying}
                trailColor={`${SUB_COLOR}60`}
                colors={[DEF_COLOR]}
                size={200}
                duration={15}
                trailStrokeWidth={1}
            >
                {({ remainingTime }) => (
                    <div style={{ display: 'table-row' }}>
                        {recIsPlaying && <ShowTimer />}
                    </div>
                )}
            </CountdownCircleTimer>
        </Container>
    )
}

export default TimerComponent;