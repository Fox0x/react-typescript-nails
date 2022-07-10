import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CreateVisitPage } from "./Pages/CreateVisitPage/CreateVisitPage";

export const App: FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<CreateVisitPage />} />
			</Routes>
		</BrowserRouter>
	);
};
