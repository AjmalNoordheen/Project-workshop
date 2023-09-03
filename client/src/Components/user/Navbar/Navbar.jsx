import { Fragment, useEffect } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { ClientLogout } from "../../../Redux/userState";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AxiosInstance from '../../../Axios/userAxios'


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example({data,setHeight}) {
  const userToken = useSelector((Store) => Store.Client.Token);
  const userName = useSelector((Store) => Store.Client.userName);
  const email = useSelector((Store) => Store.Client.email);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userAxios = AxiosInstance()
  const navigation = [
    { name: "Home", href: "/", current: false },
    { name: "Freelancers", href: "/prolists", current: false },
    { name: "Bookings",href:userToken? "/bookings":'', current: false },
    { name: "Calendar", href: "#", current: false },
  ];
  useEffect(()=>{
    userAxios.get(`/blockAuth?email=${email}&nav=${true}`).then((res)=>{
      if(res){
        if(res.data.message=='blocked'){
          dispatch(ClientLogout());
          // toast.error('Account has been blocked')
              navigate('/')
            return
        }
        if(res.data.message=="Authentication failed: invalid token." ){
          dispatch(ClientLogout());
        }
      }else{
        return
      }
    })
  },[])
  const SignOut = () => {
    dispatch(ClientLogout());
    navigate("/")
    {setHeight?setHeight(0):''}
  };
  return (
    <Disclosure as="nav" className={data?"bg-gradient-to-r from-blue-700 to-blue-600 rounded-t-xl":"bg-slate-950"}>
      {({ open }) => (
        <>
          <div className="mx-auto   max-w-full px-2 sm:px-6 lg:px-8">
            <div className="relative  flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button  className="inline-flex  items-center  justify-center rounded-md p-2 text-gray-100  hover:text-white focus:outline-none">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon onClick={()=>{setHeight?setHeight(0):''}} className="block  hover:bg-gray-900 hover:border-gray-900 border-2 border-slate-700 h-6 bg-slate-700 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon onClick={()=>{setHeight?setHeight(1):''}} className="block h-6 w-6 " aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-between sm:justify-between">
                <div className="flex flex-shrink-0 items-center sm:ml-0 ml-6">
                  <img
                    className="h-16 w-34"
                    src="/newImage.png"
                    alt="Your Company"
                  />
                </div>
                <div className="hidden  sm:ml-6 sm:block ">
                  <div className="flex space-x-10">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        onClick={()=>navigate(item.href)}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-white cursor-pointer hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
                {userToken ? (
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex rounded-full border border-black bg-gray-800 text-sm focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src="/profile_3135715.png"
                          alt=""
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg-ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="#"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              {userName}
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                             to={'/userProfile'}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Your Profile
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="#"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Settings
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <p
                              onClick={SignOut}
                              href="#"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                              )}
                            >
                              Sign out
                            </p>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                ) : (
                  <Link
                    className="text-white hover:bg-blue-700 bg-blue-500 px-3 py-1 rounded"
                    to={"/login"}
                  >
                    Login
                  </Link>
                )}
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2 ">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                 onClick={()=>navigate(item.href)} 
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 cursor-pointer hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
            {/* <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2 ">
                <Disclosure.Button     >
                 <p className="text-gray-300 hover:bg-gray-700 hover:text-white  block rounded-md px-3 py-2
                 text-base font-medium"><Link to={'/'} > Home </Link></p> 
                </Disclosure.Button>
                <Disclosure.Button     >
                 <p className="text-gray-300 hover:bg-gray-700 hover:text-white  block rounded-md px-3 py-2
                 text-base font-medium"><Link to={'/prolists'} > Freelancer </Link></p> 
                </Disclosure.Button>
            </div>
          </Disclosure.Panel> */}
        </>
      )}
    </Disclosure>
  );
}
