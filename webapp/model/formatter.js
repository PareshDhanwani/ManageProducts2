sap.ui.define([
                "sap/ui/core/format/NumberFormat"
                ], function(NumberFormat){
                "use strict";
                return {
                                units: function(unitsInStock){
                                                if(parseInt(unitsInStock)<=10 && parseInt(unitsInStock)>0){
                                                	return "Warning";
                                                }
                                                else if(parseInt(unitsInStock)>10){
                                                	return "Success";
                                                }
                                                else if(parseInt(unitsInStock)===0){
                                                	return "Error";
                                                }
                                }
                };
}
);
