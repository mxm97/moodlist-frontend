import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Index from "../pages/Index";
import Show from "../pages/Show";

function Main(props) {

    const [mood, setMood] = useState([]); //expecting my state to be set to an array, so using [] instead of "null"

    const URL = "http://localhost:3000/moods/";

    // retrieve all Moods
    const getMood = async () => {
        const response = await fetch(URL);
        const data = await response.json();
        setMood(data);
    }

    const createMood = async (person) => {
        // make a post request to create a Mood
        await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "Application/json",
            },
            body: JSON.stringify(person), // converts body data into a string, sends the body data
        })
        // update the list of Moods
        getMood()
    }

    const updateMood = async (mood, id) => {
        // make a PUT request to create mood
        await fetch(URL + id, {
            method: "PUT",
            headers: {
                "Content-Type": "Application/json"
            },
            body: JSON.stringify(mood),
        })
        // update list of Moods
        getMood()
    }

    const deleteMood = async (id) => {
        // make DELETE request to create Mood
        await fetch(URL + id, {
            method: "DELETE",
        })
        // update the list of Moods
        getMood()
    }

    // runs getMood ONCE when component is mounted
    useEffect(() => getMood(), []) // the [] tells code to run a single time

    return(
        <main>
            <Switch>
                <Route exact path="/">
                    <Index mood={mood} createMood={createMood} />
                </Route>
                <Route 
                    path="/moods/:id"
                    render={(rp) => (
                        <Show 
                            mood={mood}
                            updateMood={updateMood}
                            deleteMood={deleteMood}
                            {...rp}
                        />
                    )}
                />
            </Switch>
        </main>
    )
};

export default Main;