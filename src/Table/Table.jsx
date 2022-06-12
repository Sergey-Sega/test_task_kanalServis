/* eslint-disable no-unused-vars */
/* eslint-disable default-case */
import React, { useEffect, useMemo, useState } from "react";
import { MyInput } from "../components/MyInput/MyInput";
import { MySelect } from "../components/MySelect/MySelect";
import { fetchData } from "../service/getData";
import { TableList } from "../TableList/TableList";
import "./style.scss";

export const Table = () => {
  const [pointsData, setPointsData] = useState("");
  const [selectedSort, setSelectedSort] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDelete, setDelete] = useState(false);
  const [filterNames, setFilterNames] = useState("");

  useEffect(() => {
    getTable();
  }, []);

  const sortedTable = useMemo(() => {
    if (selectedSort) {
      return [...pointsData].sort((a, b) =>
        a[selectedSort].localeCompare(b[selectedSort])
      );
    }
    return pointsData;
  }, [selectedSort, pointsData]);
  console.log(sortedTable);

  const sortedAndSearchedTable = useMemo(() => {
    if (sortedTable) {
      return sortedTable.filter((element) =>
        element.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return pointsData;
  }, [searchQuery, sortedTable, pointsData]);

  const getTable = () => {
    fetchData("table")
      .then((res) => {
        setPointsData(
          res.map(
            (el) =>
              (el = {
                distance: el.distance,
                name: el.name,
                id: el.id,
                quantity: el.quantity,
                date: el.date,
              })
          )
        );
        setFilterNames(
          res.filter((obj) => !res[obj.name] && (res[obj.name] = true))
        );
      })
      .catch((err) => console.error("ERROR", err));
  };

  const sortTable = (sort) => {
    setSelectedSort(sort);
  };

  const columns = [
    { name: "Количество участников", dataName: "quantity" },
    { name: "Дистанция", dataName: "distance" },
    { name: "Название соревнования", dataName: "name" },
    { name: "Дата соревнования", dataName: "date" },
  ];
  const shouldShowNoResult = !Object.values(pointsData ?? {}).length;
  return (
    <>
      <h1 className="admin__heading">Список соревнований</h1>
      <div className="table-page">
        <div className="table-page__sort">
          <div>
           <MyInput
                legend="Фильтрация"
                onChange={(e) => setSearchQuery(e.target.value)}
                value={searchQuery}
                placeholder="Поиск Соревнования"
              />
              <select 
          className="table-select" 
          name="cityId"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          >
            <option value="">Все дистанции</option>
            {filterNames
              ? filterNames.map((el) => (
                  <option key={el.id} value={el.name}>
                    {el.name}
                  </option>
                ))
              : null}
          </select>
          </div>
          <MySelect
            legend="Сортировка"
            className="table-select"
            defaultValue="Выберите значение"
            options={[
              { value: "name", name: "По названию" },
              { value: "quantity", name: "По количеству" },
              { value: "distance", name: "По дистанции" },
            ]}
            onChange={sortTable}
          />
        </div>
        {!shouldShowNoResult ? (
          <TableList
            columns={columns}
            data={sortedAndSearchedTable}
            tableName="table/"
            setDelete={setDelete}
            update={getTable}
          />
        ) : null}
      </div>
    </>
  );
};
