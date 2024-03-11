import React from "react";
import Container from '@mui/material/Container';

import TimerComponent from '../Timer';
import { translateStyle } from "./styles";

export const TranslateComponent = () => {
    return (
        <Container sx={translateStyle}>
            <TimerComponent />
        </Container>
    )
}

export default TranslateComponent;