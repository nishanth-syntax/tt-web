import React from "react";
import Box from '@mui/material/Box';

import { recButtonStyle } from './styles';

const StartRecButton = ({startRecording}) => (
    <Box
        onClick={startRecording}
        sx={recButtonStyle}
    />
)

export default StartRecButton;