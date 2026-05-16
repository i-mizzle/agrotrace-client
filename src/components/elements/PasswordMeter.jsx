import React, { useState, useEffect } from 'react';
import CheckIcon from '../elements/icons/CheckIcon'

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
    <div className='mt-5'>
      <h3 className='text-gray-500 mb-5 text-sm'>A good password should:</h3>
      <div className='grid grid-cols-1 gap-3.75 w-full px-2.5'>
        <div className='w-full'>
            <div className='flex items-center gap-x-2.5'>
                <div className={`w-6.25 h-6.25 flex items-center justify-center transition duration-200 rounded-full ${checks.lowercase ? 'bg-accent' : 'bg-gray-100 dark:bg-at-dark-gray/20'}`}>
                    {checks.lowercase && <CheckIcon className={'text-white w-5 h-5'} />}
                </div>
                <p className={`text-xs transition duration-200 font-medium ${checks.lowercase ? 'text-gray-500 dark:text-gray-300' : 'text-gray-400'}`}>
                    Contain at least one lowercase character
                </p>
            </div>
        </div>
        <div className='w-full'>
            <div className='flex items-center gap-x-2.5'>
                <div className={`w-6.25 h-6.25 transition duration-200 flex items-center justify-center rounded-full ${checks.uppercase ? 'bg-accent' : 'bg-gray-100 dark:bg-at-dark-gray/20'}`}>
                    {checks.uppercase && <CheckIcon className={'text-white w-5 h-5'} />}
                </div>
                <p className={`text-xs transition duration-200 font-medium ${checks.lowercase ? 'text-gray-500 dark:text-gray-300' : 'text-gray-400'}`}>
                    Contain at least one uppercase character
                </p>
            </div>
        </div>
        <div className='w-full'>
            <div className='flex items-center gap-x-2.5'>
                <div className={`w-6.25 h-6.25 flex items-center justify-center transition duration-200 rounded-full ${checks.special ? 'bg-accent' : 'bg-gray-100 dark:bg-at-dark-gray/20'}`}>
                    {checks.special && <CheckIcon className={'text-white w-5 h-5'} />}
                </div>
               <p className={`text-xs transition duration-200 font-medium ${checks.lowercase ? 'text-gray-500 dark:text-gray-300' : 'text-gray-400'}`}>
                    Contain at least one special character (eg: !@#$%^&*)
                </p>
            </div>
        </div>
        <div className='w-full'>
            <div className='flex items-center gap-x-2.5'>
                <div className={`w-6.25 h-6.25 flex items-center justify-center transition duration-200 rounded-full ${checks.number ? 'bg-accent' : 'bg-gray-100 dark:bg-at-dark-gray/20'}`}>
                    {checks.number && <CheckIcon className={'text-white w-5 h-5'} />}
                </div>
                <p className={`text-xs transition duration-200 font-medium ${checks.lowercase ? 'text-gray-500 dark:text-gray-300' : 'text-gray-400'}`}>
                    Contain at least one number
                </p>
            </div>
        </div>
        <div className='w-full'>
            <div className='flex items-center gap-x-2.5'>
                <div className={`w-6.25 h-6.25 flex items-center justify-center transition duration-200 rounded-full ${checks.minEightChars ? 'bg-accent' : 'bg-gray-100 dark:bg-at-dark-gray/20'}`}>
                    {checks.minEightChars && <CheckIcon className={'text-white w-5 h-5'} />}
                </div>
                <p className={`text-xs transition duration-200 font-medium ${checks.lowercase ? 'text-gray-500 dark:text-gray-300' : 'text-gray-400'}`}>
                    Be a minimum of eight characters long
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordMeter;
