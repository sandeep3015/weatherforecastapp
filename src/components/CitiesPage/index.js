import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './index.css'

const CitiesPage = () => {

    const [cities, setCities] = useState([])
    const [searchInput, setSearchInput] = useState('')
    const [filterCity, setFilterCity] = useState([])
    const [currentDisplayPage, setCurrentDisplayPage] = useState(0)
    const [moreData, setMoreData] = useState(true)

    useEffect(() => {

    getCitiesData()
    // eslint-disable-next-line
    }, [])

    const getCitiesData =  () => {

        setTimeout( async () => {
            try {const url = `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=30&offset=${currentDisplayPage * 20}`
                const options = {
                    method: 'GET',
                }

                const citiesData = await fetch(url, options)
                const citiesJsonData = await citiesData.json()

                const refresedData = citiesJsonData.results
                
                setCities(prevCities => [...prevCities, ...refresedData])
                setCurrentDisplayPage(prevPage => prevPage + 1)

                if (refresedData.length === 0){
                    setMoreData(false)
                }
            } catch(err) {
                console.log(err.message)
            }

        }, 1000)
}

    const onChangeSearchInput = (event) => {
        setSearchInput(event.target.value)
    }

    useEffect(() => {
        const filteredCities = cities.filter((city) => (
            city.name.toLowerCase().includes(searchInput.toLowerCase())
        ))
        setFilterCity(filteredCities)
    }, [cities, searchInput])


     const rightClick = (e, city) => {
        e.preventDefault()
        window.open(`/weather/${city}`, '_blank')
    }

    return (
        <div className='main-container'>      
            <h1 className='main-heading'>Cities Weather Details List</h1>
            <div>
                <input type='search' placeholder='search city...' className='search-input' onChange={onChangeSearchInput} value={searchInput}/>
            </div>
            <TableContainer component={Paper} style={{backgroundColor: 'transparent'}}>
            <InfiniteScroll
                        dataLength={cities.length}
                        next={getCitiesData}
                        hasMore={moreData}
                        loader={<h4 style={{backgroundColor: '', color: 'white'}}>Loading...</h4>}
                        endMessage={
                          <p style={{ textAlign: 'center' }}>
                            <b>You have reached the maximum limit</b>
                          </p>
                        }
                    >
                <Table sx={{ minWidth: 650, height: 'auto', backgroundColor: 'transparent', color: 'white'}} aria-label="caption table">
                    <TableHead>
                    <TableRow>
                        <TableCell sx={{color: 'white', fontSize: '17px', fontStyle: 'bold'}}>City Name</TableCell>
                        <TableCell align="right" sx={{color: 'white', fontSize: '17px', fontStyle: 'bold'}} >Country Name</TableCell>
                        <TableCell align="right" sx={{color: 'white', fontSize: '17px', fontStyle: 'bold'}}>Country Code</TableCell>
                        <TableCell align="right" sx={{color: 'white', fontSize: '17px', fontStyle: 'bold'}}>Population</TableCell>
                        <TableCell align="right" sx={{color: 'white', fontSize: '17px', fontStyle: 'bold'}}>Timezone</TableCell>
                        <TableCell align="right" sx={{color: 'white', fontSize: '17px', fontStyle: 'bold'}}>Latitude</TableCell>
                        <TableCell align="right" sx={{color: 'white', fontSize: '17px', fontStyle: 'bold'}}>Longitude</TableCell>
                    </TableRow>
                    </TableHead>
                    
                    <TableBody>
                    
                    {filterCity.map((city) => (
                        <TableRow key={city.name}>
                        <TableCell component="th" scope="row" sx={{backgroundColor: 'trasparent', color: 'white' }} onContextMenu={(e) => rightClick(e, city.ascii_name)}>
                            <Link to={`/weather/${city.ascii_name}`} className='link-item' >
                            {city.ascii_name}
                            </Link>
                        </TableCell>
                        <TableCell align="right" sx={{backgroundColor: 'trasparent', color: 'white'}}>{city.cou_name_en}</TableCell>
                        <TableCell align="right" sx={{backgroundColor: 'trasparent', color: 'white'}}>{city.country_code}</TableCell>
                        <TableCell align="right" sx={{backgroundColor: 'trasparent', color: 'white'}}>{city.population}</TableCell>
                        <TableCell align="right" sx={{backgroundColor: 'trasparent', color: 'white'}}>{city.timezone}</TableCell>
                        <TableCell align="right" sx={{backgroundColor: 'trasparent', color: 'white'}}>{city.coordinates.lat}</TableCell>
                        <TableCell align="right" sx={{backgroundColor: 'trasparent', color: 'white'}}>{city.coordinates.lon}</TableCell>
                        </TableRow>
                    ))}
                    
                    </TableBody>
                    
                </Table>
                </InfiniteScroll>
            </TableContainer>
        </div>
    )
}

export default CitiesPage