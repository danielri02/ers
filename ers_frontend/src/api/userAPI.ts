import axios from "axios"
import { UserInterface } from "../interfaces/UserInterface"

export function axiosSetJwt(jwt: string) {
			//localStorage.setItem("jwt", jwt) // better to use cookies
			axios.defaults.headers.common.Authorization = `Bearer ${jwt}`
}

export function axiosDeleteJwt() {
			//localStorage.removeItem("jwt")
			delete axios.defaults.headers.common.Authorization
}

export async function registerUser(user: UserInterface) {
	const response = await axios.post("http://localhost:8080/register", user)
	//throw Error(response.data) // invalid email or whatever
	return response
}

export async function loginUser(user: UserInterface) {
	const response = await axios.post("http://localhost:8080/login", user)
	return response
}

export async function getAllUsers() {
	const response = await axios.get("http://localhost:8080/users")
	return response
}

export async function getUser(user: UserInterface) {
	const response = await axios.get("http://localhost:8080/users/" + user.userId)
	return response
}

export async function updateUser(user: UserInterface) {
}

export async function deleteUser(user: UserInterface) {
	const response = await axios.delete("http://localhost:8080/users/" + user.userId)
	return response
}