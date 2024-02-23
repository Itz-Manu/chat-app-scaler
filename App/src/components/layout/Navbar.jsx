import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import Button from './Button';


export default function Navbar() {

    // let status = useSelector((state) => state.auth.status);
    // const dispatch = useDispatch();

    const [status, setStatus] = React.useState(false);

    function logouthandler() {
        // dispatch(logout());
        setStatus(prev => !prev);
    }


    return (
        <nav className="max-w-6xl mx-auto">
            <div className="px-2 sm:px-6 lg:px-8">
                <div className="flex py-2">
                    <div className="flex justify-between w-full my-auto">
                        <div className="flex-shrink-0 w-10 rounded-xl overflow-hidden">
                            <img src="./ChatLogo.png" alt="Logo" className='object-contain'/>
                        </div>

                        <div className="hidden md:flex gap-5">
                            <div className="space-x-4">
                               <ul className='flex gap-10 font-semibold mt-1.5'>
                                <NavLink to={'/home'}><li className='hover:text-gray-500'>Home</li></NavLink>
                                <li className='hover:text-gray-500'>About</li>
                                <li className='hover:text-gray-500'>Contact</li>
                               </ul>
                            </div>
                            <div>
                                {status ? (
                                    <Button onClick={logouthandler}>Logout</Button>
                                ) : (
                                    <div>
                                       <Link to={"/signup"}><Button>Signup</Button></Link> 
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}
