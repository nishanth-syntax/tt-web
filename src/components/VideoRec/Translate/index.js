import React from "react";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useSelector } from 'react-redux'

import { translateStyle } from "./styles";
import { SUB_COLOR } from "../../../containers/constants";

export const TranslateComponent = () => {
    const transcriptionText = useSelector((state) => state?.VideoRecReducer?.transcriptionText)
    console.warn(`transcriptionText:`, transcriptionText?.split(' | '))

    return (
        <Container sx={translateStyle}>
            <Box sx={{
                width: '100%',
                maxWidth: 360,                
                position: 'relative',
                overflow: 'auto',
                maxHeight: 300,
                '& ul': { padding: 1 },
            }}>
                <nav aria-label="main mailbox folders">
                    <List>
                        {transcriptionText?.split(' | ')?.map((element, index) => {
                            return (
                                <ListItem key={index} disablePadding>
                                    <ListItemText sx={{ color: SUB_COLOR, fontSize: 30 }} primary={element} />
                                </ListItem>)
                        })}
                    </List>
                </nav>
                {/* {transcriptionText} */}
            </Box>
        </Container>
    )
}

export default TranslateComponent;