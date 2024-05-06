import { Dispatch, SetStateAction, createContext } from "react";
import { UserInterface } from "../interfaces/UserInterface";
import { ReimbursementInterface } from "../interfaces/ReimbursementInterface";

export interface AppContextType {
	userState: [UserInterface, Dispatch<SetStateAction<UserInterface>>]
	employeesState:
		| [
				{ [key: number]: UserInterface },
				Dispatch<SetStateAction<{ [key: number]: UserInterface }>>
		  ]
	reimbursementsState:
		| [
				ReimbursementInterface[],
				Dispatch<SetStateAction<ReimbursementInterface[]>>
		  ]
}

export const AppContext = createContext<AppContextType>({} as AppContextType)