import { useState } from "react";
import "../styles/AudioPlayer.css";
import { BsArrowLeftShort } from "react-icons/bs";
import { BsArrowRightShort } from "react-icons/bs";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";

function AudioPlayer(props) {

    const [isPlaying, setIsPlaying] = useState(false); // set useState to false initially b/c we don't want audio to play automatically on page load

    const togglePlayPause = () => {
        setIsPlaying(!isPlaying); // toggles the isPlaying state to change which button icon is displayed
    }

    return(
        <div className="audioPlayer">
            <audio src="https://soundcloud.com/discolithe/maria-takeuchi-plastic-love" preload="metadata"></audio>
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
                <input type="range" />
            </div>

            {/* Duration */}
            <div className="duration">7:56</div>

        </div>
    )
}

export { AudioPlayer };