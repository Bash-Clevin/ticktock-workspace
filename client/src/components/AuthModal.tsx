import { useState } from 'react';
import { useGeneralStore } from '../store/generalStore';
import { ImCross } from 'react-icons/im';
import Register from './Register';
import Login from './Login';

const AuthModal = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const setLoginIsOpen = useGeneralStore((state) => state.setLoginIsOpen);
  const isLoginOpen = useGeneralStore((state) => state.isLoginOpen);

  return (
    <div
      id="AuthModal"
      className="fixed flex items-center justify-center 
      z-50 top-0 left-0 w-full h-full bg-black bg-opacity-50"
    >
      <div
        className="relative bg-white 
      w-full max-w-[470px] h-[70%]
       p-4 rounded-lg"
      >
        <div className="w-full flex justify-end">
          <button
            onClick={() => setLoginIsOpen(!isLoginOpen)}
            className="p-1.5 rounded-full bg-gray-100"
          >
            <ImCross color="#000000" size="16" />
          </button>
        </div>
        {isRegistered ? <Login /> : <Register />}
        <div
          className="absolute flex items-center justify-center 
        py-5 left-0 bottom-0 border-t w-full"
        >
          <span className="text-[14px] text-gray-600">
            Don't have an account?
          </span>
          <button
            className="text-[14px] text-[#F02C56] font-semibold pl-1"
            onClick={() => setIsRegistered(!isRegistered)}
          >
            {isRegistered ? <span> Sign up</span> : <span> Log in</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
