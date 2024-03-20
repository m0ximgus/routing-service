import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './User.css'
import Modal from '../../components/Modal/Modal';

function User() {
    const user = useSelector((state) => state.user);

    const [login, setLogin] = useState(user.login);
    const [password, setPassword] = useState(user.password);
    const [fullName, setFullname] = useState(user.fullName);
    const [dateOfBirth, setDateOfBirth] = useState(user.dateOfBirth);
    const [mail, setMail] = useState(user.mail);

    const navigate = useNavigate();
    const [modalActive, setModalActive] = useState(false);

    async function onCreate() {
        navigate('/RouteCreate')
    }

    async function onEdit(login, password, fullName, dateOfBirth, mail) {
        try {
            const response = await fetch(`https://localhost:7091/User/Edit?login=${login}&password=${password}&fullName=${fullName}&dateOfBirth=${dateOfBirth}&mail=${mail}&userId=${user.id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    login: login,
                    password: password,
                    fullName: fullName,
                    dateOfBirth: dateOfBirth,
                    mail: mail,
                    userId: user.id
                })
            })
        }
        catch (error) {
            console.log(error)
        }
    }

    async function onUserDelete(id) {
        try {
            const response = await fetch(`https://localhost:7091/User/Delete?id=${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: id
                })
            })
            console.log(response)
            navigate('/');
        }
        catch (error) {
            console.log(error);
        }
    }

    async function onRouteEdit(id) {
        try {
            const response = await fetch(`https://localhost:7091/Route/GetById?id=${id}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            })
            console.log(response.json)
            const route = await response.json();
            dispatch(setRoute(route));
            navigate('/RouteEdit');
        }
        catch (error) {
            console.log(error);
        }
    }

    async function onRouteDelete(id) {
        try {
            const response = await fetch(`https://localhost:7091/Route/Delete?id=${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: id
                })
            })
            console.log(response)
        }
        catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <Modal active={modalActive} setActive={setModalActive}>
                <form action=''>
                    <input type="text" value={login} onChange={(event) => setLogin(event.target.value)} placeholder="Логин" /><br />
                    <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Пароль" /><br />
                    <input type="text" value={fullName} onChange={(event) => setFullname(event.target.value)} placeholder="ФИО" /><br />
                    <input type="date" value={dateOfBirth} onChange={(event) => setDateOfBirth(event.target.value)} placeholder="Дата рождения" /><br />
                    <input type="text" value={mail} onChange={(event) => setMail(event.target.value)} placeholder="Почта" /><br />
                    <button onClick={(e) => { e.preventDefault(); onEdit(login, password, fullName, dateOfBirth, mail); setModalActive(false) }}>Сохранить изменения</button>
                </form>
            </Modal>
            <h2>Cтраница пользователя</h2>
            <p>Имя пользователя: {user.fullName}</p>
            <p>Дата рождения: {user.dateOfBirth}</p>
            <p>Почта: {user.mail}</p>
            <button onClick={() => { setModalActive(true) }}>Изменить данные</button><button onClick={() => onUserDelete(user.id)}>Удалить профиль</button>
            <br></br>
            <p>Маршруты</p>
            <button onClick={() => onCreate()}>Создать новый маршрут</button><br /><br />
            {user.routes ? (
                <>
                    <div className="wrapper">
                        <div>Название</div>
                        <div>Дата</div>
                        <div>Комментарий</div>
                    </div>
                    {user.routes.map((el) => (
                        <div className="wrapper-item" key={el.routeId}>
                            <p>{el.routeName}</p>
                            <p>{el.routeDate}</p>
                            <p>{el.routeComment}</p>
                            <button onClick={() => onRouteEdit(el.routeId)}>Изменить</button>
                            <button onClick={() => onRouteDelete(el.routeId)}>Удалить</button>
                        </div>
                    ))}
                </>) : (
                <div>Маршрутов нет</div>
            )}
            {/* <div className="wrapper">
                <div>Название</div>
                <div>Дата</div>
                <div>Комментарий</div>
            </div>
                {user.routes.map((el) => (
                     <div className="wrapper-item" key={el.routeId}>
                        <p>{el.routeName}</p>
                        <p>{el.routeDate}</p>
                        <p>{el.routeComment}</p>
                        <button onClick={() => onRouteEdit(el.routeId)}>Изменить</button>
                        <button onClick={() => onRouteDelete(el.routeId)}>Удалить</button>
                     </div>
                ))} */}
        </>
    );
}

export default User;