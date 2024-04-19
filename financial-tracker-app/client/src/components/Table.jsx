import React from "react";
import { Table } from "antd";


const CustomTable = ({ columns, data }) => {
  return (
    <Table
      columns={columns}
      // eslint-disable-next-line react/prop-types
      dataSource={data?.map((expense, index) => ({
        ...expense,
        key: index, // Assigning index as key, make sure each item has a unique key
      }))}
      pagination={false}
      scroll={{
        y: 240,
      }}
    />
  );
};
export default CustomTable;
