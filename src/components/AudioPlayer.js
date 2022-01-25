function AudioPlayer(props) {
    return(
        <div>
            <audio src="https://soundcloud.com/lofi-hip-hop-music/sets/lofi-hip-hop-beats?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing" preload="metadata"></audio>
            <button>Rewind 30 seconds</button>
            <button>Play/Pause</button>
            <button>Fastforward 30 seconds</button>

            {/* Current Time */}
            <div>0:00</div>

            {/* Progress Bar */}
            <div type="range"></div>

            {/* Duration */}
            <div>2:49</div>

        </div>
    )
}

export { AudioPlayer };