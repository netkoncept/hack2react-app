var path = require("path");
var fs = require('fs');
var exec = require('child_process').exec;



module.exports = function (hookArgs) {
    const platformFromHookArgs = hookArgs && (hookArgs.platform || (hookArgs.prepareData && hookArgs.prepareData.platform));
    const platform = (platformFromHookArgs  || '').toLowerCase();

    function execute(command, callback){
        exec(command, function(error, stdout, stderr){ callback(stdout); });
    }

    return new Promise(function (resolve, reject) {
        // Reading
        const config = require("../../app/config/config.json");
        const clientPath = "./app/";

        if(config) {
            let filePathIcon;
            let filePathSplash;

            if(config.appIconCustom){ //custom icon for radzionkow - zmienia logo w splashu i logo aplikacji na liście aplikacji (logo w headerze zostaje takie samo)
                config.appIcon = config.appIconCustom;
            }
            if(config.appIconCustomIos){ //custom icon for radzionkow - zmienia logo w splashu i logo aplikacji na liście aplikacji (logo w headerze zostaje takie samo)
                config.appIconIos = config.appIconCustomIos;
            }

            if (platform === 'android') {
                if (config.appIcon){
                    filePathIcon = clientPath+ "/images/" + config.appIcon;
                }

            } else if (platform === 'ios') {
                if (config.appIconIos){
                    filePathIcon = clientPath+ "/images/" + config.appIconIos;
                } else{
                    filePathIcon = clientPath+ "/images/" + config.appIcon;
                }
            }

            if (config.splashImage) {
                filePathSplash = clientPath+ "/images/" + config.splashImage;
            } else {
                filePathSplash = filePathIcon;
            }
            if (fs.existsSync(filePathIcon)) {
                try {
                    //Generating icons
                    execute("tns resources generate icons " + filePathIcon, function() {
                        console.log('Icons generated');
                    });
                } catch(err) {
                    console.error(err);
                    resolve();
                }

            } else {
                resolve();
            }
            if (fs.existsSync(filePathSplash)) {
                try {
                    //Generating splashes
                    if (config.splashBg) {
                        execute("tns resources generate splashes " + filePathSplash + " --background " + config.splashBg, function () {
                            console.log('Splahes generated');
                            resolve();
                        });
                    } else {
                        execute("tns resources generate splashes " + filePathSplash, function () {
                            console.log('Splahes generated');
                            resolve();
                        });
                    }
                } catch (err) {
                    console.error(err);
                    resolve();
                }
            }
        } else {
            resolve();
        }

    });
};
