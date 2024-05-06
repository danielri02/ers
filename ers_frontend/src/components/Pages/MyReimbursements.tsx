import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../App"
import { getUserReimbursements } from "../../api/reimbursementAPI"
import { ReimbursementInterface } from "../../interfaces/ReimbursementInterface"
import { ReimbursementListing } from "../Reimbursement/ReimbursementListing"
import { ReimbursementRequest } from "../Reimbursement/ReimbursementRequest"
import { useNavigate } from "react-router-dom"
import { UserInterface } from "../../interfaces/UserInterface"
import { AppContext } from "../../contexts/AppContext"
import { ReimbursementListingOptions, ReimbursementOptions } from "../Reimbursement/ReimbursementListingOptions"

export const MyReimbursements: React.FC = () => {

	const context = useContext(AppContext)
	if (!context) {
		throw Error
	}

	const [user, setUser] = context.userState
	const [reimbursements, setReimbursements] = context.reimbursementsState
	const [selectedReimbursements, setSelectedReimbursements] = useState<ReimbursementInterface[]>([])
	const navigate = useNavigate()

	let ops: ReimbursementOptions = {
		pending: true,
		approved: true,
		denied: true
	}

	async function getReimbursements() {
		try {
			const response = await getUserReimbursements(user)
			if (response.status >= 400) {
				throw new Error(response.status + ": " + response.data)
			}
			setReimbursements(response.data)
		} catch (e) {
			console.log(e)
		}
	}
	useEffect(() => {
		selectReimbursements(ops)
	}, [reimbursements])

	function selectReimbursements(options: ReimbursementOptions) {
		ops = options
		setSelectedReimbursements(
			reimbursements.filter((r) => {
				switch (r.status) {
					case "Pending":
						return options.pending
					case "Approved":
						return options.approved
					case "Denied":
						return options.denied
				}
			})
		)
	}

	useEffect(() => {
		getReimbursements()
	}, [])

	if (!user || !user.userId) {
		return null
	}

	const users : {[key: number]: UserInterface} = {}
	users[user.userId] = user

	return (
		<div>
			<ReimbursementRequest onSubmit={getReimbursements} />
			<ReimbursementListingOptions onChange={selectReimbursements}/>
			<ReimbursementListing
				reimbursements={selectedReimbursements}
				users={users}
				onChange={getReimbursements}
			/>
		</div>
	)
}