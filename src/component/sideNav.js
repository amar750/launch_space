import Button from "./button";
import { Fragment } from "react";

const RenderLayout = ({
    label,
    info,
    handleClick,
    name,
    activeYear,
    activeYearName,
    activeLaunch,
    activeLaunchName,
    activeLanding,
    activeLandingName,
}) => {
    return (
        <>
            <div style={{textAlign:'center'}}>
                <label>{label}</label>
            </div>
            <div className="buttonContainer">
                {
                    (info || []).map((el,i)=>{
                    return(
                        <Fragment key={i}>
                            <Button
                                btnName = {el?.data.toString()}
                                onClick = {()=>handleClick(el)}
                                value = {el?.data}
                                name = {name}
                                style = {
                                    ((el.name === 'year' && activeYear === el.data.toString() && activeYearName === el.name) ? '#30934E' : '') ||
                                    ((el.name === 'launch' && activeLaunch === el.data.toString() && activeLaunchName === el.name) ? '#30934E' : '') ||
                                    ((el.name === 'landing' && activeLanding === el.data.toString() && activeLandingName === el.name) ? '#30934E' : '')}
                            />
                        </Fragment>
                    )
                    })
                }
            </div>
        </>
    )

}
const SideNav = ({
    year,
    successfulLaunch,
    successfulLanding,
    handleClick,
    list,
}) => {
    const {
        activeYear,
        activeYearName,
        activeLaunch,
        activeLaunchName,
        activeLanding,
        activeLandingName,
    } = list;
    return(
        <>
        <div className="filterLabel">
            <h3>Filters</h3>
        </div>
        <div className="buttonWrapper">
            <RenderLayout 
                label="Launch Year"
                info = {year}
                handleClick={handleClick}
                name="launchYear"
                activeYear={activeYear}
                activeYearName={activeYearName}
            />
        </div>
        <div className="buttonWrapper">
            <RenderLayout 
                label="Successful Launch"
                info = {successfulLaunch}
                handleClick={handleClick}
                name="successfulLaunch"
                activeLaunch={activeLaunch}
                activeLaunchName={activeLaunchName}
            />
        </div>
        <div className="buttonWrapper">
            <RenderLayout 
                label="Successful Landing"
                info = {successfulLanding}
                handleClick={handleClick}
                name="successfulLanding"
                activeLanding={activeLanding}
                activeLandingName={activeLandingName}
            />
        </div>
    </>
    )

}
export default SideNav;