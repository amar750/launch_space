import React, {useEffect, useState} from 'react'
import './index.css';
import {getAllData,getFilteredData} from "../api";
import DetailsComponent from '../component/detailsComponent';
import SideNav from '../component/sideNav';

const DetailsContainer = () => {
   const [volatile, setVolatile] = useState([]);
   const [navData, setNavData] = useState([]);
   const [isLoading,setLoading] = useState(true);
   const [list,setList] = useState({
       isLaunchYear: false,
       isSuccessfulLaunch:false,
       isSuccessfulLanding:false,
       endPoint:'',
       yearValue: '',
       launchValue: '',
       landValue: '',
       style:'',
       activeYear:'',
       activeYearName:'',
       activeLaunch:'',
       activeLaunchName:'',
       activeLanding:'',
       activeLandingName: '',
   })
    useEffect(()=>{
        const getData = async()=>{
            let isLoading = true;
            try {
                const res =  await getAllData();
                const data = await res.json()
                setVolatile(data)
                setNavData(data)
                isLoading = false;
            } catch (error) {
                console.log("error", error)
                isLoading = false;
            }
          setLoading(isLoading);
        }
        getData()
    },[]);
    const handleClick = (info) => {
        const {data,name} = info || '';

        let endPoint = list?.endPoint;

        let yearValue = list?.yearValue;
        let launchValue = list?.launchValue;
        let landValue = list?.landValue;

        let activeYear = list?.activeYear;
        let activeYearName = list?.activeYearName;

        let activeLaunch = list?.activeLaunch;
        let activeLaunchName = list?.activeLaunchName

        let activeLanding = list?.activeLanding;
        let activeLandingName = list?.activeLandingName;

        let isLaunchYear = list?.isLaunchYear;
        let isSuccessfulLaunch = list?.isSuccessfulLaunch;
        let isSuccessfulLanding = list?.isSuccessfulLanding;

        if(name === 'year'){
            if(yearValue === ''){
                isLaunchYear = !isLaunchYear
                activeYear = data;
                activeYearName = name;
                endPoint += `&launch_year=${Number(data)}`
            }
            if(yearValue === data){
                isLaunchYear = !isLaunchYear;
                if(isLaunchYear) {
                    activeYear = data;
                    activeYearName = name;
                    endPoint += `&launch_year=${Number(data)}`;
                }
                else{
                    activeYear = '';
                    activeYearName = '';
                    const endPointArr = endPoint?.split('&').filter(el => !el.includes('launch_year'));
                    endPoint = endPointArr.join('&');
                }
            }
            else{
                let a = endPoint?.split('&') || [];
                const getValue = (launcY) =>  launcY === `launch_year=${yearValue}`;
                const index = a.findIndex(getValue);
                a[index] = `launch_year=${data}`;
                a = a.join('&');
                endPoint = a;
                activeYear = data;
                activeYearName = name;
            }
            yearValue = data;
        }
        if(name === 'launch'){
            if(launchValue === ''){
                endPoint += `&launch_success=${data}`;
                isSuccessfulLaunch = !isSuccessfulLaunch
                activeLaunch = data;
                activeLaunchName = name;
            }
            if(launchValue === data){
                isSuccessfulLaunch = !isSuccessfulLaunch;
                if(isSuccessfulLaunch) {
                    endPoint += `&launch_success=${data}`
                    activeLaunch = data;
                    activeLaunchName = name;
                }
                else{
                    const endPointArr = endPoint?.split('&').filter(el => !el.includes('launch_success'));
                    endPoint = endPointArr.join('&');
                    activeLaunch = '';
                    activeLaunchName = '';
                }
            }
            else{
                let a = endPoint?.split('&') || [];
                const getValue = (launchV) =>  launchV === `launch_success=${launchValue}`;
                const index = a.findIndex(getValue);
                a[index] = `launch_success=${data}`;
                a = a.join('&');
                endPoint = a;
                activeLaunch =data;
                activeLaunchName = name;
            }
            launchValue = data;
        }
        if(name === 'landing'){
            if(landValue === ''){
                endPoint += `&land_success=${data}`
                isSuccessfulLanding = !isSuccessfulLanding
                activeLanding = data;
                activeLandingName = name;
            }
            if(landValue === data){
                isSuccessfulLanding = !isSuccessfulLanding;
                if(isSuccessfulLanding) {
                    endPoint += `&land_success=${data}`
                    activeLanding = data;
                    activeLandingName = name;
                }
                else{
                    const endPointArr = endPoint?.split('&').filter(el => !el.includes('land_success'));
                    endPoint = endPointArr.join('&');
                    activeLanding = '';
                    activeLandingName = '';
                }
            }
            else{
                let a = endPoint?.split('&') || [];
                const getValue = (launchV) =>  launchV === `land_success=${landValue}`;
                const index = a.findIndex(getValue);
                a[index] = `land_success=${data}`;
                a = a.join('&');
                endPoint = a;
                activeLanding =data;
                activeLandingName = name;
            }
            landValue = data;
        }
        setList((state)=>({
            ...state,
            activeLaunch,
            activeLaunchName,
            activeYear,
            activeYearName,
            activeLanding,
            activeLandingName,
            yearValue,
            isLaunchYear,
            launchValue : launchValue,
            isSuccessfulLaunch,
            landValue,
            isSuccessfulLanding,
            endPoint

        }));
        const getData = async()=>{
            let isLoading = true;
            try {
                const res =  await getFilteredData(endPoint);
                const data = await res.json()
                setVolatile(data)
                isLoading = false;
            } catch (error) {
                console.log("error", error)
                isLoading = false;
            }
            setLoading(isLoading);
         }
         getData();
    }
    const getYear = () => [...new Set((navData || []).map(year => year.launch_year))].map(el=> ({'data':el,'name':'year'})) // get year after removing dublicate
    const getLaunchStatus = () => [...new Set((navData || []).map(year => year.launch_success))].map(el=> ({'data':el,'name':'launch'})) // get launch_success after removing dublicate
    const getLandingStatus = () => [...new Set((navData || []).map(year => (year?.rocket?.first_stage?.cores[0]?.land_success || false)))].map(el=> ({'data':el,'name':'landing'})) // get land_success after removing dublicate
    
    return(
        <main>
            <header>
                <h1>SpaceX Launch Programs</h1>
            </header>
            {
                (isLoading && (<div style={{textAlign:'center'}}><h2>Loading data...</h2></div>)) || (
                   <> 
                    <section className="sideNav">
                        <SideNav
                            year={getYear()}
                            successfulLaunch = {getLaunchStatus()}
                            successfulLanding = {getLandingStatus()}
                            handleClick={handleClick}
                            list={list}
                        />
                    </section>
                    <section className="details">    
                        <DetailsComponent
                            volatile={volatile}
                        />
                    </section>
                   </> 
                )
            }
            <footer>Developed by Amar</footer>
           
        </main>
    )
}
export default DetailsContainer;