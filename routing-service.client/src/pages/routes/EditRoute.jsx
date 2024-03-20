import { useEffect, useState } from 'react';
import { YMaps, Map, Placemark, SearchControl, RouteButton, RulerControl, Polyline } from '@pbe/react-yandex-maps';

function EditRoute() {
    const Route = useSelector((state) => state.route);
    
    return (
        <>
            <p>Название маршрута: {Route.routeName}</p>
            <p>Дата: {Route.routeDate}</p>
            <p>Комментарий: {Route.routeComment}</p>

            <button>Изменить</button>
            <button>Удалить</button>
            <div>
                <YMaps>
                    <Map defaultState={{
                        center: [55.751574, 37.573856],
                        zoom: 9,
                        controls: ['routePanelControl'],
                        SearchControlProvider: "yandex#search",
                    }} style={{ 
                        height: '360px',
                        width: '640px'}}
                        >
                        <RouteButton options={{float: "right", }} />
                        <RulerControl options={{float: "right"}} />
                        <SearchControl options={{float: "rigth"}} />
                        <Placemark />
                        <Polyline />
                    </Map>
                </YMaps>
            </div>
        </>

    );
}

export default EditRoute 