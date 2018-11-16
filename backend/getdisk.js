const njds = require('nodejs-disks');
const { MongoClient } = require('mongodb');




const getDisks = () => {
    console.log("Would not have been possible without my trusty RubberDucky Fuster");
    let disks = [];
    njds.drives(
      function (err, drives) {
        njds.drivesDetail(
          drives,
          function (err, data) {
            for (var i = 0; i < data.length; i++) {
              if (data[i].mountpoint != null) {
                disks.push({'mount': data[i].mountpoint, 'total': parseFloat(data[i].total.replace(' GB', '')), 'free': parseFloat(data[i].available.replace(' GB', '')), 'used': parseFloat(data[i].used.replace(' GB', '')), 'name': data[i].drive, 'usedPer': data[i].usedPer, 'freePer': data[i].freePer});
              }
            }
            console.log(disks);
            (async function mongo() {
                let client;
                const url = 'mongodb://localhost:27017';
                const dbName = 'diskInfo';
                try {
                    client = await MongoClient.connect(url);
                    console.log('Connected to server');
            
                    const db = client.db(dbName);
                    const response = await db.collection('disks').insertMany(disks);
                    console.log(response)
                } catch (err) {
                    console.log(err.stack);
                }
            
                client.close();
                
            }());
            
          }
        )
      }
    ) 
  }

  const listDisks = () => {
    (async function mongo() {
        let client;
        const url = 'mongodb://localhost:27017';
        const dbName = 'diskInfo';
        try {
            client = await MongoClient.connect(url);
            console.log('Connected to server');
    
            const db = client.db(dbName);
            const col = await db.collection('disks');
            const response = await col.find().toArray();
            console.log(response)
        } catch (err) {
            console.log(err.stack);
        }
    
        client.close();
    }());
  }
  getDisks();
  listDisks();
  
  