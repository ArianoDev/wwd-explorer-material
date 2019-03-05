var sleep = require('sleep');
var rti = require('rticonnextdds-connector');
var radar = require('flightradar24-client/lib/radar');

console.log("## STARTING FLIGHT-RADAR24 FETCHER ##");

var connector = new rti.Connector("MyParticipantLibrary::Zero", __dirname + "/../config/rti_dds_profiles.xml");
var output = connector.getOutput("AirPicturePublisher::AirPictureWriter");

setInterval(() => {
    /* We clear the instance associated to this output
       otherwise the sample will have the values set in the
       previous iteration
    */
    output.clear_members();

    console.log("Getting flights...");
    radar(53, 13, 52, 14)
        .then(flights => {
            console.log("Num of Flights: %s", flights.length);
            let tracks = [];
            flights.forEach(flight => {
                const track = {
                    'id': flight.id,
                    'flight': flight.flight,
                    'callsign': flight.callsign,
                    'latitude': flight.latitude,
                    'longitude': flight.longitude,
                    'altitude': flight.altitude,
                    'bearing': flight.bearing,
                    'speed': flight.speed,
                    'rateOfClimb': flight.rateOfClimb,
                    'model': flight.model,
                    'modeSCode': flight.modeSCode,
                    'timestamp': flight.timestamp
                };
                tracks.push(track);
            });
            output.instance.setFromJSON(tracks);
            
            console.log("Writing...");
            output.write();        
        })
        .catch((err) => {
            console.error(err);            
            process.exit(1);
        });
}, 2000);
