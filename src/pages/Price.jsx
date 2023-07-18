import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export default function Price() {
    
    const [coin, setCoin] = useState({})

    const params = useParams() // { symbol: 'BTC' }
    

    async function getCoin() {

        // if you want to copy and use this you must get your own key from https://www.coinapi.io/
        let key = import.meta.env.VITE_API_KEY
        // let api =  `baseurl.com/apikey=${key}&symbol=${params.symbol}`
        let api = `http://rest.coinapi.io/v1/exchangerate/${params.symbol}/USD?apikey=${key}`
        
        const response = await fetch(api)
        const data = await response.json()
        console.log(data)
        setCoin(data)
    }

    useEffect(()=>{
        console.log('useEffect')
        // this conditional makes it so we dont rerender multiple times while editing the code
        if (!coin.rate){
            console.log('getCoin')
            getCoin()
        }
        ////test stuff
        //test stuff
        
        
        // alert('works')  
    }, [])

    function loaded(){
        return (
            <div>            
                <h1>{coin.asset_id_base}/{coin.asset_id_quote}</h1>
                <h2>{coin.rate}</h2>
            </div>
        )
    }

    function loading() {
        return (
            <h1>Loading...</h1>
        )
    }

    return coin.rate ? loaded() : loading()
} 