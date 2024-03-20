import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullname] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [mail, setMail] = useState("");
    const navigate = useNavigate();

    async function onSend(login, password, fullName, dateOfBirth, mail) {
        try {
            const response = await fetch(`https://localhost:7091/User/Register?login=${login}&password=${password}&fullName=${fullName}&dateOfBirth=${dateOfBirth}&mail=${mail}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    login: login,
                    password: password,
                    fullName: fullName,
                    dateOfBirth: dateOfBirth,
                    mail: mail
                })
            })
            navigate('/');
        }
        catch (error) {
            console.log(error);
        }
        setLogin('');
        setPassword('');
        setFullname('');
        setMail('');
        setDateOfBirth('');
    }

    return (
        <>
            <h1>Регистрация</h1><br />
            <input type="text" value={login} onChange={(event) => setLogin(event.target.value)} placeholder="Логин" /><br />
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Пароль" /><br />
            <input type="text" value={fullName} onChange={(event) => setFullname(event.target.value)} placeholder="ФИО" /><br />
            <input type="date" value={dateOfBirth} onChange={(event) => setDateOfBirth(event.target.value)} placeholder="Дата рождения" /><br />
            <input type="text" value={mail} onChange={(event) => setMail(event.target.value)} placeholder="Почта" /><br />
            <button onClick={() => onSend(login, password, fullName, dateOfBirth, mail)}>Зарегестрироваться</button>
        </>
    );
}

export default Register