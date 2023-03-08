import { Link, useMatch, useResolvedPath } from "react-router-dom";

export default function Navbar() {
  // localStorage.setItem("UserId", "6336c0b48e743d96687dc047");
  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        Ticket Booking
      </Link>
      <ul>
        <CustomLink to="/channel">Add New Member</CustomLink>
        <CustomLink to="/allmembers"> All Member Details</CustomLink>
      </ul>
    </nav>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
