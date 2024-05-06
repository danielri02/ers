
// Sort by date, sort by amount?
// Filter by status
// Filter by user email, id, role

import { useEffect, useState } from "react"

export interface ReimbursementOptions {
	pending: boolean,
	approved: boolean,
	denied: boolean
}

interface Props {
	onChange?: Function
}

export const ReimbursementListingOptions: React.FC<Props> = ({onChange}) => {

	const [options, setOptions] = useState<ReimbursementOptions>({
		pending: true,
		approved: true,
		denied: true,
	})

	useEffect(() => {
		if (onChange) {
			onChange(options)
		}

	}, [options])

	return (
		<div className="reimbursement-listing-options">
			<div className="reimbursemnt-status-filter">
				<label>
					Pending
					<input
						type="checkbox"
						checked={options.pending}
						onChange={() =>
							setOptions({ ...options, pending: !options.pending })
						}
					/>
				</label>
				<label>
					Approved
					<input
						type="checkbox"
						checked={options.approved}
						onChange={() =>
							setOptions({ ...options, approved: !options.approved })
						}
					/>
				</label>
				<label>
					Denied
					<input
						type="checkbox"
						checked={options.denied}
						onChange={() =>
							setOptions({ ...options, denied: !options.denied })
						}
					/>
				</label>
			</div>
		</div>
	)
}