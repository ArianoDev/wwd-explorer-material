var rti = require('rticonnextdds-connector');

var connector = new rti.Connector("MyParticipantLibrary::Zero", __dirname + "/../config/rti_dds_profiles.xml");
var input = connector.getInput("AirPictureSubscriber::AirPictureReader");

exports.startReader = function (listener) {
    console.log("Waiting for data");
    connector.on('on_data_available', function () {
        input.take();
        for (i = 1; i <= input.samples.getLength(); i++) {
            if (input.infos.isValid(i)) {
                console.log('Data Arrived: ', input.samples);
                
                var data = input.samples.getJSON(i);
                console.log('[SERVER] Data Arrived - size = ' + data.tracks.length);
                console.log('[SERVER] Data: ', data);
                console.log('[SERVER] Invoking listener');
                listener(data.tracks);
            }
        }
    });
};
