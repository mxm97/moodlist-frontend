import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Index from "../pages/Index";
import Show from "../pages/Show";

function Main(props) {

    const [backgrounds, setBackgrounds] = useState([]); //expecting my state to be set to an array, so using [] instead of "null"

    const URL = "https://wallpaper-radio.herokuapp.com/backgrounds/";

    // retrieve all Backgrounds
    const getBackgrounds = async () => {
        const response = await fetch(URL);
        const data = await response.json();
        setBackgrounds(data);
        localStorage.setItem("data", JSON.stringify(data));
    };

    const createABackground = async (background) => {
        // make a post request to create a Background
        await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "Application/json",
            },
            body: JSON.stringify(background), // converts body data into a string, sends the body data
        })
        // update the list of Backgrounds
        getBackgrounds()
    };

    const updateABackground = async (background, id) => {
        // make a PUT request to create Backgrounds
        await fetch(URL + id, {
            method: "PUT",
            headers: {
                "Content-Type": "Application/json"
            },
            body: JSON.stringify(background),
        })
        // update list of Backgrounds
        getBackgrounds()
    };

    const deleteABackground = async (id) => {
        // make DELETE request to create Background
        await fetch(URL + id, {
            method: "DELETE",
        })
        // update the list of Backgrounds
        getBackgrounds()
    };

    // runs getBackgrounds ONCE when component is mounted
    useEffect(() => {
        getBackgrounds()

    }, []) // the [] tells code to run a single time

    // const background = props.backgrounds.find(background => background._id === id);
    // localStorage.setItem("background", JSON.stringify(background));

    return(
        <main>
            <Switch>
                <Route exact path="/">
                    <Index backgrounds={backgrounds} createABackground={createABackground} />
                </Route>
                <Route path="/backgrounds/:id" render={(rp) => {
                    console.log(rp.match.params.id)
                    const background = backgrounds.find(background => background._id === rp.match.params.id);
                    localStorage.setItem("background", JSON.stringify(background));
                    return(<Show 
                        {...rp}
                        updateABackground={updateABackground}
                        deleteABackground={deleteABackground}
                        backgrounds={background}
                    />)
                }} />
            </Switch>
        </main>
    )
};

export default Main;