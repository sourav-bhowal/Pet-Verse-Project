"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { User } from "next-auth";

// Navbar component
export default function Navbar() {
    // Get the session
    const { data: session } = useSession();
    // Check if user is logged in
    const user = session?.user as User;

    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <nav className="bg-gray-900 text-white flex justify-between lg:px-5 px-3 h-16 items-center">
            <Link href={"/"}>
                <div className="logo font-bold lg:text-2xl text-xl">Pet World</div>
            </Link>
            <div className="relative">
                {session && (
                    <>
                        <button
                            id="dropdownDefaultButton"
                            data-dropdown-toggle="dropdown"
                            className="text-white lg:mx-4 bg-orange-500 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-3 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            type="button"
                            onClick={() => setShowDropdown(!showDropdown)}
                        >
                            {user.username}
                            <svg
                                className="w-2.5 h-2.5 ms-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 10 6"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 1 4 4 4-4"
                                />
                            </svg>
                        </button>

                        <div
                            id="dropdown"
                            onMouseLeave={() => setTimeout(() => setShowDropdown(false), 300)}
                            className={`${
                                showDropdown ? "" : "hidden"
                            } z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow lg:w-44 w-36 dark:bg-gray-700`}
                        >
                            <ul
                                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                                aria-labelledby="dropdownDefaultButton"
                            >
                                <li>
                                    <Link
                                        href={`/user/${user.username}`}
                                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                        Your Profile
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/buy-pet"
                                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                        Buy Pet
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/sell-pet"
                                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                        Sell Pet
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="block px-4 py-2 font-semibold hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-red-500"
                                        onClick={() => signOut()}
                                    >
                                        Log out
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </>
                )}

                {!session && (
                    <Link href={"/login"}>
                        <button
                            className="text-white bg-gradient-to-br from-orange-700 via-orange-500 to-orange-400 hover:bg-gradient-to-bl 
                            focus:ring-4 focus:outline-none focus:ring-orange-300 dark:focus:ring-blue-800 rounded-lg 
                            text-sm px-5 py-2.5 text-center me-2 font-bold"
                        >
                            Log In
                        </button>
                    </Link>
                )}
            </div>
        </nav>
    );
}
