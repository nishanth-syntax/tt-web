import React from "react";
import Container from '@mui/material/Container';
import { useSelector } from 'react-redux'

import { timerStyle } from './styles'
import ShowTimer from './ShowTimer'
// import WaitingScreen from './WaitingScreen'

const TimerComponent = () => {
    const timerStarted = useSelector((state) => state?.VideoRecReducer?.timerStarted) 

    return (
        <Container sx={timerStyle} >
            <ShowTimer />
        </Container>
    )
}

export default TimerComponent;