import React, { FC } from "react";
import style from "./ReminderForm.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Checkbox } from "antd";
import classNames from "classnames";
import { CheckboxChangeEvent } from "antd/lib/checkbox";

interface ReminderFormProps {
	setStep: (step: number) => void;
}

export const ReminderForm: FC<ReminderFormProps> = ({ setStep }) => {
	const [isCheckedPhonePushNotification, setIsCheckedPhonePushNotification] = React.useState(false);
	// Formik settings
	const formik = useFormik({
		initialValues: {
			mail: "",
		},
		validationSchema: Yup.object({
			mail: Yup.string().email("Enter correct mail"),
		}),
		onSubmit: (values) => {
			values.mail
				? sessionStorage.setItem(
						"appointmentMail",
						JSON.stringify(values.mail)
				  )
				: sessionStorage.removeItem("appointmentMail");

			isCheckedPhonePushNotification
				? sessionStorage.setItem(
						"appointmentPhonePushNotification",
						"true"
				  )
				: sessionStorage.removeItem("appointmentPhonePushNotification");

			setStep(3);
		},
	});

	const buttonClasses = classNames(style.form__button, {
		[style.disabled]: !formik.isValid,
	});

	return (
		<form className={style.remindForm} onSubmit={formik.handleSubmit}>
			<div className={style.form__title}>
				<h2>Do you want a reminder?</h2>
				<span>
					Enter your email or check the box and we will remind you
					about the visit in advance.
				</span>
			</div>
			<div className={style.input__container}>
				<input
					autoFocus
					className={style.styledInput}
					placeholder="Mail"
					type="text"
					name="mail"
					value={formik.values.mail}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					style={
						formik.errors.mail ? {
							borderLeft: "solid 10px #fdb1aa",
							borderBottom: "solid 1px #fdb1aa",
						} : {}
					}
				/>
			</div>
			<Checkbox
				className={style.checkbox}
				onChange={(e: CheckboxChangeEvent): void =>
					setIsCheckedPhonePushNotification(e.target.checked)
				}>
				Push notification on phone
			</Checkbox>
			<button
				type="submit"
				// onClick={() => handleSubmit()}
				className={buttonClasses}>
				{formik.values.mail || isCheckedPhonePushNotification
					? "Next"
					: "Skip"}
			</button>
		</form>
	);
};
