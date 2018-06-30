// Require library
var Excel = require("exceljs");

var Costs = require("../models/Cost.js");
var Store = require("../models/Store");
var CostType = require("../models/CostType");
var Balance = require("../models/Balance");

// Create a new instance of a Workbook class

var ExcelManager = {};

ExcelManager.create = function (fromDate, toDate, fileName) {
  var monthITA = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno",
    "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"
  ];

  var today = new Date();
  var y = today.getFullYear();

  var workbook = new Excel.Workbook();

  // var monthNames = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];
  var storeDoc = [];

  var storePromise = Store.where("active").equals(true).exec(function (err, stores) {
    storeDoc = stores;
  });



  storePromise.then(function () {




    storeDoc.forEach(function (store) {
      var worksheet = workbook.addWorksheet(store.nome);
      var startFoodHeaderRowNumber = 4;

      var month = monthITA[fromDate.getMonth()];

      worksheet.mergeCells('A1', 'B1');
      worksheet.getCell('C1').value = 'Store';
      worksheet.mergeCells('C1', 'E1');
      worksheet.getCell('C1').value = '' + store.nome;
      worksheet.getCell('C1').font = {
        bold: true
      };

      worksheet.mergeCells('A2', 'B2');
      worksheet.getCell('A2').value = 'Mese';
      worksheet.mergeCells('C2', 'E2');
      worksheet.getCell('C2').value = '' + month;
      worksheet.getCell('C2').font = {
        bold: true
      };



      var headerFood = CostType.where("nome")
        .equals("Food")
        .exec(function (err, costTypeDoc) {
          var startJSONstr = '{"headers":[{"header": "", "key": "data", "width": 16}]}';
          var headerJsonObj = JSON.parse(startJSONstr);
          var JsonRowHeaderValue = [''];
          costTypeDoc.forEach(function (element) {
            JsonRowHeaderValue.push(element.subCategory);
            headerJsonObj.headers.push({
              key: element.subCategory,
              width: 16
            });
          });
          JsonRowHeaderValue.push('Totale Spese');
          headerJsonObj.headers.push({
            key: 'Totale Spese',
            width: 16
          });

          JsonRowHeaderValue.push('Incasso');
          headerJsonObj.headers.push({
            key: 'Incasso',
            width: 16
          });

          JsonRowHeaderValue.push('Incidenza %');
          headerJsonObj.headers.push({
            key: 'incidenza',
            width: 26
          });

          worksheet.getRow(startFoodHeaderRowNumber).values = JsonRowHeaderValue;
          worksheet.columns = headerJsonObj.headers;



          worksheet.columns.forEach(function (col) {
            col.eachCell({
              includeEmpty: true
            }, function (cell, rowNumber) {
              if (rowNumber == startFoodHeaderRowNumber) {
                cell.fill = {
                  type: 'pattern',
                  pattern: 'solid',
                  fgColor: {
                    argb: 'c6e0b4'
                  }
                };

                cell.font = {

                  bold: true
                };
              }
            });

          });


        });

      headerFood.then(function () {
        var FoodCosts = ExcelManager.getCosts(store._id, "Food", fromDate, toDate); //, function (costResults) {





        FoodCosts.then(function (costResults) {
          // console.log('FoodCost - ' + store._id);

          var currDate;
          var jsonRow;
          var curRow;

          /**
           * Inserisco i valori nella tabella Food
           */


          Balance.where('store').equals(store._id).where('value').equals(100).where('ref_date').gte(fromDate).where('ref_date').lt(toDate).exec(function (err, incassiResults) {
              // console.log(JSON.stringify(incassiResults));
              var objIncassi = {};
              incassiResults.forEach(function (incasso) {
                objIncassi[incasso.ref_date] = incasso.flash + incasso.rafa;
                // console.log("REF_DATA: %s VALORE %s", incasso.ref_date,objIncassi[incasso.ref_date] );
              });
              costResults.forEach(function (element, idx, array) {

                if (currDate) {
                  if (currDate.getTime() !== element._id.ref_date.getTime()) {
                    currDate = element._id.ref_date;
                    // console.log("Nuova Data= " + currDate);
                    if (jsonRow) {
                      var totaleRiga = 0.0;

                      var lastValue = 0.0; //Nellultima cella contata ci sono gli incassi
                      curRow = worksheet.addRow(jsonRow);
                      curRow.eachCell(function (cell, colNumber) {
                        // Salto la cella della data
                        if ((colNumber > 1) && (colNumber < curRow.cellCount - 2)) {
                          lastValue = cell.value;
                          totaleRiga += cell.value;
                        }
                      });
                      // Rimuovo l'ultimo valore dal totale
                      // totaleRiga = totaleRiga - lastValue;

                      curRow.getCell("Totale Spese").value = totaleRiga;
                      curRow.getCell("Totale Spese").fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: {
                          argb: 'e2efda'
                        }
                      };

                      curRow.getCell("incidenza").value = (curRow.getCell("Totale Spese").value / curRow.getCell("Incasso").value);
                      curRow.getCell("incidenza").numFmt = '0.00%';
                      curRow.getCell("incidenza").font = {
                        bold: true
                      };
                      // curRow.getCell("Incasso").value = objIncassi[currDate];
                    }
                    jsonRow = {};
                    jsonRow.data = element._id.ref_date;

                  }
                } else {
                  // console.log("currDate vuoto");
                  currDate = element._id.ref_date;
                  jsonRow = {};
                  jsonRow.data = element._id.ref_date;
                  // jsonRow["Incasso"] = currDate;
                }
                jsonRow[element._id.descrizione] = element.totale;
                jsonRow.Incasso = objIncassi[currDate];




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
                if ((colNumber > 1) && (colNumber < curRow.cellCount - 1)) {
                  totale += cell.value;
                }
              });
              curRow.getCell("Totale Spese").value = totale;
              curRow.getCell("Totale Spese").fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: {
                  argb: 'e2efda'
                }
              };
              curRow.getCell("incidenza").value = (curRow.getCell("Totale Spese").value / curRow.getCell("Incasso").value);
              curRow.getCell("incidenza").numFmt = '0.00%';
              curRow.getCell("incidenza").font = {
                bold: true
              };

              /**
               * Calcola e inserisce totale delle colonne
               */
              var numCol = 0;
              var rowValues = [];
              rowValues[1] = 'Tot periodo';
              worksheet.columns.forEach(function (col) {
                var totaleCol = 0.0;
                if (numCol > 0) {
                  col.eachCell({
                    includeEmpty: true
                  }, function (cell, rowNumber) {
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
              rowValues[numCol] = rowValues[numCol - 2] / rowValues[numCol - 1];
              curRow = worksheet.addRow(rowValues);
              curRow.eachCell({
                includeEmpty: true
              }, function (cell, colNumber) {
                cell.fill = {
                  type: 'pattern',
                  pattern: 'solid',
                  fgColor: {
                    argb: 'f8cbad'
                  }
                };

              });
              curRow.getCell("Totale Spese").fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: {
                  argb: 'a9d08e'
                }
              };
              curRow.getCell("incidenza").font = {

                bold: true
              };
              curRow.getCell("incidenza").numFmt = '0.00%';

              /**
               * FINE Calcola e inserisce totale delle colonne
               */
            }) //Incassi


            .then(function () {
              // console.log('DeliveryCost - ' + store._id);
              /**
               * Inizio Tabella Delivery
               */
              CostType.where("nome")
                .equals("Delivery")
                .exec(function (err, costTypeDoc) {
                  // console.log('DeliveryCost EXEC - ' + store._id);
                  var startDeliveryJSONstr =
                    '{"headers":[{"header": "", "key": "data_food", "width": 16}]}';
                  var JsonRowHeader = [''];

                  var deliveryJsonObj = JSON.parse(startDeliveryJSONstr);
                  costTypeDoc.forEach(function (element) {
                    JsonRowHeader.push(element.subCategory);

                    deliveryJsonObj.headers.push({
                      key: element.subCategory
                    });


                  });

                  JsonRowHeader.push('Tot.Delivery');
                  deliveryJsonObj.headers.push({
                    key: "totale_delivery",
                    width: 16
                  });

                  JsonRowHeader.push('Incasso');
                  deliveryJsonObj.headers.push({
                    key: 'Incasso',
                    width: 16
                  });

                  JsonRowHeader.push('Incidenza %');
                  deliveryJsonObj.headers.push({
                    key: 'incidenza',
                    width: 18
                  });
                  // console.log('DeliveryCost.rowCount: ' + worksheet.rowCount);
                  var lastRowNumber = worksheet.rowCount;

                  worksheet.getRow(lastRowNumber + 2).values = JsonRowHeader;
                  var curFoodRow = worksheet.getRow(lastRowNumber + 2);
                  worksheet.columns = deliveryJsonObj.headers;

                  curFoodRow.eachCell({
                    includeEmpty: true
                  }, function (cell, colNumber) {
                    cell.fill = {
                      type: 'pattern',
                      pattern: 'solid',
                      fgColor: {
                        argb: 'c6e0b4'
                      }
                    };

                    cell.font = {

                      bold: true
                    };


                  });
                  var startDeliveryRowNumber = lastRowNumber + 2;

                  var DeliveryCosts = ExcelManager.getCosts(store._id, "Delivery", fromDate, toDate); //, function (costResults) {
                  DeliveryCosts.then(function (costResults) {
                    var currDate;
                    var jsonRow;
                    totaleRiga = 0.0;
                    Balance.where('store').equals(store._id).where('value').equals(100).where('ref_date').gte(fromDate).where('ref_date').lt(toDate).exec(function (err, incassiResults) {
                      // console.log(JSON.stringify(incassiResults));
                      var objIncassi = {};
                      incassiResults.forEach(function (incasso) {
                        objIncassi[incasso.ref_date] = incasso.flash + incasso.rafa;
                        // console.log("REF_DATA: %s VALORE %s", incasso.ref_date,objIncassi[incasso.ref_date] );
                      });
                      costResults.forEach(function (element) {
                        if (currDate) {
                          if (currDate.getTime() !== element._id.ref_date.getTime()) {
                            currDate = element._id.ref_date;
                            // console.log("Nuova Data= " + currDate);
                            if (jsonRow) {
                              totaleRiga = 0.0;
                              curFoodRow = worksheet.addRow(jsonRow);
                              curFoodRow.eachCell(function (cell, colNumber) {
                                // Salto la cella della data
                                if ((colNumber > 1) && (colNumber < curFoodRow.cellCount - 2)) {
                                  totaleRiga += cell.value;
                                }
                              });
                              curFoodRow.getCell("totale_delivery").value = totaleRiga;
                              curFoodRow.getCell("totale_delivery").fill = {
                                type: 'pattern',
                                pattern: 'solid',
                                fgColor: {
                                  argb: 'e2efda'
                                }
                              };
                              curFoodRow.getCell("incidenza").value = (curFoodRow.getCell("totale_delivery").value / curFoodRow.getCell("Incasso").value);
                              curFoodRow.getCell("incidenza").numFmt = '0.00%';
                              curFoodRow.getCell("incidenza").font = {
                                bold: true
                              };
                            }
                            jsonRow = {};
                            jsonRow.data_food = element._id.ref_date;
                          }
                        } else {
                          // console.log("currDate vuoto");
                          currDate = element._id.ref_date;
                          jsonRow = {};
                          jsonRow.data_food = element._id.ref_date;
                        }
                        jsonRow[element._id.descrizione] = element.totale;
                        jsonRow.Incasso = objIncassi[currDate];
                      });
                      totaleRiga = 0.0;
                      curFoodRow = worksheet.addRow(jsonRow);
                      curFoodRow.eachCell(function (cell, colNumber) {
                        // Salto la cella della data
                        if ((colNumber > 1) && (colNumber < curFoodRow.cellCount - 1)) {
                          totaleRiga += cell.value;
                        }
                      });
                      curFoodRow.getCell("totale_delivery").value = totaleRiga;
                      curFoodRow.getCell("totale_delivery").fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: {
                          argb: 'e2efda'
                        }
                      };
                      curFoodRow.getCell("incidenza").value = (curFoodRow.getCell("totale_delivery").value / curFoodRow.getCell("Incasso").value);
                      curFoodRow.getCell("incidenza").numFmt = '0.00%';
                      curFoodRow.getCell("incidenza").font = {
                        bold: true
                      };
                      // worksheet.columns.push({header:"Pippo", key:"Pippo"});
                      /**
                       * Calcola e inserisce totale delle colonne
                       */
                      var numCol = 0;
                      var rowValues = [];
                      rowValues[1] = 'Tot periodo';
                      worksheet.columns.forEach(function (col) {
                        var totaleCol = 0.0;
                        if (numCol > 0) {
                          col.eachCell({
                            includeEmpty: true
                          }, function (cell, rowNumber) {
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
                      rowValues[numCol] = rowValues[numCol - 2] / rowValues[numCol - 1];
                      curRow = worksheet.addRow(rowValues);
                      curRow.eachCell({
                        includeEmpty: true
                      }, function (cell, colNumber) {
                        cell.fill = {
                          type: 'pattern',
                          pattern: 'solid',
                          fgColor: {
                            argb: 'f8cbad'
                          }
                        };

                      });
                      curRow.getCell("totale_delivery").fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: {
                          argb: 'a9d08e'
                        }
                      };
                      curRow.getCell("incidenza").font = {

                        bold: true
                      };
                      curRow.getCell("incidenza").numFmt = '0.00%';
                      

                      // workbook.xlsx.writeFile("ExcelFile_" + month + y + ".xlsx").then(function () {
                        workbook.xlsx.writeFile(fileName).then(function () {
                        console.log("file is written");
                      });
                    }); //DeliveryCosts.then
                  });
                }); //CostType.exec
            }); //Incassi.then

        }); //FoodCosts.then


      }); // headerFood.then
    }) //storeDoc.forEach




  });

  // ExcelManager.getCosts = function (storeID, type, from, to, callBack) {
  ExcelManager.getCosts = function (storeID, type, from, to) {
    return Costs.aggregate(
      [{
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
            _id: {
              ref_date: "$ref_date",
              descrizione: "$descrizione"
            },
            totale: {
              $sum: {
                $multiply: ["$valore", 1]
              }
            }
            // totale: { $sum: { $multiply: [ "$valore", "$fullType.percentage" ]} }
          }
        },
        {
          $sort: {
            _id: 1
          }
        }
      ]
    );
  };
};
/* 
ExcelManager.getIncassi = function (storeID, from, to) {
  return Balance.aggregate(
    [{
        $match: {
          ref_date: {
            $gte: from,
            $lt: to
          },
          "value": 100,
          "store": storeID
        }
      },
      {
        $group: {
          _id: {
            ref_date: "$ref_date"
          },

          cassa: {
            cassa: "$cassa"
          },
          pos: {
            pos: "$pos"
          },
          ticket: {
            ticket: "$ticket"
          },
          capital: {
            capital: "$capital"
          },
          prevCapital: {
            prevCapital: "$caprevCapitalssa"
          },
          flash: {
            flash: "$flash"
          },
          rafa: {
            rafa: "$rafa"
          },
          riserva: {
            riserva: "$riserva"
          },

          // totale: { $sum: { $multiply: [ "$valore", "$fullType.percentage" ]} }
        }
      },
      {
        $sort: {
          _id: 1
        }
      }
    ]
  );
}; */

module.exports = ExcelManager;