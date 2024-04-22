import { useEffect, useState } from 'react';
import MyMap from './Map';

//ymaps.ready(EditRoute)
function EditRoute() {
    //const Route = useSelector((state) => state.route);

    let routePoints = [];
    

    return (
        <>
            <p>Название маршрута: </p>
            <p>Дата: </p>
            <p>Комментарий: </p>

            <button>Изменить</button>
            <button>Удалить</button>
            <div>
                <MyMap></MyMap>
            </div>
        </>

    );
}

export default EditRoute 