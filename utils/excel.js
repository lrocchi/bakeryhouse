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

    var workbook = new Excel.Workbook();
    var storeDoc = [];
    var objIncassi = {};
    var storePromise = Store.where("active").equals(true).exec(function (err, stores) {
        storeDoc = stores;
    });
    storePromise.then(function () {

        storeDoc.forEach(function (store) {
            var worksheet = workbook.addWorksheet(store.nome);
            var startFoodHeaderRowNumber = 4;

            var month = monthITA[fromDate.getMonth()];
            // console.log('STORE: ' + store.nome);
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
            var headerFood = CostType.where("nome").equals("Food").exec(function (err, costTypeDoc) {
                var startJSONstr = '{"headers":[{"header": "", "key": "data", "width": 16}]}';
                var headerJsonObj = JSON.parse(startJSONstr);
                var JsonRowHeaderValue = [''];
                // console.log('headerFood: ' + store.nome);
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

                // console.log(worksheet.columns);

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
                // console.log("Column forEach Fine");

            });
            headerFood.then(function () {
                // console.log("headerFood.then");
                var FoodCosts = ExcelManager.getCosts(store._id, "Food", fromDate, toDate);
                // console.log("BEFORE BALANCE");
                FoodCosts.then(function (costResults) {
                    var jsonRow;
                    var curRow;
                    Balance.where('store').equals(store._id).where('value').equals(100).where('ref_date').gte(fromDate).where('ref_date').lt(toDate).sort({ ref_date: 1 }).exec(function (err, incassiResults) {
                        console.log("STORE: " + store.nome);
                        if (err) {
                            console.log("ERRORE: " + err);
                        } else {

                            var objIncassi = {};

                            // var startRow = worksheet.rowCount + 1;
                            incassiResults.forEach(function (incasso) {
                                jsonRow = {};
                                objIncassi[incasso.ref_date] = incasso.flash + incasso.rafa;
                                jsonRow.data = incasso.ref_date;
                                jsonRow.Incasso = incasso.flash + incasso.rafa;
                                curRow = worksheet.addRow(jsonRow);

                                curRow.getCell("Totale Spese").value = 0.0;
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
                                var totaleRiga = 0.0;
                                costResults.forEach(function (element, idx, array) {

                                    if (element._id.getTime() === incasso.ref_date.getTime()) {
                                        // console.log(idx);
                                        element.spese.forEach(function (elemSpese, ix, arr) {

                                            curRow.getCell(elemSpese.descr).value = elemSpese.total;
                                            totaleRiga += elemSpese.total;
                                        });
                                    };
                                    /*
                                    *Chiusura riga
                                    */
                                    curRow.getCell("Totale Spese").value = totaleRiga;
                                    curRow.getCell("Totale Spese").fill = {
                                        type: 'pattern',
                                        pattern: 'solid',
                                        fgColor: {
                                            argb: 'e2efda'
                                        }
                                    };

                                    curRow.getCell("incidenza").value = (curRow.getCell("Totale Spese").value / curRow.getCell("Incasso").value);
                                    // curRow.getCell("incidenza").numFmt = '0.00%';
                                    // curRow.getCell("incidenza").font = {
                                    //     bold: true
                                    // };


                                });
                            });

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


                            /** 
                             * 
                             * INSERISCO DELIVERY 
                             * 
                             * */
                            console.log('DeliveryCost - ' + store._id);
                            /**
                             * Inizio Tabella Delivery
                             */
                            CostType.where("nome").equals("Delivery").exec(function (err, costTypeDoc) {
                                // console.log('DeliveryCost EXEC - ' + store._id);
                                var startDeliveryJSONstr =
                                    '{"headers":[{"header": "", "key": "data_food", "width": 16}]}';
                                var JsonRowHeader = [''];

                                var deliveryJsonObj = JSON.parse(startDeliveryJSONstr);
                                // console.log(costTypeDoc);
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
                                var curDeliveryRow = worksheet.getRow(lastRowNumber + 2);
                                console.log("worksheet.rowCount: " + worksheet.rowCount);
                                worksheet.columns = deliveryJsonObj.headers;

                                curDeliveryRow.eachCell({
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

                                var startDeliveryRowNumber = worksheet.rowCount + 1;
                                var deliveryRowNumber = worksheet.rowCount + 1;
                                var DeliveryCosts = ExcelManager.getCosts(store._id, "Delivery", fromDate, toDate);
                                totaleRiga = 0.0;
                                DeliveryCosts.then(function (costResults) {
                                    var objIncassi = {};

                                    // var startRow = worksheet.rowCount + 1;
                                    incassiResults.forEach(function (incasso) {
                                        jsonRow = {};
                                        objIncassi[incasso.ref_date] = incasso.flash + incasso.rafa;
                                        jsonRow.data = incasso.ref_date;
                                        jsonRow.Incasso = incasso.flash + incasso.rafa;
                                        curRow = worksheet.addRow(jsonRow);
                                        // console.log('DeliveryCost.rowCount: ' + worksheet.rowCount);

                                        curRow.getCell("totale_delivery").value = 0.0;
                                        curRow.getCell("totale_delivery").fill = {
                                            type: 'pattern',
                                            pattern: 'solid',
                                            fgColor: {
                                                argb: 'e2efda'
                                            }
                                        };
                                        curRow.getCell("incidenza").value = (curRow.getCell("totale_delivery").value / curRow.getCell("Incasso").value);

                                        curRow.getCell("incidenza").numFmt = '0.00%';
                                        curRow.getCell("incidenza").font = {
                                            bold: true
                                        };
                                        totaleRiga = 0.0;
                                        costResults.forEach(function (element, idx, array) {

                                            if (element._id.getTime() === incasso.ref_date.getTime()) {
                                                // console.log(idx);
                                                element.spese.forEach(function (elemSpese, ix, arr) {

                                                    curRow.getCell(elemSpese.descr).value = elemSpese.total;
                                                    totaleRiga += elemSpese.total;
                                                });
                                            };
                                            /*
                                            *Chiusura riga
                                            */
                                            curRow.getCell("totale_delivery").value = totaleRiga;
                                            curRow.getCell("totale_delivery").fill = {
                                                type: 'pattern',
                                                pattern: 'solid',
                                                fgColor: {
                                                    argb: 'e2efda'
                                                }
                                            };

                                            curRow.getCell("incidenza").value = (curRow.getCell("totale_delivery").value / curRow.getCell("Incasso").value);
                                            // curRow.getCell("incidenza").numFmt = '0.00%';
                                            // curRow.getCell("incidenza").font = {
                                            //     bold: true
                                            // };


                                        });


                                       
                                    });

                                     /**
                                         * Calcola e inserisce totale delle colonne
                                         */


                                        var numCol = 0;
                                        var realNumCol = 0;
                                        var rowValues = [];
                                        rowValues[1] = 'Tot periodo';
                                        // console.log('COLONNE: ' + curRow.actualCellCount);
                                        worksheet.columns.forEach(function (col) {
                                            var totaleCol = 0.0;
                                            if (numCol > 0 && numCol < curRow.getCell("incidenza").col) {
                                                realNumCol++;
                                                col.eachCell({
                                                    includeEmpty: true
                                                }, function (cell, rowNumber) {
                                                    if (rowNumber >= startDeliveryRowNumber) {
                                                        if (cell.value) {
                                                            totaleCol += cell.value;
                                                        }
                                                    }
                                                });
                                                rowValues[numCol + 1] = totaleCol;
                                            }
                                            numCol++;
                                        });
                                        realNumCol++;
                                        rowValues[realNumCol] = rowValues[realNumCol - 2] / rowValues[realNumCol - 1];
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

                                        /**
                                         * FINE Calcola e inserisce totale delle colonne
                                         */

                                        workbook.xlsx.writeFile(fileName).then(function () {
                                            console.log("file is written");
                                        });

                                });



                            });


                        }

                    });

                });
            });

        });
    });
};

// ExcelManager.getCosts = function (storeID, type, from, to, callBack) {
ExcelManager.getCosts = function (storeID, type, from, to) {

    // console.log('ExcelManager.getCosts: ' + storeID);
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
            $group: {
                _id: "$_id.ref_date",
                spese: {
                    $push: {
                        descr: "$_id.descrizione",
                        total: "$totale"
                    }
                }
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


module.exports = ExcelManager;