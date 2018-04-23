// Require library
var Excel = require("exceljs");

var Costs = require("../models/Cost.js");
var Store = require("../models/Store");
var CostType = require("../models/CostType");

// Create a new instance of a Workbook class

var ExcelManager = new Object();

ExcelManager.create = function () {
  var monthITA = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno",
    "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"
  ];
  var workbook = new Excel.Workbook();

  const monthNames = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];
  var storeDoc = new Array();
  
  var storePromise = Store.where("active").equals(true).exec(function (err, stores) {
    storeDoc = stores
  });
  
  storePromise.then(function (){

    var today = new Date();
    var y = today.getFullYear();
    var m = today.getMonth();




    const startFoodHeaderRowNumber =  4;

    var fromDate = new Date(y, m - 1, 1, 0, 0, 0, 0);
    var toDate = new Date(y, m, 1, 0, 0, 0, 0);
    var month = monthITA[fromDate.getMonth()];


    storeDoc.forEach(store => {
      var worksheet = workbook.addWorksheet(store.nome);


      worksheet.mergeCells('A1', 'B1');
      worksheet.getCell('C1').value = 'Store';
      worksheet.mergeCells('C1', 'E1');
      worksheet.getCell('C1').value = '' + store.nome;
      worksheet.getCell('C1').font = { bold: true };

      worksheet.mergeCells('A2', 'B2');
      worksheet.getCell('A2').value = 'Mese';
      worksheet.mergeCells('C2', 'E2');
      worksheet.getCell('C2').value = '' + month;
      worksheet.getCell('C2').font = { bold: true };



      CostType.where("nome")
        .equals("Food")
        .exec(function (err, costTypeDoc) {
          var startJSONstr = '{"headers":[{"header": "", "key": "data", "width": 16}]}';
          var headerJsonObj = JSON.parse(startJSONstr);
          var JsonRowHeaderValue = [''];
          costTypeDoc.forEach(element => {
            JsonRowHeaderValue.push(element.subCategory);
            headerJsonObj["headers"].push({
              key: element.subCategory,
              width: 16
            });
          });
          JsonRowHeaderValue.push('Totale Spese');
          headerJsonObj["headers"].push({
            key: 'Totale Spese',
            width: 16
          });

          JsonRowHeaderValue.push('Incasso');
          headerJsonObj["headers"].push({
            key: 'Incasso',
            width: 16
          });

          worksheet.getRow(startFoodHeaderRowNumber).values = JsonRowHeaderValue;
          worksheet.columns = headerJsonObj["headers"];



          worksheet.columns.forEach(col => {
            col.eachCell({ includeEmpty: true }, function (cell, rowNumber) {
              if (rowNumber == startFoodHeaderRowNumber) {
                cell.fill = {
                  type: 'pattern',
                  pattern: 'solid',
                  fgColor: { argb: 'c6e0b4' }
                };

                cell.font = {

                  bold: true
                };
              }
            });

          });
          ExcelManager.getCosts(store._id, "Food", fromDate, toDate, function (costResults) {
            var currDate;
            var jsonRow;
            var curRow;

            /**
             * Inserisco i valori nella tabella Food
             */

            costResults.forEach(element => {
              if (currDate) {
                if (currDate.getTime() !== element._id.ref_date.getTime()) {
                  currDate = element._id.ref_date;
                  // console.log("Nuova Data= " + currDate);
                  if (jsonRow) {
                    var totaleRiga = 0.0;

                    curRow = worksheet.addRow(jsonRow);
                    curRow.eachCell(function (cell, colNumber) {
                      // Salto la cella della data
                      if (colNumber > 1) {
                        totaleRiga += cell.value;
                      }
                    });
                    curRow.getCell("Totale Spese").value = totaleRiga;
                    curRow.getCell("Totale Spese").fill = {
                      type: 'pattern',
                      pattern: 'solid',
                      fgColor: { argb: 'e2efda' }
                    };
                  }
                  jsonRow = {};
                  jsonRow["data"] = element._id.ref_date;
                }
              } else {
                // console.log("currDate vuoto");
                currDate = element._id.ref_date;
                jsonRow = {};
                jsonRow["data"] = element._id.ref_date;
              }
              jsonRow[element._id.descrizione] = element.totale;



              //INSERIRE INCASSI QUI
              // ********************************

              /* 
                            db.getCollection('balances').find({
                              ref_date: {
                                      $gte: ISODate("2018-03-01T00:00:00.000Z"),
                                      $lt: ISODate("2018-04-01T00:00:00.000Z")
                                    },
                                    value: 100,
                                    store: ObjectId("59b1a457dc14d315143c43e2")
                                    
                                    }).sort({ ref_date: 1 } )
                                     */

              // ********************************
            });

            /**
             * Fine inserimento valori tabella Food
             */

            /**
             * Calcolo i totali
             */
            var totale = 0.0;
            curRow = worksheet.addRow(jsonRow);

            curRow.eachCell(function (cell, colNumber) {
              // Salto la cella della data
              if (colNumber > 1) {
                totale += cell.value;
              }
            });
            curRow.getCell("Totale Spese").value = totale;
            curRow.getCell("Totale Spese").fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'e2efda' }
            };

            /**
             * Calcola e inserisce totale delle colonne
             */
            var numCol = 0;
            var rowValues = [];
            rowValues[1] = 'Tot periodo';
            worksheet.columns.forEach(col => {
              var totaleCol = 0.0;
              if (numCol > 0) {
                col.eachCell({ includeEmpty: true }, function (cell, rowNumber) {
                  if (rowNumber > startFoodHeaderRowNumber) {
                    if (cell.value) {
                      totaleCol += cell.value;
                    }
                  }
                });
                rowValues[numCol + 1] = totaleCol;
              }
              numCol++;
            });
            curRow = worksheet.addRow(rowValues);
            curRow.eachCell({ includeEmpty: true }, function (cell, colNumber) {
              cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'f8cbad' }
              };

            });
            curRow.getCell("Totale Spese").fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'a9d08e' }
            };
            curRow.getCell("Totale Spese").font = {

              bold: true
            };

            /**
             * FINE Calcola e inserisce totale delle colonne
             */


            /**
             * Inizio Tabella Delivery
             */
            CostType.where("nome")
              .equals("Delivery")
              .exec(function (err, costTypeDoc) {
                var startDeliveryJSONstr =
                  '{"headers":[{"header": "", "key": "data_food", "width": 16}]}';
                var JsonRowHeader = [''];

                var deliveryJsonObj = JSON.parse(startDeliveryJSONstr);
                costTypeDoc.forEach(element => {
                  JsonRowHeader.push(element.subCategory);

                  deliveryJsonObj["headers"].push({
                    key: element.subCategory
                  });


                });

                JsonRowHeader.push('Tot.Delivery');
                deliveryJsonObj["headers"].push({
                  key: "totale_delivery"
                });
                var lastRowNumber = worksheet.rowCount;

                worksheet.getRow(lastRowNumber + 2).values = JsonRowHeader;
                var curFoodRow = worksheet.getRow(lastRowNumber + 2);
                worksheet.columns = deliveryJsonObj["headers"];

                curFoodRow.eachCell({ includeEmpty: true }, function (cell, colNumber) {
                  cell.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'c6e0b4' }
                  };

                  cell.font = {

                    bold: true
                  };


                });
                var startDeliveryRowNumber = lastRowNumber + 2;

                ExcelManager.getCosts(store._id, "Delivery", fromDate, toDate, function (costResults) {
                  var currDate;
                  var jsonRow;
                  totaleRiga = 0.0;
                  costResults.forEach(element => {
                    if (currDate) {
                      if (currDate.getTime() !== element._id.ref_date.getTime()) {
                        currDate = element._id.ref_date;
                        // console.log("Nuova Data= " + currDate);
                        if (jsonRow) {
                          totaleRiga = 0.0;
                          curFoodRow = worksheet.addRow(jsonRow);
                          curFoodRow.eachCell(function (cell, colNumber) {
                            // Salto la cella della data
                            if (colNumber > 1) {
                              totaleRiga += cell.value;
                            }
                          });
                          curFoodRow.getCell("totale_delivery").value = totaleRiga;
                          curFoodRow.getCell("totale_delivery").fill = {
                            type: 'pattern',
                            pattern: 'solid',
                            fgColor: { argb: 'e2efda' }
                          };
                        }
                        jsonRow = {};
                        jsonRow["data_food"] = element._id.ref_date;
                      }
                    } else {
                      // console.log("currDate vuoto");
                      currDate = element._id.ref_date;
                      jsonRow = {};
                      jsonRow["data_food"] = element._id.ref_date;
                    }
                    jsonRow[element._id.descrizione] = element.totale;
                  });
                  totaleRiga = 0.0;
                  curFoodRow = worksheet.addRow(jsonRow);
                  curFoodRow.eachCell(function (cell, colNumber) {
                    // Salto la cella della data
                    if (colNumber > 1) {
                      totaleRiga += cell.value;
                    }
                  });
                  curFoodRow.getCell("totale_delivery").value = totaleRiga;
                  curFoodRow.getCell("totale_delivery").fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'e2efda' }
                  };
                  // worksheet.columns.push({header:"Pippo", key:"Pippo"});
                  /**
                  * Calcola e inserisce totale delle colonne
                  */
                  var numCol = 0;
                  var rowValues = [];
                  rowValues[1] = 'Tot periodo';
                  worksheet.columns.forEach(col => {
                    var totaleCol = 0.0;
                    if (numCol > 0) {
                      col.eachCell({ includeEmpty: true }, function (cell, rowNumber) {
                        if (rowNumber > startDeliveryRowNumber) {
                          if (cell.value) {
                            totaleCol += cell.value;
                          }
                        }
                      });
                      rowValues[numCol + 1] = totaleCol;
                    }
                    numCol++;
                  });
                  curRow = worksheet.addRow(rowValues);
                  curRow.eachCell({ includeEmpty: true }, function (cell, colNumber) {
                    cell.fill = {
                      type: 'pattern',
                      pattern: 'solid',
                      fgColor: { argb: 'f8cbad' }
                    };

                  });
                  curRow.getCell("totale_delivery").fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'a9d08e' }
                  };
                  curRow.getCell("totale_delivery").font = {

                    bold: true
                  };

                  workbook.xlsx.writeFile("ExcelFile_" + month + y + ".xlsx").then(function () {
                    console.log("file is written");
                  });
                }); //ExcelManager.getCosts
              }); //CostType.where
          }); //ExcelManager.getCosts
        }); //CostType.where

    }) // ForEach Store
  });
  // }); // Store



  console.log("=== FINE ===");
};

ExcelManager.getCosts = function (storeID, type, from, to, callBack) {
  Costs.aggregate(
    [
      {
        $match: {
          ref_date: {
            $gte: from,
            $lt: to
          },
          "fullType.nome": type,
          "store": storeID
        }
      },
      {
        $group: {
          _id: { ref_date: "$ref_date", descrizione: "$descrizione" },
          totale: { $sum: { $multiply: ["$valore", 1] } }
          // totale: { $sum: { $multiply: [ "$valore", "$fullType.percentage" ]} }
        }
      },
      { $sort: { _id: 1 } }
    ],
    function (err, result) {
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
