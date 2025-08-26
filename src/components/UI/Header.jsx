import { NavLink } from "react-router-dom"

const Header = () => {

    return (
        <header>
            <div className="container">
                <nav>
                    <div className="logo-container">
                        <span className="brand-name">Umair TanStack</span>
                    </div>
                    <ul>
                        <li>
                            <NavLink to='/'>Home</NavLink>
                        </li>
                        <li>
                            <NavLink to='/trad'>Traditional</NavLink>
                        </li>
                        <li>
                            <NavLink to='/rq'>React Query</NavLink>
                        </li>
                        <li>
                            <NavLink to='/infinite'>Infinite Scroll</NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header