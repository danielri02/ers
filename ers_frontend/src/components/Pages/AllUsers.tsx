import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { ReimbursementInterface } from "../../interfaces/ReimbursementInterface";
import { getAllReimbursements } from "../../api/reimbursementAPI";
import { EmployeeListing } from "../Employee/EmployeeListing";
import { getAllUsers } from "../../api/userAPI";
import { UserInterface } from "../../interfaces/UserInterface";
import { AppContext } from "../../contexts/AppContext";


export const AllUsers: React.FC = () => {

	const context = useContext(AppContext);
	if (!context) {
		throw Error;
	}

	const [user, setUser] = context.userState;
	const [users, setUsers] = useState<UserInterface[]>([]);
	const navigate = useNavigate();

	async function getUsers() {
		const response = await getAllUsers();
		setUsers(response.data);
	}

	useEffect(() => {
		getUsers();
	}, []);


	return (
		<div>
			<h2>All Employees:</h2>
			<EmployeeListing employees={users} onChange={getUsers}/>
		</div>
	);
};
