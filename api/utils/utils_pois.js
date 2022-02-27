const validPoiTypes = ['cafe', 'food', 'point_of_interest', 'establishment', 'restaurant', 'convenience_store', 'grocery_or_supermarket',
'store', 'bakery', 'supermarket', 'car_repair', 'park', 'tourist_attraction', 'gym', 'health', 'car_wash', 'liquor_store', 'shopping_mall',
'furniture_store', 'home_goods_store', 'lodging', 'laundry', 'hardware_store', 'electronics_store', 'hair_care', 'drugstore', 'bank', 'atm',
'finance', 'doctor', 'casino', 'car_dealer', 'pet_store', 'bar', 'town_square', 'accounting', 'pharmacy', 'other'];

exports.formatPoi = (poi) => {
    // TODO: This is a DEV call delete for prod
    // registerPoiTypeIfNotExists(poi.types);
    let safe_name = poi.name.replace(/"/g, "'");
    let safe_rating = poi.rating ? poi.rating : 0;
    let safe_rating_n = poi.rating_n ? poi.rating_n : 0;
    let typeSetStr = "('";
    for (type of poi.types) {
        if (!validPoiTypes.includes(type)) {
            throw Error(`invalidPoiType: ${type}`);
        }
        typeSetStr += `${type},`;
    }
    typeSetStr = typeSetStr.slice(0, -1);
    typeSetStr += "')";
    return {
        id: poi.id,
        name: safe_name, 
        address: poi.address, 
        lat: poi.coordinates.lat, 
        lng: poi.coordinates.lng,
        rating: safe_rating,
        rating_n: safe_rating_n,
        type: typeSetStr
    };
}

exports.formatPopularTimes = (poi) => {
    let outArr = [];
    const popTimesArr = poi.populartimes;
    for (let popTime of popTimesArr) {
        let day = dayToIntMapper(popTime.name);
        for (let i=0; i < 24; i++) {
            outArr.push({
                id: poi.id,
                day: day,
                hour: i,
                numOfPeople: popTime.data[i]
            });
        }
    }
    return outArr;
}

function dayToIntMapper(day) {
    switch(day) {
        case "Sunday":
            return 0;
        case "Monday":
            return 1;
        case "Tuesday":
            return 2;
        case "Wednesday":
            return 3;
        case "Thursday":
            return 4;
        case "Friday":
            return 5;
        case "Saturday":
            return 6;
    }
}


// Get to see what types a POI may be of
// TODO: This is a DEV function delete for prod
// var poi_types = [];
// function registerPoiTypeIfNotExists(types) {
//     for (let type of types) {
//         if (!poi_types.includes(type)) {
//             poi_types.push(type);
//         }
//     }
// }