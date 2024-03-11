import { configureStore } from '@reduxjs/toolkit'
import VideoRecReducer  from './VideoRec/reducer'

export const store = configureStore({
    reducer: {
        VideoRecReducer,
    },
})