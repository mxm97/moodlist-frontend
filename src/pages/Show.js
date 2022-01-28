import { useState } from "react";
import { AudioPlayer } from "../components/AudioPlayer";

function Show(props){
    
    const data = JSON.parse(localStorage.getItem("background")) // .match gives access to URL param
    // const background = props.backgrounds.find(background => background._id === id);
    // localStorage.setItem("background", JSON.stringify(background));
    console.log(data._id);
    const id = data._id;

    // state
    const [editForm, setEditForm] = useState(JSON.parse(localStorage.getItem("background")));
    const [bg, setBg] = useState(JSON.parse(localStorage.getItem("background")));

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
        <div className="background">
            <h1>{bg.name}</h1>
            {
                bg.url && <img src={bg.url} alt={bg.name} /> // img tag won't render unless background has a URL
            }   {/* operand right of && won't execute unless the left operand evaluates to truthy*/}
            <button id="delete" onClick={removeBackground}>
                Delete Background
            </button>

            <form onSubmit={handleSubmit}>
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
                <input type="submit" value="Update Background" />
            </form>
            
            <div>
                <AudioPlayer />
            </div>
        </div>
        
    )
};

export default Show;