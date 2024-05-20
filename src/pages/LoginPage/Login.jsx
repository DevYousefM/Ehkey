import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { loggedInState, usernameState } from '../../store/index.js';
import appLogo from '../../assets/logo-light.png';
import axios from 'axios'; // Import Axios for making HTTP requests
import TextField from '@mui/material/TextField';
import './index.scss';
import { useAuth } from '../../store/auth'
const LoginForm = () => {
    const auth = useAuth()
    const location = useLocation();
    const navigate = useNavigate();
    const redirectpath = location.state?.path || "/"

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [loginError, setLoginError] = useState('');

    const setLoggedIn = useSetRecoilState(loggedInState);
    const isLoggedIn = useRecoilValue(loggedInState);
    const setUsernameState = useSetRecoilState(usernameState);
    console.log('isLogged (before login):', isLoggedIn ? 'true' : 'false'); // Print before login

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm(formData);
        if (Object.keys(validationErrors).length === 0) {
            try {
                const response = await axios.post('https://www.ehkey.com/api/account/login', {
                    email: formData.email,
                    password: formData.password
                });

                // Assuming the backend returns some form of authentication token upon successful login
                const authToken = response.data.token;
                const userName = response.data.name;
                // Store authToken in local storage or session storage for subsequent requests
                localStorage.setItem('authToken', authToken);

                // Set loggedIn to true
                setLoggedIn(true);

                // Set username state
                setUsernameState(formData.email);
                auth.login(userName)
                console.log('isLogged (after login):', isLoggedIn ? 'true' : 'false'); // Print after login
                console.log('Login successful!');

                // Redirect to homepage
                navigate(redirectpath, { replace: true });
            } catch (error) {
                setLoginError('Incorrect email or password');
            }
        } else {
            setErrors(validationErrors);
        }
    };

    const validateForm = (data) => {
        let errors = {};
        if (!data.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(data.email)) {
            errors.email = 'Email is invalid';
        }
        if (!data.password.trim()) {
            errors.password = 'Password is required';
        }
        return errors;
    };

    return (
        <div className="col-12" id="LoginPage">
            <div className="content">
                <div className="col-12 col-md-7" id="imageSection">
                    <div className="filter">
                        <div className="col-12">
                            <img src={appLogo} alt="App Logo" />
                        </div>
                        <div className="col-12" id="mainContent">
                            <h1 className="col-12">Welcome back!</h1>
                            <p className="col-12">
                                Get access to your Orders, Wishlist and Recommendations.
                            </p>
                            <div className="col-4">
                                <p>Watch demo</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='col-6' id='formSection' >
                    <div>             <h2 className='H2'>Login</h2></div>
                    <form onSubmit={handleSubmit} className='col-10 login12'>
                        <div className=" col-10">
                            <TextField id="outlined-basic"
                                label="Email"
                                variant="outlined"
                                className='input2 col-12'
                                type="email"
                                name="email"
                                placeholder='Email'
                                onChange={handleChange}
                            />
                            {errors.email && <span className='error_Msg'>{errors.email}</span>}
                        </div>
                        <div className=" col-10">
                            <TextField id="outlined-basic"
                                label="Password"
                                variant="outlined"
                                className='input2 col-12'
                                type="password"
                                name="password"
                                placeholder='Password'
                                onChange={handleChange}
                            />
                            {errors.password && <span className='error_Msg'>{errors.password}</span>}
                        </div>
                        {loginError && <div>{loginError}</div>}
                        <div className='col-10'>
                            <button type="submit" className='col-12 btn'>Login</button>
                        </div>

                    </form>
                    <div className='col-12'>
                        <span className='Forget col-12'>
                            <Link className="Linko" to="/Forget" >Forget Password</Link>
                            <span className='margin'>Or</span>
                            <Link className="Linko" to="/SignUp">Not Have An Account ?</Link>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
