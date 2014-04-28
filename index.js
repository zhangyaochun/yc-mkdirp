'use strict';

exports.mkdirp = function(dirpath, mode) {
    //90% user will not pass mode
    //511 and parseInt('0777', 8)? it is eq
    //umask is linux command
    mode = mode || parseInt('0777', 8) & (~process.umask());

    //fix dirpath like a/b/c
    //you can see more about reduce from mdn 
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
    dirpath.split(/[\/\\]/g).reduce(function(parts, part) {
        
        parts += part + '/';

        //resolve path
        var subpath = path.resolve(parts);
        
        //just handle no exist path
        if (!exists(subpath)) {
            fs.mkdirSync(subpath, mode);
        }

        //important
        return parts;

    }, '');

};