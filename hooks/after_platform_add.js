'use strict';

const xcode = require('xcode'),
    fs = require('fs'),
    path = require('path');

module.exports = function(context) {
    if(process.length >=5 && process.argv[1].indexOf('cordova') == -1) {
        if(process.argv[4] != 'ios') {
            return;
        }
    }

    function fromDir(startPath,filter, rec, multiple){
        if (!fs.existsSync(startPath)){
            console.log("no dir ", startPath);
            return;
        }

        const files=fs.readdirSync(startPath);
        var resultFiles = []
        for(var i=0;i<files.length;i++){
            var filename=path.join(startPath,files[i]);
            var stat = fs.lstatSync(filename);
            if (stat.isDirectory() && rec){
                fromDir(filename,filter);
            }

            if (filename.indexOf(filter)>=0) {
                if (multiple) {
                    resultFiles.push(filename);
                } else {
                    return filename;
                }
            }
        }
        if(multiple) {
            return resultFiles;
        }
    }

    function getFileIdAndRemoveFromFrameworks(myProj, fileBasename) {
        var fileId = '';
        const pbxFrameworksBuildPhaseObjFiles = myProj.pbxFrameworksBuildPhaseObj(myProj.getFirstTarget().uuid).files;
        for(var i=0; i<pbxFrameworksBuildPhaseObjFiles.length;i++) {
            var frameworkBuildPhaseFile = pbxFrameworksBuildPhaseObjFiles[i];
            if(frameworkBuildPhaseFile.comment && frameworkBuildPhaseFile.comment.indexOf(fileBasename) != -1) {
                fileId = frameworkBuildPhaseFile.value;
                pbxFrameworksBuildPhaseObjFiles.splice(i,1);
                break;
            }
        }
        return fileId;
    }

    function getFileRefFromName(myProj, fName) {
        const fileReferences = myProj.hash.project.objects['PBXFileReference'];
        var fileRef = '';
        for(var ref in fileReferences) {
            if(ref.indexOf('_comment') == -1) {
                var tmpFileRef = fileReferences[ref];
                if(tmpFileRef.name && tmpFileRef.name.indexOf(fName) != -1) {
                    fileRef = ref;
                    break;
                }
            }
        }
        return fileRef;
    }

    const xcodeProjPath = fromDir('platforms/ios','.xcodeproj', false);
    const projectPath = xcodeProjPath + '/project.pbxproj';
    const myProj = xcode.project(projectPath);

    function addRunpathSearchBuildProperty(proj, build) {
       const LD_RUNPATH_SEARCH_PATHS =  proj.getBuildProperty("LD_RUNPATH_SEARCH_PATHS", build);
       if(!LD_RUNPATH_SEARCH_PATHS) {
          proj.addBuildProperty("LD_RUNPATH_SEARCH_PATHS", "\"$(inherited) @executable_path/Frameworks\"", build);
       } else if(LD_RUNPATH_SEARCH_PATHS.indexOf("@executable_path/Frameworks") == -1) {
          var newValue = LD_RUNPATH_SEARCH_PATHS.substr(0,LD_RUNPATH_SEARCH_PATHS.length-1);
          newValue += ' @executable_path/Frameworks\"';
          proj.updateBuildProperty("LD_RUNPATH_SEARCH_PATHS", newValue, build);
       }
    }

    myProj.parseSync();
    addRunpathSearchBuildProperty(myProj, "Debug");
    addRunpathSearchBuildProperty(myProj, "Release");

    var projectName = myProj.getFirstTarget().firstTarget.name.substr(1);
    projectName = projectName.substr(0, projectName.length-1);

    // ADD TO EMBEDED FRAMEWORKS

    const groupName = 'Embed Frameworks ' + context.opts.plugin.id;
    const pluginPathInPlatformIosDir = projectName + '/Plugins/' + context.opts.plugin.id;

    process.chdir('./platforms/ios');
    const frameworkFilesToEmbed = fromDir(pluginPathInPlatformIosDir ,'.framework', false, true);
    process.chdir('../../');

    if(!frameworkFilesToEmbed.length) return;

    myProj.addBuildPhase(frameworkFilesToEmbed, 'PBXCopyFilesBuildPhase', groupName, myProj.getFirstTarget().uuid, 'frameworks');

    for(var frmFileFullPath of frameworkFilesToEmbed) {

        var justFrameworkFile = path.basename(frmFileFullPath);
        var fileRef = getFileRefFromName(myProj, justFrameworkFile);
        var fileId = getFileIdAndRemoveFromFrameworks(myProj, justFrameworkFile);

        var file = {
            uuid: fileId,
            basename: justFrameworkFile,
            settings: {
                ATTRIBUTES: ["CodeSignOnCopy", "RemoveHeadersOnCopy"]
            },

            fileRef:fileRef,
            group:groupName
        };
        myProj.addToPbxBuildFileSection(file);

        var newFrameworkFileEntry = {
            uuid: myProj.generateUuid(),
            basename: justFrameworkFile,

            fileRef:fileRef,
            group: "Frameworks"
        };
        myProj.addToPbxBuildFileSection(newFrameworkFileEntry);
        myProj.addToPbxFrameworksBuildPhase(newFrameworkFileEntry);
    }

    fs.writeFileSync(projectPath, myProj.writeSync());
    console.log('Embedded Frameworks In ' + context.opts.plugin.id);

    // ADD BUILD PHASE TO TRIM FRAMEWORK
    var buildPhase = myProj.addBuildPhase([], 'PBXShellScriptBuildPhase', 'ShellScript', myProj.getFirstTarget().uuid).buildPhase;
    buildPhase['shellPath'] = '/bin/sh';
    buildPhase['shellScript'] = '"APP_PATH=\\"${TARGET_BUILD_DIR}/${WRAPPER_NAME}\\"\\n\\n# This script loops through the frameworks embedded in the application and\\n# removes unused architectures.\\nfind \\"$APP_PATH\\" -name \'*.framework\' -type d | while read -r FRAMEWORK\\ndo\\nFRAMEWORK_EXECUTABLE_NAME=$(defaults read \\"$FRAMEWORK/Info.plist\\" CFBundleExecutable)\\nFRAMEWORK_EXECUTABLE_PATH=\\"$FRAMEWORK/$FRAMEWORK_EXECUTABLE_NAME\\"\\necho \\"Executable is $FRAMEWORK_EXECUTABLE_PATH\\"\\n\\nEXTRACTED_ARCHS=()\\n\\nfor ARCH in $ARCHS\\ndo\\necho \\"Extracting $ARCH from $FRAMEWORK_EXECUTABLE_NAME\\"\\nlipo -extract \\"$ARCH\\" \\"$FRAMEWORK_EXECUTABLE_PATH\\" -o \\"$FRAMEWORK_EXECUTABLE_PATH-$ARCH\\"\\nEXTRACTED_ARCHS+=(\\"$FRAMEWORK_EXECUTABLE_PATH-$ARCH\\")\\ndone\\n\\necho \\"Merging extracted architectures: ${ARCHS}\\"\\nlipo -o \\"$FRAMEWORK_EXECUTABLE_PATH-merged\\" -create \\"${EXTRACTED_ARCHS[@]}\\"\\nrm \\"${EXTRACTED_ARCHS[@]}\\"\\n\\necho \\"Replacing original executable with thinned version\\"\\nrm \\"$FRAMEWORK_EXECUTABLE_PATH\\"\\nmv \\"$FRAMEWORK_EXECUTABLE_PATH-merged\\" \\"$FRAMEWORK_EXECUTABLE_PATH\\"\\n\\ndone"';
    buildPhase['runOnlyForDeploymentPostprocessing'] = 0;

    fs.writeFileSync(projectPath, myProj.writeSync());
    console.log('Added Arch Trim run script build phase');
};