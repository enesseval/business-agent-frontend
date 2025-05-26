import React from "react";

const data = [
   {
      title: "Monthly Sales Trend",
      chart_type: "Line Chart",
      x_axis: "PurchaseDate (aggregated by Month)",
      y_axis: "PurchaseAmount (summed)",
      optional: {},
   },
   {
      title: "Total Sales by Product Category",
      chart_type: "Bar Chart",
      x_axis: "ProductCategory",
      y_axis: "PurchaseAmount (summed)",
      optional: {},
   },
   {
      title: "Distribution of Order Shipping Status",
      chart_type: "Bar Chart",
      x_axis: "ShippingStatus",
      y_axis: "Count of Orders",
      optional: {},
   },
];

function Chart() {
   return <div>Chart</div>;
}

export default Chart;
