import { ScatterplotLayer } from "@deck.gl/layers";


export default function getPointLayer(data, onHover) {
    const maxCommuters = Math.max.apply(
        Math,
        data.map(function (o) {
            return o.commuters;
        }),
    );

    return new ScatterplotLayer({
        id: "scatterplot-layer2",
        data: data,
        pickable: true,
        opacity: 0.3,
        stroked: false,
        filled: true,
        radiusMinPixels: 4,
        radiusScale: 10,
        getPosition: d => d.coordinates,
        getRadius: d =>  80 * (d.commuters / maxCommuters),
        getFillColor: _d => [150, 70, 230],
    });
}