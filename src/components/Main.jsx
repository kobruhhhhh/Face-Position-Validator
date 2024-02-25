import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as faceapi from 'face-api.js';
import './Main.css';

function Main() {
  const videoRef = useRef();
  const canvasRef = useRef();
  const navigate = useNavigate();; // Use useHistory hook for navigation
  let intervalId;

  useEffect(() => {
    startVideo();
    loadModels();
  }, []);


  const startVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((currentStream) => {
        videoRef.current.srcObject = currentStream;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadModels = () => {
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
      faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
      faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
      faceapi.nets.faceExpressionNet.loadFromUri("/models")
    ]).then(() => {
      faceMyDetect();
    });
  };

  const faceMyDetect = () => {
    intervalId = setInterval(async () => {
      const detections = await faceapi.detectAllFaces(videoRef.current,
        new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();

      canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(videoRef.current);
      faceapi.matchDimensions(canvasRef.current, {
        width: 940,
        height: 650
      });

      const resized = faceapi.resizeResults(detections, {
        width: 940,
        height: 650
      });

      faceapi.draw.drawDetections(canvasRef.current, resized);
      faceapi.draw.drawFaceLandmarks(canvasRef.current, resized);
      faceapi.draw.drawFaceExpressions(canvasRef.current, resized);

      // Check if face is detected and if it's neutral, then redirect to Home component
      if (detections.length > 0 && detections[0].expressions.neutral > 0.5) {
        clearInterval(intervalId);
        setTimeout(() => {
            navigate('/home'); // Navigate to Home component after a delay
          }, 2000); // Navigate to Home component
      }
    }, 1000);
  };

  return (
    <div className="myapp">
      <h1>Face Position Validator</h1>
      <div className="appvideo">
        <video crossOrigin="anonymous" ref={videoRef} autoPlay></video>
      </div>
      <canvas ref={canvasRef} width="940" height="650" className="appcanvas" />
    </div>
  );
}

export default Main;
