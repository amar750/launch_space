const Card = ({
    mission_name,
    mission_id,
    launch_year,
    launch_success,
    land_success,
    mission_patch
}) => {
    return(
        <>
            <div className="cardImgContainer">
                <img src = {mission_patch} alt="loading"/>
            </div>
            <div className="info">
                <label>{mission_name}</label>
                <br/>
                <label>mission_ids : </label> {mission_id}<br/>
                <label>Launch year: </label> {launch_year}<br/>
                <label>Successful launch: </label> {launch_success}<br/>
                <label>Successful landings: </label>{land_success}<br/>
            </div>
            
        </>
    )
}
export default Card;