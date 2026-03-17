import React from "react";
import {Container , Logo, LogoutBtn} from '../index'
import {Link} from 'react-router-dom'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header(){
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate()

     const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
  ]
    return(
       <header className="bg-white shadow-md border-b border-gray-200">
        <Container>
            <nav className="flex items-center justify-between py-2 h-20">
                <div className="flex-shrink-0">
                    <Link to="/">
                        <Logo width="180px" />
                    </Link>
                </div>
                <ul className="flex items-center space-x-4">
                    {navItems.map((item)=>
                    item.active ?(
                        <li key = {item.name}>
                            <button
                            onClick={()=>navigate(item.slug)}
                            className="px-4 py-2 text-gray-700 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all duration-200 font-medium">{item.name}</button>
                        </li>
                    ): null
                )}
                {authStatus && (
                    <li>
                        <LogoutBtn/>
                    </li>
                )}

                </ul>
            </nav>
        </Container>
       </header>
    )
}
export default Header;
