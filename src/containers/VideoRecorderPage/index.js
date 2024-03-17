import React from "react";
import { useSelector } from "react-redux";
import { Container } from "@mui/system";
import AdSense from "react-adsense";

import { mainStyle } from "../styles";
import Header from "../../components/VideoRec/Header";
import Translate from "../../components/VideoRec/Translate";
import Recorder from "../../components/VideoRec/Recorder";
import StreamRecorder from "../../components/StreamRecorder";

const VideoRecorderPage = () => {
  React.useEffect(() => {
    console.warn("VideoRecorderPage Loaded..");
  }, []);

  // const langageSelected = useSelector((state) => state?.VideoRecReducer?.langageSelected)

  return (
    <Container style={mainStyle}>
      {/* <Header />        */}
      {/* <Translate /> */}
      <Recorder />
      {/* <StreamRecorder /> */}
      <AdSense.Google
        client="ca-pub-4132517034655732"
              slot="5629399846"
              style={{ width: 500, height: 300, float: 'left' }}      
      />
    </Container>
  );
};

export default VideoRecorderPage;
