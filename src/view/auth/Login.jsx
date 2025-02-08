import React, { useState } from 'react'
import { TextInputEl } from '../component/InputCompt'
import { authenticated } from '../../api/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserSlice } from "../../redux/features/userSlice";

const Login = () => {
    const dispatch = useDispatch()

    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: 'fahmiiwan86@gmail.com',
        password: 'qweqwe123',
    });


    const handleChange = (e) => {
        let { name, value } = e.target
        setFormData({
            ...formData, [name]: value
        })
    }

    const handleSubmit = async () => {


        const isAuth = await authenticated(formData);

        if (isAuth[1] === true) {
            console.log(isAuth);

            // firstName: '',
            // lastName: '',
            // email: '',
            // username: '',
            dispatch(setUserSlice({
                firstName: isAuth[2].first_name,
                lastName: isAuth[2].last_name,
                email: isAuth[2].email,
                username: isAuth[2].username,
            }))

            navigate("/dashboard", { replace: true });
        } else {
            alert('error')
            // setToastError({
            //     isError: true,
            //     message: "Username or password Invalid",
            // });
        }
        // await createCategoryTicket(formData).then((res) => console.log(res)).catch((err) => console.log(err))
        // await fetchData(slug)
    }

    return (
        <div className='h-[100vh] flex items-center justify-center bg-[url("/assets/img/login_background.png")]'>

            <div className='bg-transparent backdrop-blur-md
            
            block w-[500px] p-6 border border-gray-200 rounded-lg shadow-sm  '>
                <div className='flex justify-center'>
                    <div className='flex flex-col text-white font-bold'>
                        <div className='text-center'>
                            LOGO
                        </div>
                        <div className='text-center'>
                            LOGIN
                        </div>
                        <div className='text-center'>
                            DASHBOARD 360
                        </div>
                    </div>
                </div>
                <TextInputEl
                    name={"email"}
                    type='email'
                    placeholder={"Email"}
                    classNameLabel={"text-white"}
                    handleChange={(e) => handleChange(e)}
                    value={formData?.email}
                />
                <TextInputEl
                    name={"password"}
                    type='password'
                    classNameLabel={"text-white"}
                    placeholder={"Password"}
                    handleChange={(e) => handleChange(e)}
                    value={formData?.password}
                />
                <button
                    onClick={handleSubmit}
                    type="button"
                    className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2  focus:outline-none "
                >
                    MASUK
                </button>

            </div>


        </div>
    )
}

export default Login