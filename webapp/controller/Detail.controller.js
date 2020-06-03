sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/UIComponent",
	"../model/formatter",
	"sap/ui/core/format/DateFormat",
   "sap/ui/model/Filter",
   "sap/ui/model/FilterOperator",
   	"sap/m/MessageToast"
], function (Controller,UIComponent,formatter,DateFormat,Filter,FilterOperator,MessageToast) {
	"use strict";

	return Controller.extend("manageproducts.ManageProducts2.controller.Detail", {
		formatter:formatter,
		onInit: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("Detail").attachPatternMatched(this._onObjectMatched, this);
			
		},
		_onObjectMatched: function (oEvent) {
			this.getView().bindElement({
				path: "/" + window.decodeURIComponent(oEvent.getParameter("arguments").productPath),
				model: "product"
			});
			var str=window.decodeURIComponent(oEvent.getParameter("arguments").productPath);
			var matches = str.match(/(\d+)/);
			this.index=parseInt(matches[1]);
		var data=this.getView().getModel("product").getData();
			var oList = this.byId("idCommentsList");
         var oBinding = oList.getBinding("items");
         oBinding.filter(new Filter("productID", FilterOperator.EQ, data.products[this.index].id));
		},
		onPost: function (oEvent) {
         var oFormat = DateFormat.getDateTimeInstance({style: "medium"});
         var sDate = oFormat.format(new Date());
         var oObject = this.getView().getBindingContext("product").getObject();
         var sValue = oEvent.getParameter("value");
         var oEntry = {
             productID: oObject.id,
             type: "Comment",
             date: sDate,
             comment: sValue
         };    
         // update model
         var oFeedbackModel = this.getView().getModel("productFeedback");
         var aEntries = oFeedbackModel.getData().productComments;
         aEntries.push(oEntry);
         oFeedbackModel.setData({
            productComments : aEntries
         });
      },
      onNavBack: function () {
			var router = this.getOwnerComponent().getRouter();
			router.navTo("RouteApp",[],true);
		}

	});

});