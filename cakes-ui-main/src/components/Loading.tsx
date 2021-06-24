import React from 'react'
import load from '../assets/38188-cake.json'
import Lottie from 'react-lottie';


export default function Loading() {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: load,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }

    };
    return (
        <div style={{ width: "100%", height: "60vh", display: 'flex', flexDirection: 'row', alignContent: 'center', justifyContent: 'center' }}>
            <Lottie options={defaultOptions}
                height={400}
                width={400}
                isStopped={false}
                isPaused={false} />
        </div>
    )
}
