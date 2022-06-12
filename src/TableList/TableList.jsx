import React from 'react';
import { deleteData } from '../service/getData';
import './style.scss';
export const TableList = ({ columns, data, setDelete, tableName, update }) => {

  const deleteRow = (id) => {
    deleteData(`${tableName}${id}`)
      .then(() => {
        if (update) {
          update();
        }
      })
      .then(() => setDelete(true))
      .catch((err) => {
        console.error('ERROR', err);
      });
  };

  return (
    <table className='table-list'>
      <thead className='table-list__row head'>
        <tr>
          {columns.map((el) => (
            <th className='table-list__cell head' key={el.dataName}>
              {el.name}
            </th>
          ))}
          <th className='table-list__cell head'>Удалить</th>
        </tr>
      </thead>
      <tbody>
        {data.map((val) => (
            <tr key={val.id} className='table-list__row'>
              {columns.map((el) => (
                <td key={val[el.dataName]} className='table-list__cell'>
                  {val[el.dataName]}
                </td>
              ))}
              <td
                className='table-list__cell delete'
                onClick={() => deleteRow(val.id)}
              >
                ✖
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};