const express = require('express');
const debug = require('debug')('app:diskRoutes');
const njds = require('nodejs-disks');

const diskRouter = express.Router();

function router(nav, title) {
  diskRouter.route('/')
    .get((req, res) => {
      (async function showDisks(){
        try{
          const disks = await getDisks();
          const diskChart = await scriptDisks(disks);
          const diskID = await displayDisks(disks);

          res.render(
            'disks',
            {
              nav,
              title,
              active: 'Disks',
              disks,
              diskChart,
              diskID
            }
          );

        } catch(err){
          debug(err.stack);
        }
      }());
    });
  return diskRouter;
}



const scriptDisks = (disks) => {
  let diskgraphs = [];
  for (let i = 0; i < disks.length; i++) {
    diskgraphs.push(`
    <script>
        jQuery(function ($) {
          var diskinfo = [
              ["Free", ${disks[i].free}],
              ["In Use", ${disks[i].used}],
          ]
      
          $("#disk-chart${i}").shieldChart({
              theme: "dark",
              primaryHeader: {
                  text: "Total Disk Usage (GB)"
              },
              seriesSettings: {
                  pie: {
                      enablePointSelection: true,
                      addToLegend: true
                  },
                  tooltipSettings: {
                      customPointText: "{point.collectionAlias}: {point.y}"
                  }
              },
              chartLegend: {
                  align: "center",
                  borderRadius: 2,
                  borderWidth: 2,
                  verticalAlign: "top"
              },
              exportOptions: {
                  image: false,
                  print: false
              },
              dataSeries: [{
                  seriesType: "pie",
                  collectionAlias: "disk",
                  data: diskinfo
              }]
          });  
            
      });
      </script>
    `);
    }
}

const displayDisks = (disks) => {
  diskids = [];
  for (let i = 0; i < disks.length; i++) {
    diskids.push(`{ id: ${i}}`);
  }
  return diskids;
}

module.exports = router;
