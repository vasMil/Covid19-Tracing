const db = require('../db/connect').promise();

const validPoiTypes = ['cafe', 'food', 'point_of_interest', 'establishment', 'restaurant', 'convenience_store', 'grocery_or_supermarket',
'store', 'bakery', 'supermarket', 'car_repair', 'park', 'tourist_attraction', 'gym', 'health', 'car_wash', 'liquor_store', 'shopping_mall',
'furniture_store', 'home_goods_store', 'lodging', 'laundry', 'hardware_store', 'electronics_store', 'hair_care', 'drugstore', 'bank', 'atm',
'finance', 'doctor', 'casino', 'car_dealer', 'pet_store', 'bar', 'town_square', 'accounting', 'pharmacy', 'other']

exports.searchPoi = async (req, res, next) => {
    try {
        // TODO: check if search is ok
        if (!validPoiTypes.includes(req.query.type) || !req.query.day || !req.query.hour || !req.query.lat || !req.query.lng) throw "InvalidRequest"

        const radiusInKm = 5;
        const [min_lat, ] = destinationPoint(req.query.lat, req.query.lng, 180, radiusInKm);
        const [max_lat, ] = destinationPoint(req.query.lat, req.query.lng, 0, radiusInKm);
        const [, min_lng] = destinationPoint(req.query.lat, req.query.lng, 270, radiusInKm);
        const [, max_lng] = destinationPoint(req.query.lat, req.query.lng, 90, radiusInKm);

        // TODO: Add lat and lng!!
        const [rows] = await db.execute(`CALL getPois(${min_lat}, ${max_lat}, ${min_lng}, ${max_lng}, "${req.query.type}", ${req.query.day}, ${req.query.hour}, ${2});`);

        return res.status(200).json({
            rows: rows[0],
            message: "Pois Found!",
            info: {
                min_lat: min_lat,
                max_lat: max_lat,
                min_lng: min_lng,
                max_lng: max_lng
            }
        });
    }
    catch (err) {
        if (err.message == "InvalidRequest") return res.status(200).json({message: "Request is invalid!"});
        // TODO: log errors
        console.log(err);
        return res.status(500).json({
            error: true,
            message: "Query failed!"
        });
    }
}


// SOURCE: https://stackoverflow.com/questions/2637023/how-to-calculate-the-latlng-of-a-point-a-certain-distance-away-from-another
function destinationPoint(lat, lng, brng, dist) {
    dist = dist / 6371;  
    brng = brng * Math.PI / 180;  

    let lat1 = lat * Math.PI / 180, lon1 = lng * Math.PI / 180;

    let lat2 = Math.asin(Math.sin(lat1) * Math.cos(dist) + 
                            Math.cos(lat1) * Math.sin(dist) * Math.cos(brng));

    let lon2 = lon1 + Math.atan2(Math.sin(brng) * Math.sin(dist) *
                                    Math.cos(lat1), 
                                    Math.cos(dist) - Math.sin(lat1) *
                                    Math.sin(lat2));

    if (isNaN(lat2) || isNaN(lon2)) return [null, null];

    return [lat2 * 180 / Math.PI, lon2 * 180 / Math.PI];
}