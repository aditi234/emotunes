import { React, useState, useContext, useEffect, useRef } from "react";
import * as faceapi from "face-api.js";
import axios from "axios";
import {AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

import { UserContext } from "./UserContext";
import Error from "./Error";
import SideNav from './SideNav';
import UserProfile from "./UserProfile";
import AudioPlayer from "./SongBar/AudioPlayer";

import './../css/Scan.css';

function Scan() {
    const {userValue, songId} = useContext(UserContext);
    const [user, setUser] = userValue;
    const [singleSong, setSingleSong] = songId;
    const [songs, setSongs] = useState([]);
    // const [emotion, setEmotion] = useState('');

    const [modelsLoaded, setModelsLoaded] = useState(false);
    const [captureVideo, setCaptureVideo] = useState(false);

    const videoRef = useRef();
    const videoHeight = 480;
    const videoWidth = 640;
    const canvasRef = useRef();
    const emotion = useRef();
    const map_emotion = (emotion) => {
      if(emotion === "HAPPY" || emotion === "SAD" || emotion === "ANGRY") return emotion;
      else if(emotion === "SURPRISED") return "SURPRISE";
      else if(emotion === "FEARFUL") return "FEAR";
      else return "NEUTRAL";
    }

    const selectSong = (song) => {
      setSingleSong(() => song);
    }

    useEffect(() => {
        const loadModels = async () => {        
            Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
                faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
                faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
                faceapi.nets.faceExpressionNet.loadFromUri("/models")
            ]).then(setModelsLoaded(true));
        };
        loadModels();   
    }, []);

    const startVideo = () => {
        setCaptureVideo(true);
        navigator.mediaDevices
          .getUserMedia({ video: { width: 300 } })
          .then((stream) => {
            let video = videoRef.current;
            video.srcObject = stream;
            video.play();
            setTimeout(closeWebcam, 4000);
          })
          .catch((err) => {
            console.error("error:", err);
          });
      };
    
      function getMaxValueKey(obj) {
        return Object.keys(obj).reduce((a, b) => (obj[a] > obj[b] ? a : b));
      }
    
      const handleVideoOnPlay = () => {
        setInterval(async () => {
          if (canvasRef && canvasRef.current) {
            canvasRef.current.innerHTML = faceapi.createCanvas(videoRef);
            const displaySize = {
              width: videoWidth,
              height: videoHeight
            };
    
            faceapi.matchDimensions(canvasRef.current, displaySize);
    
            const detections = await faceapi
              .detectAllFaces(
                videoRef.current,
                new faceapi.TinyFaceDetectorOptions()
              )
              .withFaceLandmarks()
              .withFaceExpressions();
            if(detections[0] && detections[0].expressions) {
              // console.log(detections[0].expressions)
              // setEmotion(() => getMaxValueKey(detections[0].expressions));
              emotion.value = getMaxValueKey(detections[0].expressions);
            }
            const resizedDetections = faceapi.resizeResults(
              detections,
              displaySize
            );
    
            canvasRef &&
              canvasRef.current &&
              canvasRef.current
                .getContext("2d")
                .clearRect(0, 0, videoWidth, videoHeight);
            canvasRef &&
              canvasRef.current &&
              faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
            canvasRef &&
              canvasRef.current &&
              faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
            canvasRef &&
              canvasRef.current &&
              faceapi.draw.drawFaceExpressions(
                canvasRef.current,
                resizedDetections
              );
          }
        }, 500);
      };
    
      const closeWebcam = () => {
        getSongsByEmotion();
        videoRef.current.pause();
        videoRef.current.srcObject.getTracks()[0].stop();
        setCaptureVideo(false);
      };
      
    const getSongsByEmotion = () =>{
      axios.get('/v1/songs/emotion', {
          params: {
              user_id: user.sub,
              emotion: map_emotion(emotion.value.toUpperCase()),
              offset: 0
          }
      })
      .then(res => {
          if(res.error) {
              alert(res.error);
          } else {
              setSongs(res.data);
          }
      })
    }
    
    const toggleLike = async (song_Id) => {
        await axios.post('/v1/song_player/toggle_like/', null ,{
            params: {
                user_id: user.sub,
                song_id: song_Id
            }
        })
        .then((res)=> {
            if(res.error) {
                alert(res.error)
            } else {
                const newData = songs.map(song => {
                  if(song.songId === song_Id) {
                      song.liked = !song.liked
                  }
                  return song;
              });
              setSongs(newData);
            }
        })
    }

    return !user ? (
        <div>
            <SideNav user={user}/>
            <Error />
        </div>
    ) : (
        <div>
            <SideNav user={user}/>
            <div className='scan'>
                <div className='header'>
                    <h2>Scan</h2>
                    <UserProfile user={user} />
                </div>
            <div style={{ textAlign: "center", padding: "10px" }}>
                {captureVideo && modelsLoaded ? (
                <button
                    onClick={closeWebcam}
                    className="scan-button"
                >
                    Close Webcam
                </button>
                ) : (
                <button
                    onClick={startVideo}
                    className="scan-button"
                >
                    Open Webcam
                </button>
                )}
            </div>
            {captureVideo ? (
                modelsLoaded ? (
                <div>
                    <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        padding: "10px"
                    }}
                    >
                    <video
                        ref={videoRef}
                        height={videoHeight}
                        width={videoWidth}
                        onPlay={handleVideoOnPlay}
                        style={{ borderRadius: "10px" }}
                    />
                    <canvas ref={canvasRef} style={{ position: "absolute" }} />
                    </div>
                </div>
                ) : (
                <div>loading...</div>
                )
            ) : (
              <div className='songs-by-emotion'>
                {
                    songs.map((song, index) =>{
                        return(
                            <div className="song-playlist">
                                <button onClick={()=> toggleLike(song.songId)}>
                                    {
                                        song.liked ? <AiFillHeart className="like-icon" size={25}/> :
                                        <AiOutlineHeart className="like-icon" size={25}/> 
                                    }
                                </button>
                                <button className="song-name" onClick={() => selectSong(song)}>
                                    <div className="song-info">
                                        <h4>{song.title}</h4>
                                        <h4 className="artist">{song.artist}</h4>
                                    </div> 
                                </button> 
                            </div>
                        )
                    })
                }
            </div>
            )}
            </div>
            <AudioPlayer />
        </div>
    );
}

export default Scan;
