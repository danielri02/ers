import { useLocation } from "react-router-dom"
import { ReimbursementItem } from "./ReimbursementItem"
import { ReimbursementInterface } from "../../interfaces/ReimbursementInterface"
import "./ReimbursementListing.css"
import { UserInterface } from "../../interfaces/UserInterface"

interface Props {
	reimbursements: ReimbursementInterface[]
	users: {[key:number]: UserInterface}
	onChange?: Function
}

export const ReimbursementListing: React.FC<Props> = ({reimbursements, users, onChange}) => {

	//const {x} = useLocation().state || {} // get filter params

	return (
		<div className="reimbursementListing">
			{reimbursements && users
				? reimbursements.map((r, index) => {
						if (r && r.userId) {
							return (
								<ReimbursementItem
									reimbursement={r}
									employee={users[r.userId]}
									onResolve={onChange}
									key={"rmb" + index}
								/>
							)
						}
				  })
				: null}
		</div>
	)
}