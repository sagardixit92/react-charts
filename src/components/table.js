import React, { useEffect, useReducer } from "react";
import getEndpoint from "../utils/endpoints";

const reducer = (state, action) => {
  switch (action.type) {
    case "filter_by_value":
      return {
        ...state,
        dataSet: {
          ...state.dataSet,
          data: state.dataSet.data.sort((a, b) => a.value - b.value),
        },
      };
    case "filter_by_label":
      return {
        ...state,
        dataSet: {
          ...state.dataSet,
          data: state.dataSet.data.sort(
            (a, b) =>
              b.label <
              a.label
          ),
        },
      };
    case "set_data":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default function HighlightTable({ type }) {
    
  const [state, dispatch] = useReducer(reducer, {});
  useEffect(() => {
    const fetchResults = () => {
      fetch(`http://13.232.99.42/${getEndpoint(type)}`)
        .then((res) => {
          return res.text();
        })
        .then((data) => {
          dispatch({
            type: "set_data",
            payload: JSON.parse(data)?.data,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchResults();
  }, [type]);

  const handleOnChange = (e) => {
    if (e.target.value === "value") {
      dispatch({
        type: "filter_by_value",
        payload: state?.dataSet?.data,
      });
    }
    if (e.target.value === "label") {
      dispatch({
        type: "filter_by_label",
        payload: state?.dataSet?.data,
      });
    }
  };
  
  const { dataSet, filter, stats } = state;
  return (
    <div>
      <div className="section-header flex">
      <h1 style={{textTransform:'capitalize'}}>&nbsp;&nbsp;{type}</h1>
        <div>
          <select
            onChange={handleOnChange}
            name="sort-option"
            className="sort-option form-select"
          >
            <option value="label" defaultValue="">
              Sort by Label
            </option>
            <option value="value">Sort by Value</option>
          </select>
          &nbsp;&nbsp;
        </div>
      </div>
      <div className="flex inject-wrapper">
        <div className="stats-info">
          <h3>Stats:</h3>
          {stats &&
            Object.keys(stats).map((item, index) => (
              <div key={stats[item]?.value}>
                <div>
                  <span>{stats[item]?.label}</span>
                  <span>{stats[item]?.value}</span>
                </div>
                <div
                  className={`progress-bar animated-${index}`}
                  value={40}
                  index={index}
                ></div>
              </div>
            ))}
        </div>
        <div className="stats-table">
          <div className="chart-label flex">
            <div>{filter?.label}</div>
            <div>{`${filter?.value}%`}</div>
          </div>
          <table>
            <thead>
              <tr>
                {dataSet?.header.map((item) => (
                  <th>{item}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dataSet?.data.map((item) => {
                return (
                  <tr
                    key={`${item?.value}-${item?.label}`}
                    style={{ color: item?.color }}
                  >
                    <td>{item?.label}</td>
                    <td>{item?.value}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
