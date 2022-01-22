import { useState } from "react";
import { Link } from "react-router-dom";

function Index(props) {
    // state to fold the form data
    const [newForm, setNewForm] = useState({
        name: '',
        image: '',
    })

    // handleChange for the form input
    const handleChange = (event) => {
        setNewForm({...newForm, [event.target.name]: event.target.value })
    }

    // handleSubmit function for the form
    const handleSubmit = (event) => {
        event.preventDefault();
        props.createMood(newForm);
        setNewForm({
            name: '',
            image: '',
        })
    }

    // loaded function
    const loaded = () => {
        return props.moods.map((mood) => (
            <div key={mood._id} className="mood">
                <Link to={`/moods/${mood._id}`}>
                    <h1>{mood.name}</h1>
                </Link>
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
                    value={newForm.image}
                    name="image"
                    placeholder="image URL"
                    onChange={handleChange}
                />
                <input type="submit" value="Create Mood" />
            </form>
            {props.moods ? loaded() : loading()}
        </section>
    )
};

export default Index;