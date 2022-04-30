import { ScatterplotLayer } from "@deck.gl/layers";


export default function getPointLayer(data, id, onClick, fillColor) {
    return new ScatterplotLayer({
        id: id,
        data: data,
        pickable: true,
        opacity: 0.6,
        stroked: false,
        filled: true,
        radiusScale: 10,
        radiusMinPixels: 4,
        radiusMaxPixels: 30,
        lineWidthMinPixels: 1,
        getPosition: d => d.coordinates,
        getRadius: d => Math.sqrt(d.exits),
        getFillColor: _d => fillColor ?? [120, 0, 120],
        onClick: onClick

    });
}