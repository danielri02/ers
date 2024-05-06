import { useContext, useEffect, useState } from "react"
import { ReimbursementListing } from "../Reimbursement/ReimbursementListing"
import { AuthContext } from "../../App"
import { useNavigate } from "react-router-dom"
import { ReimbursementInterface } from "../../interfaces/ReimbursementInterface"
import { getAllReimbursements } from "../../api/reimbursementAPI"
import { ReimbursementListingOptions, ReimbursementOptions } from "../Reimbursement/ReimbursementListingOptions"
import { UserInterface } from "../../interfaces/UserInterface"
import { getAllUsers } from "../../api/userAPI"
import { AppContext } from "../../contexts/AppContext"

export const AllReimbursements: React.FC = () => {

	const context = useContext(AppContext)
	if (!context) {
		throw Error
	}

	const [employees, setEmployees] = context.employeesState
	const [reimbursements, setReimbursements] = context.reimbursementsState
	const [selectedReimbursements, setSelectedReimbursements] = useState<ReimbursementInterface[]>([])
	const navigate = useNavigate()

	let ops: ReimbursementOptions = {
		pending: true,
		approved: true,
		denied: true,
	}

	async function getReimbursements() {
		let response = await getAllReimbursements()
		setReimbursements(response.data)

		response = await getAllUsers()

		setEmployees(
			response.data.reduce((us: {[key: number]: UserInterface}, u: UserInterface) => {
				if (u.userId) {
					us[u.userId] = u
				}
				return us
			}, {})
		)
	}
	useEffect(() => {
		selectReimbursements(ops)
	}, [reimbursements])

	function selectReimbursements(options: ReimbursementOptions) {
		ops = options
		setSelectedReimbursements(reimbursements.filter((r) => {
			switch (r.status) {
				case "Pending": return options.pending
				case "Approved": return options.approved
				case "Denied": return options.denied
			}
		}))
	}

	useEffect(() => {
		getReimbursements()
	}, [])

	return (
		<div>
			<h2>All Reimbursements:</h2>
			<ReimbursementListingOptions onChange={selectReimbursements}/>
			{selectedReimbursements && employees ?
			<ReimbursementListing reimbursements={selectedReimbursements} users={employees} onChange={getReimbursements}/>
			: null
}
		</div>
	)
}