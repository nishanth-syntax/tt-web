import React from "react";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import { ListItem } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux'
import { ReactMic } from 'react-mic';

import StartRecButton from '../StartRecButton'
import { recorderStyle } from "./styles";
import { startTimer, stopTimer, setTranscription } from "../../../store/VideoRec/reducer";
import { audioBlobToBase64 } from '../../../utils/audioBlobToBase64';
import { SUB_COLOR, MAIN_COLOR, DEF_COLOR, LANG_DEF, SAMPLE_GIBBERISH } from "../../../containers/constants";
import { gTranslate } from "../../../utils/googleSpeechAPI";
import { isEqual, map } from "lodash";


export const RecoderComponent = () => {
    const scrollRef = React.useRef();
    const dispatch = useDispatch();
    const timerStarted = useSelector((state) => state?.VideoRecReducer?.timerStarted)
    const transcriptionText = useSelector((state) => state?.VideoRecReducer?.transcriptionText)
    const [recStart, setRecStart] = React.useState()
    const [mediaRecorder, setMediaRecorder] = React.useState(null);
    const [chunkData, setChunkData] = React.useState([]);

    function onTranslate(audioBlob) {
        gTranslate(audioBlob)
            .then((response) => {
                if (response?.data?.results && response?.data?.results?.length > 0) {
                    const result = response.data.results[0].alternatives[0].transcript;
                    console.warn(`result:`, result);
                    if (result !== transcriptionText) dispatch(setTranscription({ value: result }))
                } else {
                    setTranscription('No transcription available');
                }
            })
    }

    const getLastTwo = (cArray) => {
        if (cArray?.length <= 1) {
            return cArray
        }

        if (cArray?.length > 1) {
            return [cArray[cArray.length - 2], cArray[cArray.length - 1]]
            // return [cArray[0], cArray[1]]
        }
    }

    function onDataFunc(recordedBlob) {
        if (!recordedBlob) return;

        let updatedChunk = chunkData;
        updatedChunk.push(recordedBlob)
        console.warn(`updatedChunk:`, updatedChunk)
        setChunkData([recordedBlob]);
        const blob = new Blob(updatedChunk, { type: mediaRecorder?.mimeType });
        audioBlobToBase64(blob)
            .then((response) => {
                onTranslate(response);
            })
    }

    const startRecording = async () => {
        try {
            if (!recStart) {
                const stream = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video: false,
                });
                const recorder = new MediaRecorder(stream);
                recorder.start(5000);
                recorder.addEventListener('dataavailable', async (event) => {
                    const audioBlob = event.data;
                    onDataFunc(audioBlob);
                })

                setMediaRecorder(recorder);
                dispatch(startTimer())
                setRecStart(true)
                return;
            }

            onStop();
        } catch (e) {
            console.warn(`ERR:`, e)
        }
    }

    const onStop = (e) => {
        dispatch(stopTimer())
        setRecStart(false);
        if (mediaRecorder) {
            mediaRecorder.stop();
            mediaRecorder.removeEventListener('dataavailable');
            console.log('Recording stopped');
        }
    }

    const clickToCopy = () => {
        navigator.clipboard.writeText(transcriptionText)
    }

    const txtArray = transcriptionText?.split(' | ');
    return (
        <Container sx={recorderStyle}>
            <Button sx={{ display: transcriptionText?.length > 0 ? 'flex' : 'none', padding: 5, color: SUB_COLOR }} color="info" onClick={clickToCopy}>
                Click to Copy Text
            </Button>
            <Box sx={{
                display: 'flex',
                width: '100%',
                padding: 5,
                overflow: 'auto',
                width: '100%',
                height: 800,
                backgroundColor: `${SUB_COLOR}05`,
                alignContent: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                '& ul': { padding: 1 },
            }}>
                <List ref={scrollRef}>                 
                    {map(txtArray, (value, index) => <ListItem key={`ListItem-${index}`}><span style={{ fontSize: 22, padding: 0 }}>{`${value}`}</span></ListItem>)}                    
                </List>
            </Box>
            <Box sx={{ position: 'absolute', top: 10 }}>
                <ReactMic
                    record={timerStarted}
                    className="sound-wave"
                    visualSetting="sinewave"
                    mimeType="audio/mp3"
                    noiseSuppression={true}
                    echoCancellation={true}
                    onStop={onStop}
                    // onData={onDataFunc}
                    strokeColor={timerStarted ? MAIN_COLOR : SUB_COLOR}
                    backgroundColor={MAIN_COLOR}
                />
            </Box>
            <Box sx={{ display: 'flex', alignContent: 'center', alignItems: 'center', justifyContent: 'center', }}>
                <StartRecButton startRecording={startRecording} />
            </Box>


        </Container>
    )
}

export default RecoderComponent;