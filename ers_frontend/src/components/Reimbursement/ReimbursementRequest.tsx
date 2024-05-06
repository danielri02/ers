import { useContext, useEffect, useState } from "react"
import { requestReimbursement } from "../../api/reimbursementAPI"
import { ReimbursementInterface } from "../../interfaces/ReimbursementInterface"
import { AuthContext } from "../../App"
import { AppContext } from "../../contexts/AppContext"

interface Props {
	onSubmit: Function
}

export const ReimbursementRequest: React.FC<Props> = ({onSubmit}) => {

	const context = useContext(AppContext)
	if (!context) {
		throw Error
	}

	const [user, setUser] = context.userState

	const [reimbursement, setReimbursement] = useState<ReimbursementInterface>({} as ReimbursementInterface)
	const [inputs, setInputs] = useState({description: "", amount: "" as string | number})
	if (!reimbursement || !inputs) {
		throw Error
	}

	const submit = () => {
		if (reimbursement && user && user.userId) {
			setReimbursement({
				userId: user.userId,
				description: inputs.description,
				amount: inputs.amount as number,
			})
			setInputs({description: "", amount: ""})
		}
	}

	const sendRequest = async () => {
		const response = await requestReimbursement(reimbursement)
		onSubmit()
	}

	useEffect(() => {
		if (reimbursement.userId && reimbursement.description && reimbursement.amount) {
			sendRequest()
		}
	}, [reimbursement])

	return (
		<div>
			<h2>New Reimbursement</h2>
			<div className="reimbursement-description">
				<label htmlFor="reimbursement-description-field">
					Description:{" "}
				</label>
				<input
					id="reimbusement-description-field"
					type="text"
					value={inputs.description}
					onChange={(input) => setInputs({...inputs, description: input.target.value})}
					onKeyDown={(e) => (e.key == "Enter" ? submit() : "")}
				/>
			</div>
			<div className="reimbursement-amount">
				<label htmlFor="reimbursement-amount-field">Amount: </label>
				<input
					id="reimbusement-amount-field"
					type="number"
					value={inputs.amount}
					onChange={(input) => setInputs({...inputs, amount: input.target.valueAsNumber})}
					onKeyDown={(e) => (e.key == "Enter" ? submit() : "")}
				/>
			</div>
			<button onClick={submit}>Submit</button>
		</div>
	)
}