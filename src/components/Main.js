import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Index from "../pages/Index";
import Show from "../pages/Show";

function Main(props) {

    const [background, setBackground] = useState([]); //expecting my state to be set to an array, so using [] instead of "null"

    const URL = "https://wallpaper-radio.herokuapp.com/backgrounds/";

    // retrieve all Background
    const getBackground = async () => {
        const response = await fetch(URL);
        const data = await response.json();
        setBackground(data);
    }

    const createBackground = async (background) => {
        // make a post request to create a Background
        await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "Application/json",
            },
            body: JSON.stringify(background), // converts body data into a string, sends the body data
        })
        // update the list of Background
        getBackground()
    }

    const updateBackground = async (background, id) => {
        // make a PUT request to create Background
        await fetch(URL + id, {
            method: "PUT",
            headers: {
                "Content-Type": "Application/json"
            },
            body: JSON.stringify(background),
        })
        // update list of Background
        getBackground()
    }

    const deleteBackground = async (id) => {
        // make DELETE request to create Background
        await fetch(URL + id, {
            method: "DELETE",
        })
        // update the list of Background
        getBackground()
    }

    // runs getMood ONCE when component is mounted
    useEffect(() => getBackground(), []) // the [] tells code to run a single time

    return(
        <main>
            <Switch>
                <Route exact path="/">
                    <Index background={background} createBackground={createBackground} />
                </Route>
                <Route 
                    path="/background/:id"
                    render={(rp) => (
                        <Show 
                            {...rp}
                            background={background}
                            updateBackground={updateBackground}
                            deleteBackground={deleteBackground}
                        />
                    )}
                />
            </Switch>
        </main>
    )
};

export default Main;