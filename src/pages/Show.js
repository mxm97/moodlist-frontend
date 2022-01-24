function Show(props){

    const id = props.match.params.id; // .match gives access to URL params
    const background = props.backgrounds.find(background => background._id === id);

    return(
        <div className="background">
            <h1>{background.name}</h1>
            <img src={background.url} alt={background.name} />
        </div>
    )
};

export default Show;