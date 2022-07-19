import React, { useState, useEffect, useRef, FC } from "react";
import style from "./LoginForm.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import classNames from "classnames";
import {
	requestRecaptchVerifier,
	signInWithPhone,
	verifyOTP,
} from "../../Controllers/FirebaseController";
import { FirebaseError } from "firebase/app";
import { error } from "console";
import { getErrorMessage } from "../../utils/errorHandling";

interface LoginFormProps {
	setStep: (step: number) => void;
}

export const LoginForm: FC<LoginFormProps> = ({ setStep }) => {
	// DOM reference for OTP input
	const otpInput = useRef<HTMLInputElement>(null);

	const [stage, setStage] = useState(1);

	// Styles for phone number input
	const PhoneInputClasses: string = classNames(style.styledInput, {
		[style.disabled]: stage === 2,
	});

	// Styles for OTP input
	const OtpInputClasses: string = classNames(style.styledInput, {
		[style.hidden]: stage !== 2,
	});

	// remove RECAPTCHA if it's already created
	useEffect((): void => {
		if (window.recaptchaVerifier) {
			window.recaptchaVerifier.recaptcha?.reset();
			window.recaptchaVerifier.clear();
		}

		requestRecaptchVerifier();
	}, []);

	// Formik settings
	const formik = useFormik({
		initialValues: {
			phone: "",
			otp: "",
		},
		validationSchema: Yup.object({
			phone: Yup.string()
				.matches(/^\+?\d{10,15}$/)
				.required("Введите номер телефона"),
			otp: Yup.string()
				.length(6, "Проверьте правильность кода из SMS")
				.required("Введите код из SMS"),
		}),
		onSubmit: (values): void => {
			// Verify OTP, then redirect to calendar page
			verifyOTP(values.otp)
				.then((): void => {
					sessionStorage.setItem(
						"appointmentPhone",
						JSON.stringify(values.phone)
					);
					setStep(1);
				})
				.catch((error: FirebaseError): void => {});
		},
	});

	// Handle "Next" button click
	const handleSubmit = (): void => {
		if (!formik.errors.phone && formik.touched.phone && stage === 1) {
			// After first click send SMS with OTP, disable input, show OTP input and start timer
			signInWithPhone(formik.values.phone)
				.then((): void => {
					setStage(2);
					// Focus on OTP input
					const node = otpInput.current;
					node?.focus();
				})
				.catch((error): void => {
					getErrorMessage(error);
				});
		}
	};

	return (
		<div className={style.loginForm__wrapper}>
			<form className={style.loginForm} onSubmit={formik.handleSubmit}>
				<div className={style.form__title}>
					<h1>Login</h1>
					<span>
						Lorem ipsum, dolor sit amet consectetur adipisicing
						elit. Cum, quibusdam.
					</span>
				</div>
				<div className={style.input__container}>
					<input
						autoFocus
						className={PhoneInputClasses}
						placeholder="Phone number"
						type="tel"
						name="phone"
						value={formik.values.phone}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						style={
							formik.errors.phone && formik.touched.phone
								? {
										borderLeft: "solid 10px #fdb1aa",
										borderBottom: "solid 1px #fdb1aa",
								  }
								: {}
						}
					/>
					<input
						ref={otpInput}
						className={OtpInputClasses}
						placeholder="OTP"
						type="text"
						name="otp"
						value={formik.values.otp}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						style={
							formik.errors.otp && formik.touched.otp
								? {
										borderLeft: "solid 10px #fdb1aa",
										borderBottom: "solid 1px #fdb1aa",
								  }
								: {}
						}
					/>
				</div>
				<button
					type="submit"
					onClick={() => handleSubmit()}
					className={style.form__button}>
					Next
				</button>
			</form>
			<div id="recapcha-container"></div>
		</div>
	);
};
