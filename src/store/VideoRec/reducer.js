import { createSlice } from '@reduxjs/toolkit'

import { LANG_DEF, VIDEO_REC_INIT_STATE } from './constants';

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
    }
})

export const { languageSet, languageClear, startTimer, stopTimer } = videoRecorderSlice.actions
export default videoRecorderSlice.reducer