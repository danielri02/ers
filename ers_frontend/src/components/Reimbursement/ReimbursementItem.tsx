import { useNavigate } from "react-router-dom"

import "./ReimbursementItem.css"
import { ReimbursementInterface } from "../../interfaces/ReimbursementInterface"
import { resolveReimbursement } from "../../api/reimbursementAPI"
import { UserInterface } from "../../interfaces/UserInterface"
import { AppContext } from "../../contexts/AppContext"
import { useContext } from "react"

interface Props {
	reimbursement: ReimbursementInterface,
	employee: UserInterface,
	onResolve?: Function
}

export const ReimbursementItem: React.FC<Props> = ({reimbursement, employee, onResolve}) => {
	const navigate = useNavigate() // navigate to user

	const context = useContext(AppContext)
	const [user, setUser] = context.userState

	if (!reimbursement || !reimbursement.status || !employee) {
		return null
	}

	return (
		<div>
			<details>
				<summary
					style={{
						backgroundColor: {
							Pending: "yellow",
							Cancelled: "gray",
							Approved: "green",
							Denied: "red",
						}[reimbursement.status],
					}}
				>
					{employee.firstName + " " + employee.lastName} : $
					{reimbursement.amount}
				</summary>

				<div className="inner-details">
					<p>Description: {reimbursement.description}</p>
					<p>Status: {reimbursement.status}</p>

					{user.role == "Manager" && reimbursement.status == "Pending" ? (
						<div className="reimbursement-resolution">
							<button
								className="reimbursement-approve"
								onClick={async () => {
									await resolveReimbursement({
										...reimbursement,
										status: "Approved",
									})
									onResolve && onResolve()
								}}
							>
								Approve
							</button>
							<button
								className="reimbursement-deny"
								onClick={async () => {
									await resolveReimbursement({
										...reimbursement,
										status: "Denied",
									})
									onResolve && onResolve()
								}}
							>
								Deny
							</button>
						</div>
					) : null}
				</div>
			</details>
		</div>
	)
}