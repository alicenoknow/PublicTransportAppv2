export const clusterLayerConfig = {
    "id": "l2vlgiq",
    "type": "cluster",
    "config": {
        "dataId": "covid_19_data",
        "label": "Covid19",
        "color": [
            23,
            184,
            190
        ],
        "columns": {
            "lat": "lat",
            "lng": "lon"
        },
        "isVisible": false,
        "visConfig": {
            "opacity": 0.39,
            "clusterRadius": 30.2,
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
                4.2,
                49.4
            ],
            "colorAggregation": "sum"
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
            "name": "confirmed",
            "type": "integer"
        },
        "colorScale": "quantile"
    }
}