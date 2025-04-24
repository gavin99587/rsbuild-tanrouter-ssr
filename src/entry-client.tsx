import {hydrateRoot} from 'react-dom/client'
import {i18n} from '@lingui/core'
import {StartClient} from '@tanstack/react-start'
import {createRouter} from './router'
import {dynamicActivate} from "./modules/lingui/i18n";


console.log('客户端渲染', document.documentElement.lang);
dynamicActivate(document.documentElement.lang);

const router = createRouter({i18n})

hydrateRoot(document, <StartClient router={router}/>)
