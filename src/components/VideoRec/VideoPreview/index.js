import React from "react";
import Container from '@mui/material/Container';

import { MAIN_COLOR } from "../../../containers/constants";
import { useSelector } from 'react-redux'

const VideoPreview = ({ liveVideoFeed }) => {
    const timerStarted = useSelector((state) => state?.VideoRecReducer?.timerStarted)

    const videoStyle = {
        bgcolor: MAIN_COLOR,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center'
    }
    return (
        <Container sx={videoStyle}>
            <video ref={liveVideoFeed} autoPlay className="live-player" />
        </Container>
    )
}

export default VideoPreview;