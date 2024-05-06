import { useNavigate } from "react-router-dom"
import { UserInterface } from "../../interfaces/UserInterface"
import { deleteUser } from "../../api/userAPI"
import "./EmployeeItem.css"

interface Props {
	user: UserInterface,
	onChange?: Function
}

export const EmployeeItem: React.FC<Props> = ({user, onChange}) => {

	const navigate = useNavigate() // navigate to user

	const deleteEmployee = async () => {
		try {
			const response = await deleteUser(user)
			if (onChange) {
				onChange()
			}
		} catch (e: any) {
			//alert(e.response.data)
			alert("Cannot delete your own account")
		}
	}

	return (
		<div>
			<details>
				<summary>
					{user.firstName} {user.lastName}
				</summary>
				<div className="inner-details">

				<p>Email: {user.email}</p>
				<p>Role: {user.role}</p>

				<button
					className="delete-employee-button"
					onClick={deleteEmployee}
				>
					Delete Employee
				</button>
				</div>

			</details>
		</div>
	)
}