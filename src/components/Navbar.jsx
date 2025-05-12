import { NavLink } from "react-router-dom";
import { useAuthentication } from "../hooks/useAuthentication";
import { useAuthValue } from "../context/AuthContext";
import { useState } from "react";
import Button from "./Button";
import { IoMdPersonAdd } from "react-icons/io";
import { CiLogin } from "react-icons/ci";

const Navbar = () => {
  const { user } = useAuthValue();
  const { logout } = useAuthentication();
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <>
      <nav className="flex items-center justify-between px-4 py-2 fixed w-full bg-white shadow-lg">
        <div className="text-black">
          <NavLink to="/" className="text-xl font-extrabold">
            <span className="text-base font-normal uppercase">Mini</span>DevBlog
          </NavLink>

          <button className="" onClick={toggleMenu}></button>
        </div>

        <ul className="flex items-center gap-4">
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `py-1 ${isActive ? "border-b-2" : ""}`
              }
            >
              Sobre
            </NavLink>
          </li>

          {!user && (
            <>
              <li className="">
                <Button className="">
                  <NavLink to="/login" className="flex items-center gap-1">
                    <CiLogin className="size-6" />
                    <span>Entrar</span>
                  </NavLink>
                </Button>
              </li>

              <li>
                <Button>
                  <NavLink to="/register" className="flex items-center gap-1">
                    <IoMdPersonAdd className="size-6" />
                    <span>Registrar</span>
                  </NavLink>
                </Button>
              </li>
            </>
          )}

          {user && (
            <>
              <li>
                <NavLink
                  to="/post/new"
                  className={({ isActive }) =>
                    `py-1 ${isActive ? "border-b-2" : ""}`
                  }
                >
                  Novo post
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `py-1 ${isActive ? "border-b-2" : ""}`
                  }
                >
                  Dashboard
                </NavLink>
              </li>
            </>
          )}

          {user && (
            <li>
              <Button onClick={logout} className="">
                Sair
              </Button>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
