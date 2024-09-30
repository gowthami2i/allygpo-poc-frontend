import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
export const CustomTable = () => {
  const data = [
    {
      id: "1000",
      code: "f230fh0g3",
      name: "Bamboo Watch",
      description: "Product Description",
      image: "bamboo-watch.jpg",
      price: 65,
      category: "Accessories",
      quantity: 24,
      inventoryStatus: "INSTOCK",
      rating: 5,
    },
  ];
  const [tabelData, setTableData] = useState();
  return (
    <div className="card">
      <DataTable value={data} paginator>
        <Column field="code" header="Code" style={{ minWidth: "20%" }}></Column>
        <Column field="name" header="Name" style={{ minWidth: "20%" }}></Column>
        <Column
          field="category"
          header="Category"
          style={{ minWidth: "20%" }}
        ></Column>
        <Column
          field="quantity"
          header="Quantity"
          style={{ minWidth: "20%" }}
        ></Column>
      </DataTable>
    </div>
  );
};
