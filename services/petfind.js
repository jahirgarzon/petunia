import axios from 'axios'

const headers={}

const findPetsService = {
    findMany: (location)=>{
        const config = {
            method: 'GET',
            headers,
            params:{
                key:'aa5a343bee8f83e3d13c615dffef9763',
                location:location,
                format:'json'

            }
        }
        return axios.get(`http://api.petfinder.com/pet.find`,config)
                        .then(responseSuccessHandler)
                        .catch(responseErrorHandler)
    }
}
const responseSuccessHandler = (response) => response.data
const responseErrorHandler = (error) => {
    console.log(error)
    return Promise.reject(error)
}
export default findPetsService