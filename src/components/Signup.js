import React , {useState} from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useContext } from 'react';
import noteContext from '../context/noteContext';

const Signup = (props) => {
    
    const context = useContext(noteContext);
    const {showAlert} = context ;

    const [credentials, setCredentials] = useState({name:"",email: "", password: "",cpassword:""});
    let history = useHistory();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/create_user", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: credentials.name,email: credentials.email, password: credentials.password})
        });
        const json = await response.json();
        console.log(json);
        if (json.Success){
            // Save the auth token and redirect
            localStorage.setItem('token', json.auth_token);
            console.log(localStorage.getItem('token'));
            history.push("/");
            showAlert("Account created successfully","success");
        }
        else{
            showAlert("Invalid credentials","danger");
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
    return (
        <div className='mt-5'>
            <form  onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" value={credentials.name} onChange={onChange} id="name" name="name"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" value={credentials.cpassword} onChange={onChange} name="cpassword" id="cpassword" />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup