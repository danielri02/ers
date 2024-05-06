import { ReactNode, useContext, useEffect, useState } from "react"
import { AuthContext } from "../../App"
import { Link, useNavigate } from "react-router-dom"
import "./Page.css"
import { axiosDeleteJwt } from "../../api/userAPI"
import { AppContext } from "../../contexts/AppContext"


interface Props {
	children?: ReactNode,
	requireAuth?: boolean 
}

export const Page: React.FC<Props> = ({children, requireAuth = true}) => {
	const context = useContext(AppContext)
	if (!context) {
		throw Error
	}

	const [user, setUser] = context.userState
	const [authenticated, setAuthenticated] = useState(
		user != null && user.jwt != null
	)
	const navigate = useNavigate()

	useEffect(() => {
		if (requireAuth && (!user || !user.jwt)) {
			if (localStorage.getItem("jwt")) {
				// use jwt to get userinfo from backend
				//setUser({...user, user.jwt:})
				// better for presentation not to do this
			}
			navigate("/login")
			return
		}
		setAuthenticated(user != null && user.jwt != null)
	}, [navigate, user])

	const logoff = () => {
		setUser({})
		axiosDeleteJwt()
	}

	return (
		<div className="page-container">
			{user && user.jwt ? (
				<div className="nav-menu">
					<div>
						<div>
							{user.firstName} {user.lastName} <span> </span>
							<button onClick={() => logoff()}>Log Off</button>
						</div>
					</div>

					{user && user.role && user.role == "Manager" ? (
						<div>
							<Link to="/">Home</Link>
							<span> </span>
							<Link to="/reimbursements">
								AllReimbursements
							</Link>{" "}
							<span> </span>
							<Link to="/employees">AllUsers</Link> <span> </span>
						</div>
					) : null}
				</div>
			) : null}
			<main>
				{!requireAuth || (requireAuth && authenticated)
					? children
					: null}
			</main>
		</div>
	)
}