import { useState, useRef, useEffect } from "react";
import "../styles/AudioPlayer.css";
import { BsArrowLeftShort } from "react-icons/bs";
import { BsArrowRightShort } from "react-icons/bs";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";

function AudioPlayer(props) {

    // State
    const [isPlaying, setIsPlaying] = useState(false); // set useState to false initially b/c we don't want audio to play automatically on page load
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    // References
    const audioPlayer = useRef(); // reference the Audio Player component

    useEffect(() => {
        const seconds = Math.floor(audioPlayer.current.duration);
        setDuration(seconds);
    }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]); 

    const calculateTime = (secs) => { // function to format duration in MM:SS format
        const minutes = Math.floor(secs / 60);
        const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const seconds = Math.floor(secs % 60);
        const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${returnedMinutes}:${returnedSeconds}`;
    }

    const togglePlayPause = () => {

        const prevValue = isPlaying;

        setIsPlaying(!prevValue); // toggles the isPlaying state to change which button icon is displayed
        if (!prevValue) {
            audioPlayer.current.play();
        } else {
            audioPlayer.current.pause();
        }
    }

    return(
        <div className="audioPlayer">
            {/* Audio play works, just need to find a good place to host my audio file */}
            <audio ref={audioPlayer} src="https://cdn.simplecast.com/audio/cae8b0eb-d9a9-480d-a652-0defcbe047f4/episodes/af52a99b-88c0-4638-b120-d46e142d06d3/audio/500344fb-2e2b-48af-be86-af6ac341a6da/default_tc.mp3" preload="metadata"></audio>
            <button className="forwardBackward">
                <BsArrowLeftShort /> 30
            </button>
            <button onClick={togglePlayPause} className="playPause">
                {isPlaying ? <FaPause /> : <FaPlay className="playButton" />} {/* Toggles which icon displays depending on whether or not audio is currently playing */}
            </button>
            <button className="forwardBackward">
                30 <BsArrowRightShort />
            </button>

            {/* Current Time */}
            <div className="currentTime">{calculateTime(currentTime)}</div>

            {/* Progress Bar */}
            <div>
                <input type="range" className="progressBar" defaultValue="0" />
            </div>

            {/* Duration */}
            <div className="duration">{(duration && !isNaN(duration)) && calculateTime(duration)}</div>

        </div>
    )
}

export { AudioPlayer };