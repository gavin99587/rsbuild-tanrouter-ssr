import {createFileRoute} from '@tanstack/react-router'
import * as React from 'react'

export const Route = createFileRoute('/about')({
    head: () => ({
        meta: [
            {
                title: 'about'
            }
        ]
    }),
    loader: async ({context, params}) => {
        console.log('context', context);
    },
    component: AboutComponent,
})

function AboutComponent() {
    return (
        <div className="p-2">
            <h3>about</h3>
        </div>
    )
}
