import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function CreateRoute() {
    const [routeName, setRouteName] = useState("");
    const [routeDate, setRouteDate] = useState("");
    const [routeComment, setRouteComment] = useState("");

    const user = useSelector((state) => state.user);

    const navigate = useNavigate();

    async function onSend(routeName, routeDate, routeComment) {
        console.log(routeName, routeDate, routeComment, user.id)
        try {
            const response = await fetch(`https://localhost:7091/Route/Create?routeName=${routeName}&routeDate=${routeDate}&routeComment=${routeComment}&userId=${user.id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    routeName: routeName,
                    routeDate: routeDate,
                    routeComment: routeComment,
                    userId: user.id
                })
            })
            navigate('/User');
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <h1>Создание нового маршрута</h1>
            <input type="text" value={routeName} onChange={(event) => setRouteName(event.target.value)} placeholder="Название" /><br />
            <input type="date" value={routeDate} onChange={(event) => setRouteDate(event.target.value)} placeholder="Дата" /><br />
            <input type="text" value={routeComment} onChange={(event) => setRouteComment(event.target.value)} placeholder="Комментарий" /><br />
            <button onClick={() => onSend(routeName, routeDate, routeComment)}>Создать маршрут</button>
            <button onClick={() => navigate('/User')}>Вернуться</button>
        </>

    );
}

export default CreateRoute