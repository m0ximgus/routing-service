import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/slice/userSlice';

function Login() {

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    async function onSend(login, password) {
        try {
            const response = await fetch(`https://localhost:7091/User/Login?login=${login}&password=${password}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    login: login,
                    password: password
                })
            })
            if (response.status != 404) {
                const user = await response.json();
                dispatch(setUser(user));
                navigate('/User');
            }
        }
        catch (error) {
            console.log(error);
        }
        setLogin('');
        setPassword('');
    }

    async function onRegister() {
        navigate('/Register');
    }
    return (
        <>
            <h1>Вход</h1>
            <input type="text" value={login} onChange={(event) => setLogin(event.target.value)} placeholder="Имя" /><br />
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Пароль" /><br />
            <button onClick={() => onSend(login, password)}>Отправить</button>
            <button onClick={() => onRegister()}>Зарегестрироваться</button>
        </>
    );
}

export default Login