import React, { useState } from 'react';
import { YMaps, Map, SearchControl, Placemark, Polyline, ObjectManager } from '@pbe/react-yandex-maps'

const MyMap = () => {
    const [points, setPoints] = useState([])
    const [route, setRoute] = useState([])
    const [objects,setObjects] = useState([])

    const handleMapClick = (e) => {
        console.log(e.data)
        const newPoints = [...points, e.get('coords')]
        setPoints(newPoints)
        if (newPoints.length > 1) {
            calculateRoute(newPoints)
        }
    }

    const calculateRoute = async (points) => {
        const apiKey = 'b8523700-52c9-4862-88a8-1786f0dd32ec'
        const suggestKey = 'b563e42a-6825-44ab-b443-a1826554294f'
        const url = `https://api-maps.yandex.ru/2.1/?apikey=${apiKey}&suggest_apikey=${suggestKey}&lang=ru_RU&mode=dev`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                points: points.map(coord => coord.join(','))
            })
        })
        console.log(response.data)
        const data = await response.json()
        setRoute(data.routes[0].geometry.coordinates)

        const newObjects = points.map((point, index) => ({
            type: 'Feature',
            id: index.toString(),
            geometry: {
                type: 'Point',
                coordinates: point
            },
            properties: {
                hintContent: `Точка ${index + 1}`,
                balloonContent: `Координаты: ${point[0]}, ${point[1]}`
            }
        }))
        console.log(newObjects)
        setObjects(newObjects)
    }

    return (
        <YMaps
            query={{
                apikey: 'b8523700-52c9-4862-88a8-1786f0dd32ec',
                suggest_apikey: 'b563e42a-6825-44ab-b443-a1826554294f',
                mode: 'dev'
            }}
        >
            <div>
                <Map
                    defaultState={{ center: [55.751574, 37.573856], zoom: 10 }}
                    style={{ width: '640px', height: '400px'}}
                    onClick={handleMapClick}
                >
                    <SearchControl options={{ float: 'right', provider: 'yandex#search' }} />
                    <ObjectManager
                        options={{
                            clusterize: true,
                            gridSize: 32,
                        }}
                        objects={{
                            preset: 'islands#redDotIcon',
                        }}
                        clusters={{
                            preset: 'islands#invertedRedClusterIcons',
                        }}
                        features={objects}
                    />
                    {points.map((point, index) => (
                        <Placemark key={index} geometry={point} />
                    ))}
                    {route.length > 0 && <Polyline geometry={route} />}
                </Map>
            </div>
        </YMaps>
    )
}

export default MyMap;