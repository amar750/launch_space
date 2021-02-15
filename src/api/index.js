const BASE_URL = 'https://api.spacexdata.com/v3/launches?limit=100';

const getAllData = async () => await fetch(`${BASE_URL}`);
   
const getFilteredData = async (endPoint) => await fetch(`${BASE_URL}${endPoint}`);

export {getAllData,getFilteredData};