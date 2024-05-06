import { useLocation } from "react-router-dom"
import { UserInterface } from "../../interfaces/UserInterface"
import { EmployeeItem } from "./EmployeeItem"

interface Props {
	employees: UserInterface[]
	onChange?: Function
}

export const EmployeeListing: React.FC<Props> = ({employees, onChange}) => {

	const {x} = useLocation().state || {} // get filter params
	console.log(x)

	console.log(employees)

	return (
		<div className="reimbursementListing">
			{employees.map((e, index) => {
				return (
					<EmployeeItem
						user={e}
						onChange={onChange}
						key={"emp" + index}
					/>
				)
			})}
		</div>
	)
}