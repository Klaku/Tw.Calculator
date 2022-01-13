import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { ConfigObject, InitialConfig } from "./Recruitment.types";
import { Timers, Names } from "./buildings.data";
import moment, { Moment } from "moment";
import { Input } from "../../atoms/Input/Input";
function TypeOfBuilding(unitName: string) {
  switch (unitName) {
    case "spear":
    case "sword":
    case "axe":
      return "baracks";
    case "spy":
    case "light":
    case "heavy":
      return "stable";
    case "ram":
    case "catapult":
      return "garage";
    default:
      return "baracks";
  }
}
export default function Recruitment() {
  let [world, setWorld] = useState(174);
  let [config, setConfig] = useState(InitialConfig);
  let [isLoading, setIsLoading] = useState(false);
  let [levels, setLevel] = useState({
    baracks: 1,
    stable: 1,
    garage: 1,
  });
  return (
    <Wraper>
      <Row>
        <Col>
          <span>Select World</span>
          <Input
            type="number"
            value={world}
            onChange={(event) => {
              setWorld(Number(event.target.value));
            }}
          />
        </Col>
        <Col>
          {!isLoading && (
            <button
              onClick={() => {
                setIsLoading(true);
                fetch(`${process.env.REACT_APP_API}/api/get_unit_info/${world}`)
                  .then((response) => {
                    return response.json();
                  })
                  .then((data: ConfigObject) => {
                    setConfig(data);
                    setIsLoading(false);
                  });
              }}
            >
              GetConfiguration
            </button>
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          <span>Baracks level</span>
          <input
            type="number"
            value={levels.baracks}
            min={1}
            max={25}
            onChange={(event) => {
              setLevel({
                ...levels,
                baracks: Number(event.target.value),
              });
            }}
          />
        </Col>
        <Col>
          <span>Stable level</span>
          <input
            type="number"
            value={levels.stable}
            min={1}
            max={20}
            onChange={(event) => {
              setLevel({
                ...levels,
                stable: Number(event.target.value),
              });
            }}
          />
        </Col>
        <Col>
          <span>Garage level</span>
          <input
            type="number"
            value={levels.garage}
            min={1}
            max={15}
            onChange={(event) => {
              setLevel({
                ...levels,
                garage: Number(event.target.value),
              });
            }}
          />
        </Col>
      </Row>
      {config.config.axe.length > 0 && (
        <Table>
          <tbody>
            <TableRow>
              <TableData></TableData>
              {Names.map((name) => {
                return (
                  <TableData key={name}>
                    <img
                      src={`https://dspl.innogamescdn.com/asset/9b87e56e/graphic/unit/recruit/${name}.png`}
                    ></img>
                  </TableData>
                );
              })}
            </TableRow>
            <TableRow>
              <TableData>Single unit recruitment time</TableData>
              {Names.map((name) => {
                return (
                  <TableData key={name}>
                    {moment(
                      Math.floor(
                        Number(config.config[name][0].build_time[0]) *
                          Timers[levels[TypeOfBuilding(name)] - 1] *
                          10
                      )
                    ).format("mm:ss")}
                  </TableData>
                );
              })}
            </TableRow>
            <TableRow>
              <TableData>One hour posible units</TableData>
              {Names.map((name) => {
                return (
                  <TableData key={name}>
                    {Math.floor(
                      (60 * 60 * 1000) /
                        Math.floor(
                          Number(config.config[name][0].build_time[0]) *
                            Timers[levels[TypeOfBuilding(name)] - 1]
                        )
                    ) / 10}
                  </TableData>
                );
              })}
            </TableRow>
            <TableRow>
              <TableData>24h posible units</TableData>
              {Names.map((name) => {
                return (
                  <TableData key={name}>
                    {Math.floor(
                      (24 * 60 * 60 * 1000) /
                        Math.floor(
                          Number(config.config[name][0].build_time[0]) *
                            Timers[levels[TypeOfBuilding(name)] - 1]
                        )
                    ) / 10}
                  </TableData>
                );
              })}
            </TableRow>
            <TableRow>
              <TableData>7d posible units</TableData>
              {Names.map((name) => {
                return (
                  <TableData key={name}>
                    {Math.floor(
                      (7 * 24 * 60 * 60 * 1000) /
                        Math.floor(
                          Number(config.config[name][0].build_time[0]) *
                            Timers[levels[TypeOfBuilding(name)] - 1]
                        )
                    ) / 10}
                  </TableData>
                );
              })}
            </TableRow>
            <TableRow>
              <TableData>Include in calculations</TableData>
              {Names.map((name) => {
                return (
                  <TableData key={name}>
                    <input type="checkbox"></input>
                  </TableData>
                );
              })}
            </TableRow>
          </tbody>
        </Table>
      )}
    </Wraper>
  );
}

export const Wraper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 15px;
`;
export const Col = styled.div`
  display: flex;
  flex-direction: column;
`;
export const Table = styled.table`
  border-collapse: collapse;
`;
export const TableRow = styled.tr``;
export const TableData = styled.td`
  padding: 10px 5px;
  border-bottom: 1px solid ${(props) => props.theme.dark[1]};
  text-align: center;
  &:first-child {
    text-align: left;
  }
`;
