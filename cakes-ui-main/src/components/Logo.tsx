import React from 'react'
import load from '../assets/38188-cake.json'
import Lottie from 'react-lottie';
import '../assets/css/Logo.scss'


export default function Logo() {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: load,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }

    };
    return (
        <div className='logo'>
            <Lottie options={defaultOptions}
                height={70}
                width={70}
                isStopped={false}
                isPaused={false} />
            <h1>Cakes</h1>
        </div>
    )
}
