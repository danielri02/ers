import axios, { AxiosError } from "axios";
import { UserInterface } from "../interfaces/UserInterface";
import { ReimbursementInterface } from "../interfaces/ReimbursementInterface";

export async function getUserReimbursements(user: UserInterface) {
	const response = await axios.get("http://localhost:8080/users/" + user.userId + "/reimbursements")
	// error handling?
	return response
}

export async function getAllReimbursements() {
	const response = await axios.get("http://localhost:8080/reimbursements")
	// error handling?
	return response
}

export async function requestReimbursement(reimbursement: ReimbursementInterface) {
	const response = await axios.post("http://localhost:8080/reimbursements", reimbursement)
	return response
}

export async function resolveReimbursement(reimbursement: ReimbursementInterface) {
	try {
		const response = await axios.patch(
			"http://localhost:8080/reimbursements/" +
				reimbursement.reimbursementId,
			reimbursement
		)
		return response
	} catch (e: any) {
		console.log(e)
		alert(e.response.data)
	}
}