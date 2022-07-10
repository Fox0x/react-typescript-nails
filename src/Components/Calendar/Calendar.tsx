import { DatePicker} from "antd";
import classNames from "classnames";
import { FC, useEffect, useState } from "react";

import { TimePicker } from "../../Components/TimePicker/TimePicker";
import style from "./Calendar.module.css";

import type { DatePickerProps } from "antd";
import type { RangePickerProps } from "antd/es/date-picker";

interface CalendarProps {
	setStep: (step: number) => void;
}

export const Calendar: FC<CalendarProps> = ({ setStep }) => {
	const [selectedTime, setSelectedTime] = useState<string | null>(null);
	const [selectedDate, setSelectedDate] = useState<any | null>(null);

	const timePickerClasses = classNames(style.timePicker, {
		[style.timePicker__hidden]: !selectedDate,
	});

	const onChange: DatePickerProps["onChange"] = (date?) => {
		setSelectedDate(date);
	};

	useEffect((): void => {
		if (selectedTime && selectedDate) {
			const appointmentDate = new Date(new Date(selectedDate))
				.toString()
				.substring(0, 10);
			sessionStorage.setItem("appointmentDate", appointmentDate);
			sessionStorage.setItem("appointmentTime", selectedTime);
			setStep(2);
		}
	}, [selectedTime, selectedDate]);

	// Exclude weekends and past dates from available time slots
	const disabledDate: RangePickerProps["disabledDate"] = (current) => {
		return (
			(current && current.toDate().getDay() === 0) ||
			current.toDate().getDay() === 6
		);
	};

	return (
		<div className={style.calendar__wrapper}>
			<div className={style.datePicker}>
				<DatePicker
					dropdownClassName={style.calendar__dropdown}
					disabledDate={disabledDate}
					showToday={false}
					bordered={false}
					onChange={onChange}
					open
					style={{
						// Hide the input field
						opacity: 0,
					}}
				/>
			</div>

			<div className={timePickerClasses}>
				<TimePicker onClick={(time): void => setSelectedTime(time)} />
			</div>
		</div>
	);
};
