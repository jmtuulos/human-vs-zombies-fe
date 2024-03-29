import { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, Polygon, Popup } from 'react-leaflet'
import * as L from "leaflet";
import { iconMission } from '../../../icons/mission';

const MissionInfoMap = ({ gameMap, marker }) => {

    const latlngs = gameMap.map((coordinate) => [coordinate.latitude, coordinate.longitude])

    return (
        <MapContainer center={L.latLngBounds(latlngs).getCenter()} zoom={16} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker icon={iconMission} position={marker}>
                <Popup>
                    Mission marker
                </Popup>
            </Marker>

            <Polygon positions={latlngs}></Polygon>

        </MapContainer>

    )
}

export default MissionInfoMap