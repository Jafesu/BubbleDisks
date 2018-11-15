const express = require('express');
const debug = require('debug')('app:diskRoutes');
const njds = require('nodejs-disks');

const diskRouter = express.Router();

function router(nav, title) {
  diskRouter.route('/')
    .get((req, res) => {
      (async function getDisks() {
        try {

          let disks = [];

          njds.drives(
            function (err, drives) {
              njds.drivesDetail(
                drives,
                function (err, data) {
                  for (var i = 0; i < data.length; i++) {
                    if (data[i].mountpoint != '/') {
                      disk = `{mount: ${data[i].mountpoint}, total: ${data[i].total}, free: ${data[i].available}, used: ${data[i].used}, name: ${data[i].drive}, usedPer: ${data[i].usedPer}, freePer: ${data[i].freePer}}`;
                      debug(disk);
                      disks.push('disk');

                    }
                  }
                }
              );
            }
          )
          res.render(
            'disks',
            {
              nav,
              title,
              active: 'Disks',
              disks
            }
          );
        } catch (err) {
          debug(err.stack);
        }
      }());
    });
  return diskRouter;
}

module.exports = router;
