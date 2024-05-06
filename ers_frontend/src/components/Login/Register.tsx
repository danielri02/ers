import { useContext, useEffect } from "react"
import "./Register.css"
import { AuthContext } from "../../App"
import { loginUser, registerUser } from "../../api/userAPI"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { AppContext } from "../../contexts/AppContext"

export const Register: React.FC = () => {

	const context = useContext(AppContext)
	if (!context) {
		throw Error
	}

	const [user, setUser] = context.userState

	const submit = async () => {
		try {
			const registerResponse = await registerUser(user)
			console.log(registerResponse.data)

			const response = await loginUser(user)
			console.log(response)

			setUser(response.data)
		} catch (e: any) {
			alert(e.response.data)
		}
	}

	const navigate = useNavigate()

	useEffect(() => {
		if (user && user.jwt) {
			console.log(user)

			// Set credentials
			localStorage.setItem("jwt",user.jwt)
			axios.defaults.headers.common[
				"Authorization"
			] = `Bearer ${user.jwt}`

			navigate("/")
		}
	}, [user])

	return (
		<div className="register">
			<h3>Register new account</h3>
			<div className="register-form">
				<div className="register-email">
					<label htmlFor="register-email-field">Email: </label>
					<input
						id="register-email-field"
						type="email"
						onChange={(input) =>
							setUser({ ...user, email: input.target.value })
						}
						onKeyDown={(e) => (e.key == "Enter" ? submit() : "")}
					/>
				</div>
				<div className="register-password">
					<label htmlFor="register-password-field">Password: </label>
					<input
						id="register-password-field"
						type="password"
						onChange={(input) =>
							setUser({ ...user, password: input.target.value })
						}
						onKeyDown={(e) => (e.key == "Enter" ? submit() : "")}
					/>
				</div>
				<div className="firstName">
					<label htmlFor="firstName-field">First Name: </label>
					<input
						id="firstName-field"
						type="text"
						onChange={(input) =>
							setUser({ ...user, firstName: input.target.value })
						}
						onKeyDown={(e) => (e.key == "Enter" ? submit() : "")}
					/>
				</div>
				<div className="lastName">
					<label htmlFor="lastName-field">Last Name: </label>
					<input
						id="lastName-field"
						type="text"
						onChange={(input) =>
							setUser({ ...user, lastName: input.target.value })
						}
						onKeyDown={(e) => (e.key == "Enter" ? submit() : "")}
					/>
				</div>
			</div>
			<button className="register-button" onClick={submit}>
				Register
			</button>
		</div>
	)
}