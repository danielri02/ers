import { useContext, useEffect, useState } from "react"
import "./Login.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../App"
import { axiosSetJwt } from "../../api/userAPI"
import { AppContext } from "../../contexts/AppContext"

export const Login: React.FC = () => {

	const context = useContext(AppContext)
	if (!context) {
		throw Error
	}

	const [user, setUser] = context.userState
	const navigate = useNavigate()

	const login = async () => {
		try {
			const response = await axios.post(
				"http://localhost:8080/login",
				user
			)
			setUser(response.data)
		} catch (e: any) {
			alert(e.response.data)
		}
	}

	useEffect(() => {
		if (user && user.jwt) {
			console.log(user)

			// Set credentials
			axiosSetJwt(user.jwt)

			navigate("/")
		}
	}, [user])

	return (
		<div className="login-box">
			<h2>Employee Reimbursement System</h2>
			<h3>Welcome</h3>
			<div className="login-form">
				<div className="login-email">
					<label htmlFor="login-email-field">Email: </label>
					<input
						id="login-email-field"
						type="email"
						onChange={(input) => setUser({...user, email: input.target.value})}
						onKeyDown={(e) => (e.key == "Enter" ? login() : "")}
					/>
				</div>

				<div className="login-password">
					<label htmlFor="login-password-field">Password: </label>
					<input
						id="login-password-field"
						type="password"
						onChange={(input) => setUser({...user, password: input.target.value})}
						onKeyDown={(e) => (e.key == "Enter" ? login() : "")}
					/>
				</div>
			</div>
			<div>
				<button className="login-button" onClick={login}>Log In</button>
				<button className="login-button" onClick={() => navigate("/register")}>Register</button>
			</div>
		</div>
	)
}