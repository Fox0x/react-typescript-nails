import classNames from 'classnames';
import { FC } from 'react';

import style from './TimePicker.module.css';


interface TimePickerTileProps {
    time: string;
    isAvailable: boolean;
    onClick: (time: string) => void;
}

export const TimePickerTile: FC<TimePickerTileProps> = ({ time, isAvailable, onClick })=> {
    const timePickerTileClasses = classNames(style.timePickerTile, {
        [style.timePickerTile__unavailable]: !isAvailable,
    });

    const clickHandler = (time: string):void => {
        onClick(time);
    };

    return (
        <div
            className={timePickerTileClasses}
            onClick={() => clickHandler(time)}>
            {time}
        </div>
    );
};