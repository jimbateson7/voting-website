import { Outlet, Link } from "react-router-dom";
import "./Layout.css";

const Layout = () => {
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/MemberArea">Member Area</Link>
                    </li>          
                </ul>
            </nav>

            <Outlet />
        </div>
    )
};

export default Layout;