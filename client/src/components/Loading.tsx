import React, { useState } from 'react'
import type { NextPage } from 'next'

const Loading: NextPage = () => {

    return <>
    <div className="container">
        <div className="progressed"></div>
        <div className="remain">
            <div></div>
        </div>
    </div>

    </>
}

export default Loading
