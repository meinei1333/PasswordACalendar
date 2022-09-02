import * as React from 'react';
import { useState } from 'react';
import "./css/Password.css";
import { ValidationItem } from "./ValidationItem";

export function Password() {
    const [isShow, setIsShow] = useState(false);
    const [v1, setV1] = useState(false);
    const [v2, setV2] = useState(false);
    const [v3, setV3] = useState(false);
    const [v4, setV4] = useState(false);
    const [v5, setV5] = useState(false);

    const changeContent = (e: any) => {
        const str = e.currentTarget.value;
        setIsShow(str !== "");
        const re1 = new RegExp('[a-z]');
        const re2 = new RegExp('[A-Z]');
        const re3 = new RegExp('[0-9]');
        const re4 = new RegExp(/^(?=.*\W)/);
        const re5 = new RegExp('^.{8,}$');
        setV1(re1.test(str));
        setV2(re2.test(str));
        setV3(re3.test(str));
        setV4(re4.test(str));
        setV5(re5.test(str));
    }

    return (
        <div className='mt-10px'>
            <div className='text-white px-3px absolute ml-16px mt-m1% upword bg-black'>Password</div>
            <input onChange={changeContent} className="border border-3 bg-black rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline focus:border-blue bg-black text-text pl-4 rounded-10px border-blue-50 password" id="password" type="password" placeholder="password" />            {/* <input onChange={changeContent} className="border border-orange-200 w-full py-2 px-3 text-gray-700 focus:border-blue hover:border-red bg-black" id="password" type="password" placeholder="password" /> */}
            <div className={isShow ? "visible" : "invisible hidden"}>
                <div className='bg-gray-800'>
                    <div className='pl-4 pt-3.5 pb-4 flex flex-col gap-4'>
                        <ValidationItem isOK={v1}>{'Have at least one uppercase letter'}</ValidationItem>
                        <ValidationItem isOK={v2}>{'Have at least one lowercase letter'}</ValidationItem>
                        <ValidationItem isOK={v3}>{'Have at least one number'}</ValidationItem>
                        <ValidationItem isOK={v4}>{'Have at least one special character(!@#$...etc)'}</ValidationItem>
                        <ValidationItem isOK={v5}>{'Longer than 8 characters'}</ValidationItem>
                    </div>
                </div>
            </div>
        </div>
    );
}