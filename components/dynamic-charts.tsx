import { useAnalysis } from "@/context/AnalysisContext";
import React from "react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

type Chart = {
   title: string;
   chart_type: "Bar Chart" | "Line Chart" | "Pie Chart";
   x_axis: {
      original_col_name: string;
      replaced_col_name: string;
   };
   y_axis: {
      original_col_name: string;
      replaced_col_name: string;
   };
   grouping?: string;
};

function DynamicCharts({ chartConfig }: { chartConfig: Chart }) {
   const { cleanedData } = useAnalysis();

   console.log(chartConfig);
   console.log(cleanedData);

   const { title, chart_type, x_axis, y_axis } = chartConfig;

   const chartData = cleanedData
      ?.map((row) => ({
         [x_axis.replaced_col_name]: row[x_axis.original_col_name],
         [y_axis.replaced_col_name]: row[y_axis.original_col_name],
      }))
      ?.sort((a, b) => {
         const dateA = new Date(a[x_axis.replaced_col_name]);
         const dateB = new Date(b[x_axis.replaced_col_name]);
         return dateA.getTime() - dateB.getTime(); // küçükten büyüğe sıralama
      });

   const lineChartConfig: ChartConfig = {
      [y_axis.replaced_col_name]: { label: y_axis.replaced_col_name, color: "yellow" },
   };

   if (chart_type === "Line Chart") {
      return (
         // <Card>
         //    <CardHeader>
         //       <CardTitle>{title}</CardTitle>
         //    </CardHeader>
         //    <CardContent>
         //       <ChartContainer config={lineChartConfig} className="min-h-40">
         //          <LineChart data={chartData} margin={{ left: 12, right: 12 }}>
         //             <CartesianGrid vertical={false} />
         //             <XAxis
         //                dataKey={x_axis.replaced_col_name}
         //                tickLine={false}
         //                axisLine={false}
         //                tickMargin={8}
         //                tickFormatter={(value) =>
         //                   new Date(value).toLocaleDateString("tr-TR", {
         //                      month: "short",
         //                      day: "numeric",
         //                   })
         //                }
         //                interval="preserveStartEnd"
         //             />

         //             <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
         //             <Line dataKey={y_axis.replaced_col_name} type="monotoneX" stroke="blue" strokeWidth={2} dot={false} />
         //          </LineChart>
         //       </ChartContainer>
         //    </CardContent>
         // </Card>
         <Card>
            <CardHeader>
               <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
               <ChartContainer config={lineChartConfig} className="min-h-40">
                  <ResponsiveContainer width="100%" height={300}>
                     <AreaChart data={chartData} margin={{ top: 20, right: 20, left: 12, bottom: 0 }}>
                        <defs>
                           <linearGradient id="colorMain" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                           </linearGradient>
                        </defs>

                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis
                           dataKey={x_axis.replaced_col_name}
                           tickLine={false}
                           axisLine={false}
                           tickMargin={8}
                           tickFormatter={(value) =>
                              new Date(value).toLocaleDateString("tr-TR", {
                                 month: "short",
                                 day: "numeric",
                              })
                           }
                           interval="preserveStartEnd"
                        />
                        <YAxis tickLine={false} axisLine={false} />

                        <Tooltip content={<ChartTooltipContent hideLabel />} cursor={{ stroke: "#3b82f6", strokeWidth: 1, opacity: 0.2 }} />

                        <Area type="monotone" dataKey={y_axis.replaced_col_name} stroke="none" fillOpacity={1} fill="url(#colorMain)" />
                     </AreaChart>
                  </ResponsiveContainer>
               </ChartContainer>
            </CardContent>
         </Card>
      );
   }

   if (chart_type === "Bar Chart") {
      return (
         <div>
            <h3>{title}</h3>
            <BarChart data={chartData}>
               <CartesianGrid strokeDasharray="3 3" />
               <XAxis dataKey={x_axis.replaced_col_name} />
               <YAxis />
               <Tooltip />
               <Legend />
               <Bar dataKey={y_axis.replaced_col_name} fill="#82ca9d" />
            </BarChart>
         </div>
      );
   }

   if (chart_type === "Pie Chart") {
      return (
         <div>
            <h3>{title}</h3>
            <PieChart>
               <Pie data={chartData} dataKey={y_axis.replaced_col_name} nameKey={x_axis.replaced_col_name} cx="50%" cy="50%" outerRadius={120} fill="#8884d8" label>
                  {chartData?.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
               </Pie>
               <Tooltip />
            </PieChart>
         </div>
      );
   }

   return <p>Unsupported chart chart_type: {chart_type}</p>;
}

export default DynamicCharts;
