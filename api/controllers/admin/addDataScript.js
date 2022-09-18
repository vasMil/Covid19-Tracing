const bcrypt = require('bcryptjs');
const db = require("../../db/connect").promise();

const addDataStatus = {
    type: "NEW_DATA",
    rowsAttemped: 0,
    success: false,
    fileLastModified: null,
    filename: null
}

exports.addData = async (req, res, next) => {
    const noOfUsers = req.body.noOfUsers;
    const startDate = new Date(req.body.startDate);
    const endDate = new Date(req.body.endDate);
    console.log(startDate);
    console.log(endDate);

    try{
        let {query: usersQuery, firstUserId, lastUserId} = await createUsersQuery(noOfUsers);
        let visitsQuery = await createVisitsQuery(startDate, endDate, firstUserId, lastUserId);
        let casesQuery = await createCasesQuery(noOfUsers, firstUserId, startDate, endDate);
        await db.execute('SET TRANSACTION ISOLATION LEVEL READ COMMITTED');
        await db.beginTransaction();
        await db.execute(usersQuery);
        await db.execute(casesQuery);
        await db.execute(visitsQuery);

        await db.commit();
        res.status(200).json({
            success: true
        });
    }
    catch(err){
        db.rollback();
        console.log(err);
        res.status(200).json({
            success: false
        });
    }

}


async function createUsersQuery(noOfUsers) {
    // Select the last used id for a user
    let nextUserId;
    try {
        const [rows] = await db.execute(`SHOW TABLE STATUS LIKE 'user_table';`);
        nextUserId = rows[0].Auto_increment;
        console.log(nextUserId);
    } catch (err) {
        throw(err);
    }
    let insertUsersQuery = "INSERT INTO user_table (username, email, password) VALUES";

    for (let i = nextUserId; i < noOfUsers + nextUserId; i++) {
        const userName = "User" + i;
        const passHash = await bcrypt.hash(userName.toLowerCase() + "pass", 10);

        insertUsersQuery += ` ('${userName}', '${userName}@mail.com', '${passHash}'),`
    }

    insertUsersQuery = insertUsersQuery.slice(0, -1) + ';';
    return {
        query: insertUsersQuery, 
        firstUserId: nextUserId, 
        lastUserId: nextUserId + noOfUsers - 1
    };
}

function randomDateInRange(startDate, endDate) {
    let retDate = new Date(startDate);
    const diffDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    retDate.setDate(startDate.getDate() + getRandomInt(0, diffDays));
    return `${retDate.getFullYear()}-${retDate.getMonth()+1}-${retDate.getDate()}`
}

async function createCasesQuery(noOfUsers, minUserId, startDate, endDate) {
    const numOfCases = Math.round(noOfUsers * 0.2);
    let query = "INSERT INTO covid_case_table (user_id, date) VALUES";
    for(let i = 0; i < numOfCases; i++) {
        query += ` (${minUserId + getRandomInt(0,noOfUsers-1)}, "${randomDateInRange(startDate, endDate)}"),`
    }
    query = query.slice(0, -1) + ';';
    return query;
}

// source: https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range?fbclid=IwAR3zJ8oJ4T2-8ZX4Yp9KxC1IBwS42VYT-ThOxwmUZrWVPCjrzjMGgzXB4GE
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


async function createVisitsQuery(startDate, endDate, firstUserId, lastUserId) {
    let insertVisitsQuery = "INSERT INTO visit_table (user_id, poi_id, estimation, timestamp) VALUES";
    let currDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
    while(currDate <= endDate) {
        for(let i = firstUserId; i < lastUserId + 1; i++) {
            const numOfVisits = getRandomInt(5, 10);
            let obj = {
                nextPOI: undefined,
                hour: undefined
            };
            for(let j = 0; j < numOfVisits; j++) {
                obj = await getNextDestination(numOfVisits, obj.nextPOI, obj.hour);
                // console.log(obj.nextPOI, obj.hour);
                insertVisitsQuery += ` (${i}, '${obj.nextPOI.id}', ${getRandomInt(0, 100)}, '${currDate.getFullYear()}-${currDate.getMonth() + 1}-${currDate.getDate()}  ${obj.hour.getHours()}:${obj.hour.getMinutes()}:${obj.hour.getSeconds()}'),` 
            }
        }
        currDate.setDate(currDate.getDate() + 1);
    }
    insertVisitsQuery = insertVisitsQuery.slice(0, -1) + ';';
    return insertVisitsQuery;
}

async function getNextDestination(numOfVisits, currentPOI, hour) {
    if (currentPOI == undefined && hour == undefined) {
        const [rows] = await db.execute(`SELECT poi.id AS id, poi.latitude AS lat, poi.longitude AS lng FROM poi_table AS poi ORDER BY RAND() LIMIT 1;`);
        hour = new Date();
        hour.setHours(getRandomInt(0, 23 - 2*numOfVisits));
        hour.setMinutes(getRandomInt(0, 59));
        hour.setSeconds(getRandomInt(0, 59));
        return {
            nextPOI: {
                id: rows[0].id,
                lat: rows[0].lat,
                lng: rows[0].lng
            },
            hour: hour
        };
    }
    const radiusInKm = getRandomInt(1,3);
    const [min_lat, ] = destinationPoint(currentPOI.lat, currentPOI.lng, 180, radiusInKm);
    const [max_lat, ] = destinationPoint(currentPOI.lat, currentPOI.lng, 0, radiusInKm);
    const [, min_lng] = destinationPoint(currentPOI.lat, currentPOI.lng, 270, radiusInKm);
    const [, max_lng] = destinationPoint(currentPOI.lat, currentPOI.lng, 90, radiusInKm);

    const [rows] = await db.execute(`
        SELECT poi.id AS id, poi.latitude AS lat, poi.longitude AS lng
        FROM poi_table AS poi
        WHERE poi.latitude >= ${min_lat} AND poi.longitude >= ${min_lng}
            AND poi.latitude <= ${max_lat} AND poi.longitude <= ${max_lng}
        ORDER BY RAND() LIMIT 1;`);
    const timeRequired = distanceBetween(currentPOI.lat, currentPOI.lng, rows[0].lat, rows[0].lng) / 3;


    hour.setHours(hour.getHours() + Math.floor(timeRequired));
    hour.setMinutes(hour.getMinutes() + Math.floor((timeRequired*60) % 60));
    hour.setSeconds(hour.getSeconds() + Math.floor((timeRequired*3600) % 60));
    return {
        nextPOI : {
            id: rows[0].id,
            lat: rows[0].lat,
            lng: rows[0].lng
        },
        hour: hour
    };
}

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

// source: https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula?fbclid=IwAR2WvY8WfbzmLbIE5K8bbCJjnE8c3ehwlMrT112t3fl3Pkh-LuQ02gpi4nc
function distanceBetween(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }
  
  function deg2rad(deg) {
    return deg * (Math.PI/180)
  }

