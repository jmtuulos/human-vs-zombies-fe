import L from 'leaflet'

const iconGraveStone = new L.Icon({
    iconUrl: "/images/gravestone.png",
    iconRetinaUrl: "/images/gravestone.png",
    iconSize: new L.Point(30, 30),
    className: 'leaflet-div-icon'
})

export { iconGraveStone }
