import { createSlice } from '@reduxjs/toolkit'

import { DEF_TXT, LANG_DEF, VIDEO_REC_INIT_STATE } from './constants';

export const videoRecorderSlice = createSlice({
    name: 'videoRecorderSlice',
    initialState: VIDEO_REC_INIT_STATE,
    reducers: {
        languageSet: (state, action) => {
            state.langageSelected = action.payload.value
        },
        languageClear: (state) => {
            state.langageSelected = LANG_DEF
        },
        startTimer: (state) => {
            state.timerStarted = true
        },
        stopTimer: (state) => {
            state.timerStarted = false
        },
        setTranscription: (state, action) => {
            state.transcriptionText = action.payload.value  !==  state.transcriptionText ? `${state.transcriptionText} | ${action.payload.value}` : state.transcriptionText;
            // state.transcriptionText = action.payload.value;
        },
        clearTranscription: (state) => {
            state.transcriptionText = DEF_TXT
        },
    }
})

export const {
    languageSet,
    languageClear,
    startTimer,
    stopTimer,
    setTranscription,
    clearTranscription,
} = videoRecorderSlice.actions
export default videoRecorderSlice.reducer