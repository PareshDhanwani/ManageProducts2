sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"../model/formatter",
	"sap/ui/model/Filter"
], function (Controller,formatter,Filter) {
	"use strict";

	return Controller.extend("manageproducts.ManageProducts2.controller.App", {
		formatter:formatter,
		onInit: function () {

		},
		onBeforeRendering: function(){
			var data=this.getView().getModel("product").getData();
			 this.count=data.products.length;
			this.getView().byId("tableHeader").setText("Products ("+this.count+")");
			this.getView().byId("all").setCount(this.count);
			 this.inStock=0;
			 this.shortage=0;
			 this.outOfStock=0;
			for(var i=0;i<this.count;i++){
				if(parseInt(data.products[i].unitsInStock)<=10 && parseInt(data.products[i].unitsInStock)>0){
					this.shortage++;
				}
				else if(parseInt(data.products[i].unitsInStock)>10){
					this.inStock++;
				}
				else if(parseInt(data.products[i].unitsInStock)===0){
					this.outOfStock++;
				}
			}
			this.getView().byId("inStock").setCount(this.inStock);
			this.getView().byId("shortage").setCount(this.shortage);
			this.getView().byId("outOfStock").setCount(this.outOfStock);
		},
		onSearch : function (oEvt) {

			// add filter for search
			var aFilters = [];
			var sQuery = oEvt.getSource().getValue();
			if (sQuery && sQuery.length > 0) {
				var filter = new Filter("name", sap.ui.model.FilterOperator.Contains, sQuery);
				aFilters.push(filter);
				
			}

			// update list binding
			var list = this.byId("table");
			var binding = list.getBinding("items");
			binding.filter(aFilters, "Application");
		},
		onSelectFilter: function(oEvent){
			var oBinding = this.getView().byId("table").getBinding("items"),
				sKey = oEvent.getParameter("key"),
				// Array to combine filters
				aFilters = [],
				oCombinedFilterG;
				

			if (sKey === "inStock") {
				this.getView().byId("tableHeader").setText("Products ("+this.inStock+")");
				oCombinedFilterG = new Filter([new Filter("unitsInStock", "GT", 10)], true);
				aFilters.push(new Filter([oCombinedFilterG], false));
			} else if (sKey === "shortage") {
				this.getView().byId("tableHeader").setText("Products ("+this.shortage+")");
				oCombinedFilterG = new Filter([new Filter("unitsInStock", "BT", 1, 10)], true);
				aFilters.push(new Filter([oCombinedFilterG], false));
			} else if (sKey === "outOfStock") {
				this.getView().byId("tableHeader").setText("Products ("+this.outOfStock+")");
				oCombinedFilterG = new Filter([new Filter("unitsInStock", "EQ", 0)], true);
				aFilters.push(new Filter([oCombinedFilterG], false));
			}else if (sKey === "All") {
				this.getView().byId("tableHeader").setText("Products ("+this.count+")");
			}
			oBinding.filter(aFilters);
		},
		onListItemPress: function(oEvent){
			var router = this.getOwnerComponent().getRouter();
			router.navTo("Detail",{
				productPath: window.encodeURIComponent(oEvent.getSource().getBindingContext("product").getPath().substr(1))
			});
		}
	});
});