module.exports = function (ctx) {

    if (ctx.opts.cordova.platforms.indexOf('android') < 0) {

        return;
    }

    var fs = ctx.requireCordovaModule('fs');
    var path = ctx.requireCordovaModule('path');
    var deferral = ctx.requireCordovaModule('q').defer();

    var platformRoot = path.join(ctx.opts.projectRoot, 'platforms/android');

    if (!fs.existsSync(platformRoot)){

        console.log("Gradle check failed ");
    }
    else{

        var files=fs.readdirSync(platformRoot);

        for(var i=0;i<files.length;i++){

            var tmpPath = path.join(platformRoot,files[i]);
            var stat = fs.lstatSync(tmpPath);

            if (tmpPath.indexOf(".gradle") >= 0 && tmpPath.indexOf("wrapper") < 0 && tmpPath.indexOf("settings") < 0) {

                var gradleFileLocation = tmpPath;
            };
        };

        if(gradleFileLocation){

            fs.readFile(gradleFileLocation, 'utf-8', function (err, data) {

                if (err){

                    throw err;
                } 
                else{

                    var newValue = data;

                    if (data.indexOf('classpath \'io.realm:realm-gradle-plugin') === -1) {

                        newValue = newValue.replace('classpath', 'classpath \'io.realm:realm-gradle-plugin:2.2.0\'\nclasspath');
                    }

                    if (newValue.indexOf('mavenCentral()') === -1) {

                        newValue = newValue.replace('jcenter()','mavenCentral()\njcenter()')
                    }

                    fs.writeFile(gradleFileLocation, newValue, 'utf-8', function (err) {

                        if (err){

                            throw err;
                        } 
                        else{

                            deferral.resolve();
                            
                            console.log('Gradle checked.');
                        }
                    });
                }
            });
        }
        else{

            console.log("Gradle check failed ");
        }
    }

    return deferral.promise;
};