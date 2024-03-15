import axios from 'axios';
import axiosThrottle from 'axios-request-throttle';
import { LANG_DEF } from "../containers/constants";

axiosThrottle.use(axios, { requestsPerSecond: 10 });

const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
export const gTranslate = (base64Audio) => {
    return new Promise(async (resolve) => {
        const response = await axios.post(
            `https://speech.googleapis.com/v1/speech:recognize?key=${apiKey}`,
            {
              config: {
                audioChannelCount: 1,
                encoding: 'WEBM_OPUS',
                sampleRateHertz: 48000,
                languageCode: LANG_DEF,
                enableAutomaticPunctuation: true,
                enableSpokenPunctuation: true,
                enableWordTimeOffsets: true,
                useEnhanced: true
              },
              audio: {
                content: base64Audio,
              },
            }
        );
        
        resolve(response);
    })
}