import { useState, useRef } from "react";
import "../styles/AudioPlayer.css";
import { BsArrowLeftShort } from "react-icons/bs";
import { BsArrowRightShort } from "react-icons/bs";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";

function AudioPlayer(props) {

    // State
    const [isPlaying, setIsPlaying] = useState(false); // set useState to false initially b/c we don't want audio to play automatically on page load

    // References
    const audioPlayer = useRef(); // reference our audio component

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
            <div className="currentTime">0:00</div>

            {/* Progress Bar */}
            <div>
                <input type="range" className="progressBar"/>
            </div>

            {/* Duration */}
            <div className="duration">7:56</div>

        </div>
    )
}

export { AudioPlayer };