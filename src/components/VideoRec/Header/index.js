import React from "react";
import Container from '@mui/material/Container';

import TimerDisplay from '../Timer/TimerDisplay'

import { headerStyle } from "./styles";

export const HeaderComponent = () => {
    return (
        <Container sx={headerStyle}>
            <TimerDisplay expiryTimestamp={16} />
        </Container>
    )
}

export default HeaderComponent;