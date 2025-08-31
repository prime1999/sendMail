import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom";
import RootLayouts from "./layouts/RootLayout";
import HomePage from "./pages/HomePage";

const App = () => {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<>
				<Route path="/" element={<RootLayouts />}>
					<Route index={true} path="/" element={<HomePage />} />
					{/* <Route path="/courses" element={<PrivateUserRoutes />}>
						<Route path="/courses" element={<Courses />} />
					</Route>
					<Route path="/dashboard" element={<PrivateUserRoutes />}>
						<Route path="/dashboard" element={<Dashboard />} />
					</Route>
					<Route path="/tasks" element={<Tasks />}>
						<Route path="/tasks" element={<Tasks />} />
					</Route> */}
				</Route>

				{/* <Route path="/register" element={<SignUp />} />
				<Route path="/signIn" element={<SignIn />} /> */}
				{/* <Route path="/register/student/:userId" element={<Register />} /> */}
				{/* <Route path="/forgotPassword" element={<Forgotpassword />} /> */}
			</>
		)
	);
	return (
		<main>
			<RouterProvider router={router} />
		</main>
	);
};

export default App;
