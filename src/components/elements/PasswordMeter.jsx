import React, { useState, useEffect } from 'react';
import CheckIcon from './icons/CheckIcon';

const PasswordMeter = ({ password }) => {
  const [checks, setChecks] = useState({
    lowercase: false,
    uppercase: false,
    special: false,
    number: false,
    minEightChars: false
  });

  useEffect(() => {
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasMinEightChars = password.length >= 8;

    setChecks({
      lowercase: hasLowercase,
      uppercase: hasUppercase,
      special: hasSpecial,
      number: hasNumber,
      minEightChars: hasMinEightChars
    });
  }, [password]);

  return (
    <div className='mt-[20px]'>
      <h3 className='text-gray-500 mb-[20px] text-sm'>A good password should:</h3>
      <div className='grid grid-cols-1 gap-[15px] w-full px-[10px]'>
        <div className='w-full'>
            <div className='flex items-center gap-x-[10px]'>
                <div className={`w-[25px] h-[25px] flex items-center justify-center transition duration-200 rounded-full ${checks.lowercase ? 'bg-green-600' : 'bg-gray-100'}`}>
                    {checks.lowercase && <CheckIcon className={'text-white w-5 h-5'} />}
                </div>
                <p className={`text-xs transition duration-200 font-[500] ${checks.lowercase ? 'text-doiteasy-black' : 'text-gray-400'}`}>
                    Contain at least one lowercase character
                </p>
            </div>
        </div>
        <div className='w-full'>
            <div className='flex items-center gap-x-[10px]'>
                <div className={`w-[25px] h-[25px] transition duration-200 flex items-center justify-center rounded-full ${checks.uppercase ? 'bg-green-600' : 'bg-gray-100'}`}>
                    {checks.uppercase && <CheckIcon className={'text-white w-5 h-5'} />}
                </div>
                <p className={`text-xs transition duration-200 font-[500] ${checks.uppercase ? 'text-doiteasy-black' : 'text-gray-400'}`}>
                    Contain at least one uppercase character
                </p>
            </div>
        </div>
        <div className='w-full'>
            <div className='flex items-center gap-x-[10px]'>
                <div className={`w-[25px] h-[25px] flex items-center justify-center transition duration-200 rounded-full ${checks.special ? 'bg-green-600' : 'bg-gray-100'}`}>
                    {checks.special && <CheckIcon className={'text-white w-5 h-5'} />}
                </div>
                <p className={`text-xs transition duration-200 font-[500] ${checks.special ? 'text-doiteasy-black' : 'text-gray-400'}`}>
                    Contain at least one special character (eg: !@#$%^&*)
                </p>
            </div>
        </div>
        <div className='w-full'>
            <div className='flex items-center gap-x-[10px]'>
                <div className={`w-[25px] h-[25px] flex items-center justify-center transition duration-200 rounded-full ${checks.number ? 'bg-green-600' : 'bg-gray-100'}`}>
                    {checks.number && <CheckIcon className={'text-white w-5 h-5'} />}
                </div>
                <p className={`text-xs transition duration-200 font-[500] ${checks.number ? 'text-doiteasy-black' : 'text-gray-400'}`}>
                    Contain at least one number
                </p>
            </div>
        </div>
        <div className='w-full'>
            <div className='flex items-center gap-x-[10px]'>
                <div className={`w-[25px] h-[25px] flex items-center justify-center transition duration-200 rounded-full ${checks.minEightChars ? 'bg-green-600' : 'bg-gray-100'}`}>
                    {checks.minEightChars && <CheckIcon className={'text-white w-5 h-5'} />}
                </div>
                <p className={`text-xs transition duration-200 font-[500] ${checks.minEightChars ? 'text-doiteasy-black' : 'text-gray-400'}`}>
                    Be a minimum of eight characters long
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordMeter;
