/**
 * Copyright (c) 2018 Dell Inc., or its subsidiaries. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 */

const path = require("path");

module.exports = {
    /** resolves from test to snapshot path */
    resolveSnapshotPath: (testPath, snapshotExtension) => {
        return testPath.replace("src/", "__snapshots__/") + snapshotExtension;
    },

    /** resolves from snapshot to test path */
    resolveTestPath: (snapshotFilePath, snapshotExtension) => {
        return snapshotFilePath.replace("__snapshots__/", "src/").slice(0, -snapshotExtension.length);
    },

    testPathForConsistencyCheck: "some/__tests__/example.test.js",

    process(src, filename, config, options) {
        return "module.exports = " + JSON.stringify(path.basename(filename)) + ";";
    },
};
