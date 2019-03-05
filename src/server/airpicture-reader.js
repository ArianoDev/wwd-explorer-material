var sleep = require('sleep');
var rti   = require('rticonnextdds-connector');

var connector = new rti.Connector("MyParticipantLibrary::Zero",__dirname + "/../../config/rti_dds_profiles.xml");
var input = connector.getInput("AirPictureSubscriber::AirPictureReader");

connector.on('on_data_available',
   function() {
     input.take();
     for (i=1; i <= input.samples.getLength(); i++) {
         if (input.infos.isValid(i)) {
             console.log('Data Arrived');
             console.log(JSON.stringify(input.samples.getJSON(i)) + '\n');
         }
     }

});

console.log("Waiting for data");
