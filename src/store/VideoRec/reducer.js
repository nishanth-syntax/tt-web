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
        recordingStart: (state) => {
            state.recIsPlaying = true
        },
        recordingStop: (state) => {
            state.recIsPlaying = false
        },
    }
})

export const { languageSet, languageClear } = videoRecorderSlice.actions
export default videoRecorderSlice.reducer