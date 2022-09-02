import { useState, useEffect } from 'react';
import moment from 'moment';
import './css/Calendar.css';

class Day {
    date: Date = new Date();
    isThisMonth: boolean = false;
    selected: boolean = false;
}

const getFirstDate = (d = new Date()) => new Date(d.getFullYear(), d.getMonth(), 1);
const getLastDate = (d = new Date()) => new Date(d.getFullYear(), d.getMonth() + 1, 0);

export function Calendar() {

    const getAllCalendarDay = (setDay: Date): Array<Day> => {
        let allDay: Array<Day> = [];
        let startDate = getFirstDate(setDay);
        var endDate = getLastDate(setDay);
        // last month day
        for (let index = 0; index < startDate.getDay(); index++) {
            const day: Day = new Day();
            day.isThisMonth = false;
            day.date = new Date(startDate.getTime());
            day.date.setDate(startDate.getDate() - (startDate.getDay() - index));
            allDay.push(day);
        }
        // this month day
        for (let index = 0; index < endDate.getDate(); index++) {
            const day: Day = new Day();
            day.isThisMonth = true;
            day.date = new Date(startDate.getTime());
            day.date.setDate(startDate.getDate() + index);
            allDay.push(day);
        }
        // next month day
        let nextMonthCount = 7 - endDate.getDay() - 1;
        for (let index = 1; index <= nextMonthCount; index++) {
            const day: Day = new Day();
            day.isThisMonth = false;
            day.date = new Date(endDate.getTime());
            day.date.setDate(endDate.getDate() + index);
            allDay.push(day);
        }
        return allDay;
    }

    const getYearList = (year: number): Array<number> => {
        if (year === null || year === undefined) {
            year = (new Date()).getFullYear();
        }
        const result = [];
        // 去除尾數
        const startYear = Math.floor(Math.abs(year / 10)) * 10;
        for (let index = 0; index < 20; index++) {
            result.push(startYear + index);
        }
        return result;
    }

    const weeklist: Array<string> = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    const [isMonth, setIsMonth] = useState(true);
    const [selectDay, setSelectDay] = useState(new Day()); // 上面已經選擇的日期
    const [finalSelectDay, setFinalSelectDay] = useState(new Day()); // 上面已經選擇的日期
    const [calendarDay, setCalendarDay] = useState(new Day());// 下面日曆選擇的日期
    const [allCalendarDay, setAllCalendarDay] = useState([new Day()]); //日曆上所有的day
    const [yearList, setYearList] = useState(getYearList(calendarDay.date.getFullYear()));
    const [selectedYear, setSelectedYear] = useState((new Date).getFullYear());
    const [isShowCalendar, setIsShowCalendar] = useState(true);

    const onclick = (e: any) => {
        const tempAr = [...allCalendarDay];
        tempAr.forEach((element, index) => {
            element.selected = (index.toString() === (e.target as any).id);
            if ((index.toString() === (e.target as any).id)) {
                setSelectDay(element);
            }
        });
    }

    const upADown = (e: any) => {
        if (isMonth) {
            changeMonth(e);
        } else {
            changeYearList(e);
        }
    }

    const changeYearList = (e: any) => {
        if (e.currentTarget.id === "down") {
            const getFirstYear = yearList[0] - 40;
            setYearList(getYearList(getFirstYear));
        } else {
            const getLastYear = yearList[yearList.length - 1] + 1;
            setYearList(getYearList(getLastYear));
        }
    }

    const changeMonth = (e: any) => {
        let date: Date;
        if (e.currentTarget.id === "down") {
            date = new Date();
            if (calendarDay.date.getMonth() === 0) {
                date.setFullYear(calendarDay.date.getFullYear() - 1);
                date.setMonth(11);
            } else {
                date.setFullYear(calendarDay.date.getFullYear());
                if (calendarDay.date.getMonth() === 2) {
                    date.setMonth(1);
                    date.setMonth(1);
                } else {
                    date.setMonth(calendarDay.date.getMonth() - 1);
                }
            }
            const newDay = new Day();
            newDay.date = date;
            setCalendarDay(newDay);
        } else {
            date = new Date();
            if (calendarDay.date.getMonth() === 11) {
                date.setFullYear(calendarDay.date.getFullYear() + 1);
                date.setMonth(0);
            } else {
                date.setFullYear(calendarDay.date.getFullYear());
                date.setMonth(calendarDay.date.getMonth() + 1);
                date.setMonth(calendarDay.date.getMonth() + 1);
            }
            const newDay = new Day();
            newDay.date = date;
            setCalendarDay(newDay);
        }
    }

    const canelClick = (e: any) => { }
    const okClick = (e: any) => {
        setFinalSelectDay(selectDay);
        setIsShowCalendar(false);
    }
    const toggleMonthAYear = (e: any) => {
        setIsMonth(!isMonth);
        if (isMonth) {
            // 切換到年
            setSelectedYear(calendarDay.date.getFullYear());
        } else {
            // 切換到月
            const newDay = new Day();
            newDay.date = new Date(calendarDay.date.getTime());
            newDay.date.setFullYear(selectedYear);
            setCalendarDay(newDay);
        }
    }
    const yearClick = (e: any) => {
        console.log(Number(e.currentTarget.innerText));
        setSelectedYear(Number(e.currentTarget.innerText));
    }

    const toggleCalendar = () => {
        setIsShowCalendar(!isShowCalendar);
    }

    useEffect(() => {
        setAllCalendarDay(getAllCalendarDay(calendarDay.date));
    }, [calendarDay])

    return (
        <div className='mt-10px'>
            <div className='text-white px-3px absolute ml-16px mt-m1% upword bg-black'>Birthday</div>
            <div onClick={toggleCalendar} className="py-3 pl-5 text-white text-xs border-solid border-2 border-gray-400 rounded-lg result">{finalSelectDay && moment(finalSelectDay.date).format("DD/MM/YYYY")}</div>
            <div className={isShowCalendar ? "calendar visible" : "invisible hidden"}>
                <h1 className='ml-6 text-white text-xs text-text'>Text</h1>
                <h1 className="ml-6 w-screen text-white text-left selectDay">{moment(selectDay.date).format('MMM, YYYY')}</h1>
                <div className="flex items-center justify-between ml-5 mt-6 mr-6 mb-5">
                    <button id='down' onClick={upADown} aria-label="calendar backward" className="focus:text-gray-400 hover:text-gray-400 text-gray-800 dark:text-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-left text-white" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <polyline points="15 6 9 12 15 18" />
                        </svg>
                    </button>
                    <h1 onClick={toggleMonthAYear} className="focus:outline-none  text-base dark:text-gray-100 text-text text-white my-0 mx-3.5">{isMonth ? moment(calendarDay.date).format('MMMM YYYY') : selectedYear}</h1>
                    <button id='up' onClick={upADown} aria-label="calendar forward" className="focus:text-gray-400 hover:text-gray-400 ml-3 text-gray-800 dark:text-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler  icon-tabler-chevron-right text-white" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <polyline points="9 6 15 12 9 18" />
                        </svg>
                    </button>
                </div>
                {<div className={isMonth ? "visible" : "invisible hidden"}>
                    <div className='flex flex-row justify-between my-0 mx-3.5'>{weeklist.map((element, index) =>
                        <div className='text-basic-gray text-day text-center weekday' key={index}>
                            {element}
                        </div>)}
                    </div>
                    <div className="flex flex-wrap text-day my-0 mx-3.5 dayContainer">
                        {allCalendarDay.map((element, index) => <div key={index} className={element.selected ? "day selected" : element.isThisMonth ? "day" : "day notThisMonthday"} onClick={onclick} id={index.toString()}>{element.date.getDate()}</div>)}
                    </div>
                </div>}
                <div className={!isMonth ? "visible" : "invisible hidden"}>
                    <div className='flex flex-wrap flex-row gap-9px gap-y-6 my-0 mx-5'>
                        {yearList && yearList.map((element) => <div className={element === selectedYear ? "year selected" : "year"} key={element} onClick={yearClick}>{element}</div>)}
                    </div>
                </div>
                <div className='mt-5 mr-6 flex justify-end text-white gap-16'>
                    <button className='bg-aa' onClick={canelClick}>Cancel</button>
                    <button onClick={okClick}>OK</button>
                </div>
            </div>
        </div>
    );
}