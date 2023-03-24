import L from 'leaflet'

const iconZombie = new L.Icon({
    iconUrl: "/images/zombie_map.png",
    iconRetinaUrl: "/images/zombie_map.png",
    iconSize: new L.Point(30, 30),
    className: 'leaflet-div-icon'
})

export { iconZombie }
