export const clusterLayerConfig = {
    "id": "l2vlgiq",
    "type": "cluster",
    "config": {
        "dataId": "public_transport_data",
        "label": "Rybnik",
        "columns": {
            "lat": "lat",
            "lng": "lon"
        },
        colorField: {
            name: "buses",
            type: "integer"
        },
        colorDomain: [1,2,3],
        colorScale: 'linear',
        sizeDomain: [10, 50],
        sizeScale: 'linear',
        sizeField: {
            name: "buses",
            type: "integer"
        },
        highlightColor: [
            235,
            255,
            155
        ],
        "isVisible": true,
        "visConfig": {
            "opacity": 0.39,
            "clusterRadius": 200.2,
            "colorRange": {
                "name": "Global Warming",
                "type": "sequential",
                "category": "Uber",
                "colors": [
                    "#FFC300",
                    "#F1920E",
                    "#E3611C",
                    "#C70039",
                    "#900C3F",
                    "#5A1846"
                ],
                "reversed": true
            },
            "radiusRange": [
                10.2,
                20.4
            ],
            "colorAggregation": "aggregation"
        },
        "hidden": false,
        "textLabel": [
            {
                "field": null,
                "color": [
                    255,
                    255,
                    255
                ],
                "size": 18,
                "offset": [
                    0,
                    0
                ],
                "anchor": "start",
                "alignment": "center"
            }
        ]
    },
    "visualChannels": {
        "colorField": {
            "name": "buses",
            "type": "integer"
        },
        "colorScale": "linear",
        sizeField: {
            name: "buses",
            type: "integer"
        },
        sizeScale: "sqrt"
    }
}