import { ScatterplotLayer } from "@deck.gl/layers";


export default function getPointLayer(data, onHover) {
    const maxCommuters = Math.max.apply(
        Math,
        data.map(function (o) {
            return o.commuters;
        }),
    );

    return new ScatterplotLayer({
        id: "scatterplot-layer",
        data: data,
        pickable: true,
        opacity: 0.3,
        stroked: false,
        filled: true,
        radiusScale: 10,
        radiusMinPixels: 4,
        radiusScale: 10,
        getPosition: d => d.coordinates,
        getRadius: d =>  130 * (d.commuters / maxCommuters),
        getFillColor: _d => [220, 20, 130],
    });
}