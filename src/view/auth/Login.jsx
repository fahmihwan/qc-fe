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

            dispatch(setUserSlice({
                fistName: '',
                lastName: '',
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
        <div className='h-[100vh] flex items-center justify-center'>

            <div className='block w-[500px] p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 '>
                <div className='flex justify-center'>
                    <div className='flex flex-col '>
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
                    handleChange={(e) => handleChange(e)}
                    value={formData?.email}
                />

                <TextInputEl
                    name={"password"}
                    type='email'
                    placeholder={"Email"}
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