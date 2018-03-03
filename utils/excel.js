// Require library
var Excel = require("exceljs");

var Costs = require("../models/Cost.js");
var CostType = require("../models/CostType");

// Create a new instance of a Workbook class

var ExcelManager = new Object();

ExcelManager.create = function() {
  var workbook = new Excel.Workbook();
  var worksheet = workbook.addWorksheet("My Sheet");

  

  CostType.where("nome")
    .equals("Food")
    .exec(function(err, costTypeDoc) {
      var startJSONstr = '{"headers":[{"header": "", "key": "data", "width": 16}]}';
      var headerJsonObj = JSON.parse(startJSONstr);
      costTypeDoc.forEach(element => {
        headerJsonObj["headers"].push({
          header: element.subCategory,
          key: element.subCategory
        });
      });

      worksheet.columns = headerJsonObj["headers"];

      ExcelManager.getCosts("Food", function(costResults) {
        var currDate;
        var jsonRow;
        costResults.forEach(element => {
          if (currDate) {
            if (currDate.getTime() !== element._id.ref_date.getTime()) {
              currDate = element._id.ref_date;
              console.log("Nuova Data= " + currDate);
              if (jsonRow) {
                worksheet.addRow(jsonRow);
              }
              jsonRow = {};
              jsonRow["data"] = element._id.ref_date;
            }
          } else {
            console.log("currDate vuoto");
            currDate = element._id.ref_date;
            jsonRow = {};
            jsonRow["data"] = element._id.ref_date;
          }
          jsonRow[element._id.descrizione] = element.totale;
        });
        worksheet.addRow(jsonRow);
        // worksheet.columns.push({header:"Pippo", key:"Pippo"});
        

        CostType.where("nome")
          .equals("Delivery")
          .exec(function(err, costTypeDoc) {
            var startDeliveryJSONstr =
              '{"headers":[{"header": "", "key": "data", "width": 16}]}';
            var JsonRowHeader = [''];

            var deliveryJsonObj = JSON.parse(startDeliveryJSONstr);
            costTypeDoc.forEach(element => {
              JsonRowHeader.push(element.subCategory);
              
              deliveryJsonObj["headers"].push({
                key: element.subCategory
              });

              JsonRowHeader.push('%');
              deliveryJsonObj["headers"].push({
                key: "perc_" + element.subCategory
              });
            });
            var lastRowNumber = worksheet.rowCount;

            console.log("JsonRowHeader:" + JsonRowHeader);
            console.log("deliveryJsonObj:" + JSON.stringify(deliveryJsonObj));
            console.log("lastRowNumber:" + lastRowNumber);
            worksheet.getRow(lastRowNumber + 2).values = JsonRowHeader;

            worksheet.columns = deliveryJsonObj["headers"];

            ExcelManager.getCosts("Delivery", function(costResults) {
              var currDate;
              var jsonRow;
              costResults.forEach(element => {
                if (currDate) {
                  if (currDate.getTime() !== element._id.ref_date.getTime()) {
                    currDate = element._id.ref_date;
                    console.log("Nuova Data= " + currDate);
                    if (jsonRow) {
                      worksheet.addRow(jsonRow);
                    }
                    jsonRow = {};
                    jsonRow["data"] = element._id.ref_date;
                  }
                } else {
                  console.log("currDate vuoto");
                  currDate = element._id.ref_date;
                  jsonRow = {};
                  jsonRow["data"] = element._id.ref_date;
                }
                jsonRow[element._id.descrizione] = element.totale;
              });
              worksheet.addRow(jsonRow);
              // worksheet.columns.push({header:"Pippo", key:"Pippo"});

              

              workbook.xlsx.writeFile("ExcelFile.xlsx").then(function() {
                console.log("file is written");
              });
            }); //ExcelManager.getCosts
          }); //CostType.where
      }); //ExcelManager.getCosts
    }); //CostType.where
};

ExcelManager.getCosts = function(type, callBack) {
  Costs.aggregate(
    [
      {
        $match: {
          ref_date: {
            $gte: new Date("2017-12-01T00:00:00.000Z"),
            $lt: new Date("2018-01-01T00:00:00.000Z")
          },
          "fullType.nome": type
        }
      },
      {
        $group: {
          _id: { ref_date: "$ref_date", descrizione: "$descrizione" },
          totale: { $sum: "$valore" }
        }
      },
      { $sort: { _id: 1 } }
    ],
    function(err, result) {
      if (err) {
        console.log(err);
        return;
      }
      //   console.log(result);
      callBack(result);
    }
  );
};

module.exports = ExcelManager;
