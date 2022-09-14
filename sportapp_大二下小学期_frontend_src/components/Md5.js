import React from 'react';

export default {
    md5Text(password) {
    var forge = require('node-forge');
    var md = forge.md.md5.create();
    md.update(password);
    var mdPass = md.digest().toHex();
    var md1 = forge.md.md5.create();
    md1.update(mdPass + 'sportssalt');
    return md1.digest().toHex();
    },
};
