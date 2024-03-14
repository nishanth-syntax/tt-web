import SpeechRecognition from 'react-speech-recognition'

export const initSpeechRecognition = (langStr = 'te') => {
  SpeechRecognition.startListening({ language: langStr, continuous: true })
    .then((response) => {
      console.warn(`SpeechRecognition.startListening ACTIVE`)
    })
    .catch((ex) => {
      console.warn(`SpeechRecognition.startListening ex:`, ex)
    })
}

export const stopSpeechRecognition = () => {
  SpeechRecognition.stopListening()
}

export const getSpeechRecognition = (getRecognition) => {
  const recTx = SpeechRecognition.getRecognition();
  recTx?.addEventListener("result", getRecognition)
}