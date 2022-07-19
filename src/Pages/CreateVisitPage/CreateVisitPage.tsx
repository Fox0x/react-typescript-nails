import {
	BookOutlined,
	ClockCircleOutlined,
	LoadingOutlined,
	SmileOutlined,
	UserOutlined,
} from "@ant-design/icons";
import { Steps } from "antd";
import "antd/dist/antd.less";
import React, { FC, useState } from "react";
import { Calendar } from "../../Components/Calendar/Calendar";
import { LoginForm } from "../../Components/LoginForm/LoginForm";
import { ReminderForm } from "../../Components/ReminderForm/ReminderForm";
import { VisitConfirmation } from "../../Components/VisitConfirmation/VisitConfirmation";
import style from "./CreateVisitPage.module.css";

export const CreateVisitPage: FC = () => {
	const { Step } = Steps;
	const [currentStep, setCurrentStep] = useState<number>(1);
	const setStep = (step: number) => {
		setCurrentStep(step);
	};

	return (
		<div className={style.createVisit__wrapper}>
			<div className={style.steps}>
				<Steps current={currentStep}>
					<Step
						title="Login"
						description="Welcome! ❤️"
						icon={
							currentStep === 0 ? (
								<LoadingOutlined />
							) : (
								<UserOutlined />
							)
						}
					/>
					<Step
						title="Make a visit"
						description="Choose a date and time for your visit"
						icon={
							currentStep === 1 ? (
								<LoadingOutlined />
							) : (
								<BookOutlined />
							)
						}
					/>
					<Step
						title="Remind?"
						description="We can remind you about your visit"
						icon={
							currentStep === 2 ? (
								<LoadingOutlined />
							) : (
								<ClockCircleOutlined />
							)
						}
					/>
					<Step
						title="Done"
						description="Check information about your visit"
						icon={
							currentStep === 3 ? (
								<LoadingOutlined />
							) : (
								<SmileOutlined />
							)
						}
					/>
				</Steps>
			</div>
			<div className={style.content}>
				{currentStep === 0 && <LoginForm setStep={setStep} />}
				{currentStep === 1 && <Calendar setStep={setStep} />}
				{currentStep === 2 && <ReminderForm setStep={setStep} />}
				{currentStep === 3 && <VisitConfirmation setStep={setStep} />}
			</div>
		</div>
	);
};
