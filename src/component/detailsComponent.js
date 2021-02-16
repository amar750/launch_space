import Card from './card';
const DetailsComponent = ({volatile}) => {
    if(!volatile || volatile.length === 0) {
        return(
            <div>
                <h3>No data</h3>
            </div>    
        )
    }
    return(
     <>
        {
            volatile.map((data,i)=>{
            const {
                mission_name,
                links,
                mission_id,
                launch_year,
                launch_success,
                rocket,
            } = data;
            const {first_stage} = rocket;
            const {cores} = first_stage;
            const {
                mission_patch
            } = links
            return(
                <div className='cardWrapper' key={i}>
                    <Card
                        mission_name={`${mission_name } #${i+1}`}
                        mission_id={mission_id?.join() || 'NA'}
                        launch_year={launch_year || 'NA'}
                        launch_success={(launch_success === null && 'NA') || launch_success}
                        land_success={(cores[0]?.land_success === null && 'NA') || cores[0]?.land_success}
                        mission_patch={mission_patch?.toString()}
                    />
                </div>
            )
            })
        }

   </>
    )
}

export default DetailsComponent;