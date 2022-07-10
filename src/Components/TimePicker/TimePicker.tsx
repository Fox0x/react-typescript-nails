import React, { FC } from 'react';

import style from './TimePicker.module.css';
import { TimePickerTile } from './TimePickerTile';

interface TimerPickerProps {
	onClick: (time: string) => void;
}

export const TimePicker: FC<TimerPickerProps> = ({ onClick }) => {
	const timeList: any = {
		"9:00": true,
		"10:00": true,
		"11:00": true,
		"12:00": true,
		"13:00": true,
		"14:00": true,
		"15:00": true,
		"16:00": true,
		"17:00": true,
		"18:00": true,
	};

	timeList["9:00"] = false;
	timeList["15:00"] = false;
	// Короче, хук принимающий в себя выбранную дату и возвращающий массив 
	// занятого времениб потом время передаём в таймпикер и блочим его.
	

	return (
		<div className={style.timePicker__wrapper}>
			<div className={style.timeList__wrapper}>
				{Object.keys(timeList).map((time) => {
					return (
						<TimePickerTile
							key={time}
							time={time}
							isAvailable={timeList[time]}
							onClick={(time) => onClick(time)}
						/>
					);
				})}
			</div>
		</div>
	);
};
