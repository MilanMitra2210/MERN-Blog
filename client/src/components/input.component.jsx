import React, { useState } from 'react'
import { FaRegUser, FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { MdOutlineEmail, MdOutlineVpnKey } from "react-icons/md";

const InputBox = ({ name, type, id, value, placeholder, icon }) => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const iconMap = {
        user: FaRegUser,
        email: MdOutlineEmail,
        password: MdOutlineVpnKey,
    };
    const IconComponent = iconMap[icon];
    const VisibilityIcon = passwordVisible ? FaRegEye : FaRegEyeSlash;
    return (
        <div className='relative w-[100%] mb-4'>
            <input
                name={name}
                type={type == 'password' ? passwordVisible ? 'text' : 'password' : type}
                id={id}
                placeholder={placeholder}
                defaultValue={value}
                className='input-box'
            />
            {IconComponent && <IconComponent className='input-icon' />}
            {type === 'password' && (
                <VisibilityIcon
                    className='input-icon left-[auto] right-4 cursor-pointer'
                    onClick={() => setPasswordVisible((prevState) => !prevState)}
                />
            )}
        </div>
    )
}

export default InputBox