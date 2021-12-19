import { Image } from 'antd'
import React from 'react'

export default function ImageDemo(src) {
    return (
        <div>
            <Image
                width={125}
                src={src}
            />
        </div>
    )
}
