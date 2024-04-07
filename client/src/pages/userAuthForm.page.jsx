import React, { useState, useContext } from 'react'
import InputBox from '../components/input.component'
import googleIcon from '../imgs/google.png'
import { Link, Navigate } from 'react-router-dom'
import AnimationWrapper from '../common/page-animation'
import { useEmailValidation, usePasswordValidation } from '../hooks/authHelper'
import { Toaster, toast } from 'react-hot-toast'
import axios from 'axios'
import { storeInSession } from '../common/session'
import { UserContext } from '../App'
import { authWithGoogle } from '../common/firebase'

const UserAuthForm = ({ type }) => {
  const { userAuth: { access_token }, setUserAuth } = useContext(UserContext);
  const { isValid: isEmailValid, validateEmail } = useEmailValidation();
  const { isValid: isPasswordValid, validatePassword } = usePasswordValidation();
  const [errors, setErrors] = useState({});
  const userAuthThroughServer = (serverRoute, formData) => {
    axios.post(import.meta.env.VITE_SERVER_DOMAIN + serverRoute, formData).then(({ data }) => {
      storeInSession("user", JSON.stringify(data));
      setUserAuth(data);
    }).catch(({ response }) => {
      toast.error(response.data.error);
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    let serverRoute = type == 'sign-in' ? '/signin' : '/signup';
    // formdata
    const form = new FormData(formElement);
    const formData = {};
    for (let [key, value] of form.entries()) {
      formData[key] = value;
    }
    const { fullname, email, password } = formData;
    const validationErrors = {};
    //form Validation
    if (type === 'sign-up') {
      if (fullname.trim().length < 3) validationErrors.fullname = "Full Name must be at least 3 characters long."
    }
    if (!email.trim()) validationErrors.email = "Email is required."
    else if (!isEmailValid) validationErrors.email = "Invalid email format.";
    if (!password.trim()) validationErrors.password = "Password is required.";
    else if (!isPasswordValid) validationErrors.password = "Password must be between 6 and 20 characters long and contain at least one digit, one lowercase letter, and one uppercase letter.";
    setErrors(validationErrors);
    console.log('validationErrors', validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      userAuthThroughServer(serverRoute, formData);
    }
  }
  const handleGoogleAuth = (e) => {
    e.preventDefault();
    authWithGoogle().then(user => {
      console.log(user);
      let serverRoute = '/google-auth';
      let formData = {
        access_token: user.accessToken
      }
      userAuthThroughServer(serverRoute, formData);
    }).catch(err => {
      toast.error('Troble Logging through Google');
      console.log(err);
    })
  }
  return (
    access_token ?
      <Navigate to="/" />
      :
      <AnimationWrapper keyValue={type}>
        <section className='h-cover flex items-center justify-center'>
          <Toaster />
          <form id='formElement' className='w-[80%] max-w-[400px]'>
            <h1 className='text-4xl font-gelasio capitalize text-center mb-24'>
              {type === 'sign-in' ? 'Welcome back' : 'Join us today'}
            </h1>
            {type !== 'sign-in' &&
              <div>
                <InputBox
                  name='fullname'
                  type="text"
                  placeholder="Full name"
                  icon="user"
                  error={errors?.fullname}
                />
              </div>
            }
            <div>
              <InputBox
                name='email'
                type="email"
                placeholder="Email"
                icon="email"
                onChange={validateEmail}
                error={errors?.email}
              />
            </div>
            <div>
              <InputBox
                name='password'
                type="password"
                placeholder="Password"
                icon="password"
                onChange={validatePassword}
                error={errors?.password}
              />
            </div>
            <button className='btn-dark center mt-14' type='submit' onClick={handleSubmit}>
              {type.replace('-', ' ')}
            </button>
            <div className='relative w-full flex items-center gap-2 my-10 opacity-10 uppercase text-black font-bold'>
              <hr className='w-1/2 border-black' />
              <p>or</p>
              <hr className='w-1/2 border-black' />
            </div>
            <button className='btn-dark flex items-center justify-center gap-4 w-full sm:w-90 md:w-80 lg:w-72 xl:w-64 mx-auto'
              onClick={handleGoogleAuth}
            >
              <img src={googleIcon} className='w-5' />
              continue with google
            </button>
            {
              type == 'sign-in' ?
                <p className='mt-6 text-dark-grey text-xl text-center'>
                  Don't have an account?
                  <Link to='/signup' className='underline text-black text-xl ml-1'>
                    Join us today
                  </Link>
                </p>
                :
                <p className='mt-6 text-dark-grey text-xl text-center'>
                  Already a member?
                  <Link to='/signin' className='underline text-black text-xl ml-1'>
                    Sign in here
                  </Link>
                </p>
            }
          </form>
        </section>
      </AnimationWrapper>
  )
}

export default UserAuthForm