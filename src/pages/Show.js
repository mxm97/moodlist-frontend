import { useState } from "react";
import { AudioPlayer } from "../components/AudioPlayer";
import "../styles/Show.css";

function Show(props){
    
    const id = props.match.params.id; // gives access to URL param
    const background = props.backgrounds.find(background => background._id === id);

    // state
    const [editForm, setEditForm] = useState(background);

    const handleChange = (event) => {
        setEditForm({
            ...editForm, // spread out params of the editForm
            [event.target.name]: event.target.value
        })
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        props.updateABackground(editForm, id);
        props.history.push("/"); // .push allows adding of elements to history, redirects user to "/"
    };

    const removeBackground = () => {
        props.deleteABackground(id);
        props.history.push("/")
    }

    return(
        <div className="show-container">
            <style>
                    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap');
            </style>

            <h1>{background.name}</h1>

            {
                background.url && <img src={background.url} alt={background.name} className="background-image" /> // img tag won't render unless background has a URL
            }   {/* operand right of && won't execute unless the left operand evaluates to truthy*/}

            <div className="audio-container" >
                <AudioPlayer />
            </div>

            <form onSubmit={handleSubmit} className="update-background-form" > 
                <input 
                    type="text"
                    value={editForm.name}
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                />
                <input 
                    type="text"
                    value={editForm.url}
                    name="url"
                    placeholder="background URL"
                    onChange={handleChange}
                />
                <input type="submit" value="Update Background" className="update-button" />
            </form>

            <button id="delete" onClick={removeBackground} className="delete-button" >
                Delete Background
            </button>
        </div>
        
    )
};

export default Show;