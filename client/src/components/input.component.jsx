import React, { useEffect, useState } from 'react'
import { FaRegUser, FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { MdOutlineEmail, MdOutlineVpnKey } from "react-icons/md";

const InputBox = ({ name, type, id, value, placeholder, icon, onChange, error }) => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const iconMap = {
        user: FaRegUser,
        email: MdOutlineEmail,
        password: MdOutlineVpnKey,
    };
    const IconComponent = iconMap[icon];
    const VisibilityIcon = passwordVisible ? FaRegEye : FaRegEyeSlash;
    return (
        <div className='mb-4'>
            <div className='relative w-[100%]'>
                <input
                    name={name}
                    type={type == 'password' ? passwordVisible ? 'text' : 'password' : type}
                    id={id}
                    placeholder={placeholder}
                    defaultValue={value}
                    className={`input-box ${error && 'border-red placeholder-red'}`}
                    onChange={onChange}
                    autoComplete='off'
                />
                {IconComponent && <IconComponent className='input-icon' />}
                {type === 'password' && (
                    <VisibilityIcon
                        className='input-icon left-[auto] right-4 cursor-pointer'
                        onClick={() => setPasswordVisible((prevState) => !prevState)}
                    />
                )}
            </div>
            {error && <p className="text-red mt-0 text-sm">{error}</p>}
        </div>
    )
}

export default InputBox