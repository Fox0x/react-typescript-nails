import React, { FC } from "react";
import style from "./VisitConfirmation.module.css";

interface VisitConfirmationProps {
	setStep: (step: number) => void;
}

export const VisitConfirmation: FC<VisitConfirmationProps> = ({ setStep }) => {

	const visitInfo: {
		phone: string | undefined;
		date: string | null;
		time: string | null;
		mail: string | null;
		appointmentPPN: string | null;
	} = {
		phone: sessionStorage.getItem("appointmentPhone")?.replaceAll('"', ""),
		date: sessionStorage.getItem("appointmentDate") || null,
		time: sessionStorage.getItem("appointmentTime"),
		mail:
			sessionStorage.getItem("appointmentMail")?.replaceAll('"', "") ||
			null,
		appointmentPPN:
			sessionStorage.getItem("appointmentPhonePushNotification") || null,
	};

	return (
		<div className={style.visitConfirmation__wrapper}>
			<h1>Well Done! 💅</h1>
			<span>Let's check all the information</span>
			<div className={style.visitConfirmation__content}>
				<div className={style.visitConfirmation__content__row}>
					<div
						className={style.visitConfirmation__content__item}
						id={style.date}>
						{visitInfo.date} 📅
					</div>
					<div
						className={style.visitConfirmation__content__item}
						id={style.time}>
						{visitInfo.time} 🕓
					</div>
				</div>
				<div
					className={style.visitConfirmation__content__item}
					id={style.phoneNumber}>
					{visitInfo.phone} ☎️
				</div>
				{visitInfo.mail ? (
					<div
						className={style.visitConfirmation__content__item}
						id={style.mail}>
						{visitInfo.mail} ✉️
					</div>
				) : null}
			</div>
			<div className={style.visitConfirmation__buttons}>
				<button
					className={style.visitConfirmation__buttons_change}
					onClick={() => setStep(1)}>
					Change ✏️
				</button>
				<button className={style.visitConfirmation__buttons_confirm}>
					Confirm ✔️
				</button>
			</div>
		</div>
	);
};
