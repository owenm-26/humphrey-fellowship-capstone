import React from "react";
import { Table } from "antd";


const CustomTable = ({ columns, data }) => {
  return (
    <Table
    size="small"
      columns={columns}
      // eslint-disable-next-line react/prop-types
      dataSource={data?.map((expense, index) => ({
        ...expense,
        key: index, // Assigning index as key, make sure each item has a unique key
      }))}
      pagination={false}
      scroll={{
        y: 400,
      }}
      style={{ height: '400px' }}

    />
  );
};
export default CustomTable;
