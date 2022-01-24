import { useState } from "react";
import { Link } from "react-router-dom";

function Index(props) {
    // state to fold the form data
    const [newForm, setNewForm] = useState({
        name: '',
        url: '',
    })

    // handleChange for the form input, captures user input as it's typed
    const handleChange = (event) => {
        setNewForm((prevState) => ({
            ...prevState, // captures keystroke data
            [event.target.name]: event.target.value, // [event.target.name] get converted to (a key) name or url depending on input field being typed in
        }))                                          // event.target.value takes the value of what's inside the input field
    };

    // handleSubmit function for the form
    const handleSubmit = (event) => {
        event.preventDefault();
        props.createABackground(newForm);
        setNewForm({
            name: '',
            url: '',
        })
    }

    // loaded function
    const loaded = () => {
        return props.backgrounds.map((background) => (
            <div key={background._id} className="background">
                <Link to={`/backgrounds/${background._id}`}>
                    <h1>{background.name}</h1>
                </Link>
                <img src={background.url} alt={background.name} />
            </div>
        ))
    }

    const loading = () => {
        return <h1>Loading...</h1>
    }

    return (
        <section>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={newForm.name}
                    name="name"
                    placeholder="name"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    value={newForm.url}
                    name="url"
                    placeholder="image URL"
                    onChange={handleChange}
                />
                <input type="submit" value="Add Background" />
            </form>
            {props.backgrounds ? loaded() : loading()}
        </section>
    )
};

export default Index;