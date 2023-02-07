export interface FeatureCollection {
    type: 'FeatureCollection';
    metadata: Metadata;
    features: Feature[];
}

export interface Metadata {
    generated: number; // 1675709293000
    url: string; // "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson"
    title: string; // "USGS Magnitude 2.5+ Earthquakes, Past Day"
    status: number; // 200
    api: string; // "1.10.3"
    count: number; // 103
}

export interface Feature {
    type: 'Feature';
    properties: Properties;
    geometry: Geometry;
    id: string; // "us6000jm1p"
}

export interface Properties {
    mag: number; // 5.3
    place: string; // "3 km W of Göksun, Turkey"
    time: number; // 1675706634838
    updated: number; // 1675708743504
    tz: number; // null
    url: string; // "https://earthquake.usgs.gov/earthquakes/eventpage/us6000jm1p"
    detail: string; // "https://earthquake.usgs.gov/earthquakes/feed/v1.0/detail/us6000jm1p.geojson"
    felt: number; // 1
    cdi: number; // 5.8
    mmi: number; // null
    alert: string; // null
    status: string; // "reviewed"
    tsunami: number; // 0
    sig: number; // 433
    net: string; // "us"
    code: string; // "6000jm1p"
    ids: string; // ",us6000jm1p,"
    sources: string; // ",us,"
    types: string; // ",dyfi,origin,phase-data,"
    nst: number; // 105
    dmin: number; // 0.963
    rms: number; // 1.44
    gap: number; // 23
    magType: string; // "mww"
    type: string; // "earthquake"
    title: string; // "M 5.3 - 3 km W of Göksun, Turkey"
}

export interface Geometry {
    type: 'Point';
    coordinates: number[]; // [36.4567, 38.0154, 10]
}
