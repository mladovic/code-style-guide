import { NavLink } from "react-router-dom";
import generateNav, { NavItem } from "../lib/generateNav";

export function Sidebar() {
  const navItems = generateNav();

  const renderNav = (items: NavItem[]): React.ReactNode => (
    <ul className="pl-4">
      {items.map((item) => (
        <li key={item.path} className="mb-2">
          {item.path !== "#" ? (
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? "font-bold text-blue-700"
                  : "text-blue-500 hover:underline"
              }
            >
              {item.title}
            </NavLink>
          ) : (
            <span className="font-semibold">{item.title}</span>
          )}
          {item.children &&
            item.children.length > 0 &&
            renderNav(item.children)}
        </li>
      ))}
    </ul>
  );

  return (
    <nav className="w-64 bg-gray-100 p-4 overflow-auto">
      {renderNav(navItems)}
    </nav>
  );
}
