import axios from 'axios'
import React, { useEffect, useState } from 'react'

const useFetch = ({ url, method, body = null }) => {

    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(null)


    const fetchData = async () => {
        setLoading(true)

        try {
            console.log('method:', method, 'url: ', url)
            const res = await axios[method](url, body)
            setData(res.data);
            setLoading(false)
            setError(null)
        } catch (err) {
            setLoading(false)
            setError('Could not fetch the data')
        }
    }

    useEffect(() => {
        fetchData()
    }, [url, method])


    return { data, error, loading, fetchData }
}

export default useFetch