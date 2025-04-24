import {createFileRoute} from '@tanstack/react-router'
import * as React from 'react'
import {Trans} from "@lingui/react/macro";
import {dynamicActivate, locales} from "../modules/lingui/i18n";
import {serialize} from 'cookie-es'
import {useLingui} from "@lingui/react";


export const Route = createFileRoute('/')({
    component: IndexComponent,
})

function IndexComponent() {
    const {i18n} = useLingui();

    const handleChangeLan = (locale: string) => {
        console.log('开始切换语言');
        //
        const cookieStr = serialize('locale', locale, {
            maxAge: 30 * 24 * 60 * 60,
            path: '/',
        });
        // 设置 cookie
        document.cookie = cookieStr;

        dynamicActivate(locale).then(() => {
            //地址栏没有发生变化，所以页面不需要reload
            // location.reload()
            console.log('语言切换成功');
        });
    }

    return (
        <div className="p-2">
            <h3><Trans>Hello world!</Trans></h3>
            <div>
                <div>{'i18n.locale=>' + i18n?.locale}</div>
            </div>
            <br/>
            <br/>
            <div>点击切换语言</div>
            <div>
                {Object.entries(locales).map(([locale, label]) => (
                    <button
                        key={locale}
                        style={{color: locale === i18n.locale ? 'red' : ''}}
                        onClick={() => {
                            handleChangeLan(locale);
                        }}
                    >
                        {label}
                    </button>
                ))}
            </div>
        </div>
    )
}
