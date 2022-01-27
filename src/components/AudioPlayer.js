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
    const progressBar = useRef(); // reference to the Progress bar
    const animationRef = useRef(); // reference to the progress handle animation slider

    useEffect(() => {
        const seconds = Math.floor(audioPlayer.current.duration); // .current references the current item in our reference
        setDuration(seconds);
        progressBar.current.max = seconds; 
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
            animationRef.current = requestAnimationFrame(whilePlaying);
        } else {
            audioPlayer.current.pause();
            cancelAnimationFrame(animationRef.current)
        }
    }

    const whilePlaying = () => {
        progressBar.current.value = audioPlayer.current.currentTime;
        changePlayerCurrentTime();
        animationRef.current = requestAnimationFrame(whilePlaying); 
    }

    const changeRange = () => {
        audioPlayer.current.currentTime = progressBar.current.value;
        changePlayerCurrentTime();
    }

    const changePlayerCurrentTime = () => {
        progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value / duration * 100}%`) // dragging the progress handle updates the time readout next to progress bar
        setCurrentTime(progressBar.current.value);
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
                <input type="range" className="progressBar" defaultValue="0" ref={progressBar} onChange={changeRange} />
            </div>

            {/* Duration */}
            <div className="duration">{(duration && !isNaN(duration)) && calculateTime(duration)}</div>

        </div>
    )
}

export { AudioPlayer };