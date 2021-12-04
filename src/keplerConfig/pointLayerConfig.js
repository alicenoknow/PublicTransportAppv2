export const pointLayerConfig = {
    id: "hty62yd",
    type: "point",
    config: {
        dataId: "public_transport_data",
        label: " Rybnik",
        // colorField: {
        //     name: "buses",
        //     type: "integer"
        // },
        // colorDomain: [1,2,3],
        // colorScale: 'linear',
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
        columns: {
            lat: "lat",
            lng: "lon",
            altitude: ""
        },
        isVisible: true,
        visConfig: {
            radius: 50,
            radiusBasedOn: 'buses',
            radiusField: 'buses',
            fixedRadius: false,
            opacity: 0.5,
            outline: false,
            // thickness: 10,
            colorRange: {
                name: "ColorBrewer PRGn-6",
                type: "diverging",
                category: "ColorBrewer",
                colors: [
                    "#762a83",
                    "#af8dc3",
                    "#e7d4e8",
                    "#d9f0d3",
                    "#7fbf7b",
                    "#1b7837"
                ],
                reversed: false
            },
            radiusRange: [
                4.2,
                250.2
            ],
            "hi-precision": false
        }
    },

    visualChannels: {
        colorField: {
            name: "buses",
            type: "integer"
        },
        colorScale: "linear",
        sizeField: {
            name: "buses",
            type: "integer"
        },
        sizeScale: "sqrt"
    }
}