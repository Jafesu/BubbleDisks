const njds = require('nodejs-disks');
const mongo = require('mongodb');

const getDisks = () => {
    let disks =[];
    const url = 'mongodb://localhost:27017';
    const dbName = 'diskInfo';

    njds.drives(
      function (err, drives) {
        njds.drivesDetail(
          drives,
          function (err, data) {
            for (var i = 0; i < data.length; i++) {
              if (data[i].mountpoint != null) {
                disk = `{mount: ${data[i].mountpoint}, total: ${parseFloat(data[i].total.replace(' GB', ''))},free: ${parseFloat(data[i].available.replace(' GB', ''))}, used: ${parseFloat(data[i].used.replace(' GB', ''))}, name: ${data[i].drive}, usedPer: ${data[i].usedPer}, freePer: ${data[i].freePer}}`;
                disks.push(disk);
              }
            }
            
          }
        )
      }
    ) 
    return disks; 
  }


