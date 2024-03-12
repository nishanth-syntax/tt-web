import SpeechRecognition from 'react-speech-recognition'

export const initSpeechRecognition = (langStr = 'te') => {
    SpeechRecognition.startListening({ language: langStr, continuous: true })    
  }

  export const stopSpeechRecognition = () => {
    SpeechRecognition.stopListening()
  }

  export const getSpeechRecognition = (getRecognition) => {
    const recTx = SpeechRecognition.getRecognition();
    recTx.addEventListener("result", getRecognition)
  }