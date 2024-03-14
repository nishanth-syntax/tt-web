import React from "react";
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux'

import { recButtonStyle } from './styles';
import { SUB_COLOR } from "../../../containers/constants";

const StartRecButton = ({ startRecording }) => {
    const timerStarted = useSelector((state) => state?.VideoRecReducer?.timerStarted)

    return (
        <Box onClick={startRecording} sx={recButtonStyle}>
            {!timerStarted && <span style={{position: 'absolute', bottom: 50, width: '200', textAlign: 'center'}}>{`START`}</span>}
        </Box>
    )
}

export default StartRecButton;