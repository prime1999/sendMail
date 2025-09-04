import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RootLayouts from "./layouts/RootLayout";
import HomePage from "./pages/HomePage";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import PrivateRoutes from "./components/PrivateRoutes";
import Dashboard from "./pages/Dashboard";

const queryClient = new QueryClient();

const App = () => {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<>
				<Route path="/" element={<RootLayouts />}>
					<Route index={true} path="/" element={<HomePage />} />
					<Route path="/dashboard" element={<PrivateRoutes />}>
						<Route path="/dashboard" element={<Dashboard />} />
					</Route>
					{/* <Route path="/courses" element={<PrivateUserRoutes />}>
						<Route path="/courses" element={<Courses />} />
					</Route>
					<Route path="/tasks" element={<Tasks />}>
						<Route path="/tasks" element={<Tasks />} />
					</Route> */}
				</Route>

				{/* <Route path="/register" element={<SignUp />} />*/}
				<Route path="/signIn" element={<SignIn />} />
				<Route path="/register" element={<Register />} />
				{/* <Route path="/forgotPassword" element={<Forgotpassword />} /> */}
			</>
		)
	);
	return (
		<main>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
			</QueryClientProvider>
		</main>
	);
};

export default App;
