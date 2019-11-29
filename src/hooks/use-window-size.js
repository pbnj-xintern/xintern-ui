import React, { useState, useEffect } from 'react'

const getWindowSize = () => {
    const { innerWidth: width, innerHeight: height } = window
    return { width, height }
}

const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState(getWindowSize())

    useEffect(() => {
        const onResize = () => setWindowSize(getWindowSize())
        const removeEventListener = (event, fn) => window.removeEventListener(event, fn)
        window.addEventListener('resize', onResize)
        removeEventListener('resize', onResize)
    }, [])

    return windowSize
}

export default useWindowSize