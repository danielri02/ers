import "./App.css"
import { Login } from "./components/Login/Login"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Register } from "./components/Login/Register"
import { ReimbursementListing } from "./components/Reimbursement/ReimbursementListing"
import { Page } from "./components/Pages/Page"
import { Dispatch, SetStateAction, createContext, useState } from "react"
import { UserInterface } from "./interfaces/UserInterface"
import { getUserReimbursements } from "./api/reimbursementAPI"
import { MyReimbursements } from "./components/Pages/MyReimbursements"
import { AllReimbursements } from "./components/Pages/AllReimbursements"
import { AllUsers } from "./components/Pages/AllUsers"
import { AppContext, AppContextType } from "./contexts/AppContext"
import { ReimbursementInterface } from "./interfaces/ReimbursementInterface"

export const AuthContext = createContext<
	[UserInterface, Dispatch<SetStateAction<UserInterface>>] | null
>(null)

function App() {

	const [user, setUser] = useState<UserInterface>({})
	const [employees, setEmployees] = useState<{[key:number]:UserInterface}>({})
	const [reimbursements, setReimbursements] = useState<ReimbursementInterface[]>([])

	return (
		<div className="App">
			<BrowserRouter>
				<AppContext.Provider
					value={
						{
							userState: [user, setUser],
							employeesState: [employees, setEmployees],
							reimbursementsState: [
								reimbursements,
								setReimbursements,
							],
						} as AppContextType
					}
				>
					<Routes>

						{/* Public pages*/}
						<Route
							path="/login"
							element={
								<Page requireAuth={false}>
									<Login />
								</Page>
							}
						/>
						<Route
							path="/register"
							element={
								<Page requireAuth={false}>
									<Register />
								</Page>
							}
						/>
						<Route path="/verify" />

						{/* Private pages*/}
						<Route
							path=""
							element={
								<Page>
									<MyReimbursements />
								</Page>
							}
						/>
						<Route
							path="/reimbursements"
							element={
								<Page>
									<AllReimbursements />
								</Page>
							}
						/>
						<Route
							path="/employees"
							element={
								<Page>
									<AllUsers />
								</Page>
							}
						/>
					</Routes>
				</AppContext.Provider>
			</BrowserRouter>
		</div>
	)
}

export default App
