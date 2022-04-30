export function parseBusStopsToDict(data) {
    if (data && data.features && data.features[0]) {
        return new Map(data.features.map(item => [item.properties.id, {
            id: item.properties.id,
            coordinates: item.geometry.coordinates,
            name: item.properties.name,
        }]))
    }
    return {};
}