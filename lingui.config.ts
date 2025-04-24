import {LinguiConfig} from '@lingui/conf';

const config: Partial<LinguiConfig> = {
    locales: ['en', 'zh'],
    sourceLocale: 'en',
    catalogs: [{
        path: 'src/_locales/{locale}/messages',
        include: ['src/routes']
    }],
    compileNamespace: 'ts',
    format: 'po'
};

export default config;
