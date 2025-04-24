import {createFileRoute} from '@tanstack/react-router'
import * as React from 'react'
import {Trans} from "@lingui/react/macro";

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
    const a = 1;
    const b = 1;
    const res = a + b;
    console.log('AboutComponent', res);
    return (
        <div className="p-2">
            <h1>
                <Trans>About</Trans>
            </h1>
        </div>
    )
}
