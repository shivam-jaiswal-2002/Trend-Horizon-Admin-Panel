"use client";
import React from "react";
import Link from 'next/link';
import { signOut, useSession } from "next-auth/react";

function Navbar() {
  const { data: session } = useSession();
  return (
    <nav className="fixed w-full bg-black font-serif top-0 text-white flex justify-between items-center px-4 py-2">
      <Link href="/" className='text-2xl'>
        TrendHorizon
      </Link>
      <ul className="flex space-x-9">
        <li>
          <Link href="/OrdersPage">
        Orders
          </Link>
        </li>
        <li>
          <Link href="/Users">
            Users
          </Link>
        </li>
      </ul>
      {!session ? (
        <>
         <div className="flex space-x-2">
        <Link href="/login">
          <button className="px-3 py-2 rounded bg-blue-950 text-white hover:bg-transparent">
            Login
          </button>
        </Link>
        <Link href="/register">
          <button className="px-3 py-2 rounded bg-blue-950 text-white hover:bg-transparent">
            Signup
          </button>
        </Link>
      </div>
        </>
       
      ):(
        <div className="justify-end flex items-center">
          Welcome {session.user.email.split('@')[0]}
          <ul className="ml-4">
            
          <li>
            <button onClick={() => {
              signOut();
            }} className="px-3 py-2 rounded bg-blue-950 text-white hover:bg-transparent">Signout</button>
          </li>
          </ul>
    
        </div>
      )}
      
    </nav>
  );
}

export default Navbar;
