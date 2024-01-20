import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Input, Pagination, Space, Avatar, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import appConfig from "../../config.json";
import Tree from "react-d3-tree";
const BASE_URL = appConfig.apiBasePath;
const IMAGE_URL = appConfig.imagePath;

function FamilTree() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [geneology, setGeneology] = useState(new Map());
  const [currentRabbit, setCurrentRabbit] = useState({});
  const [data, setData] = useState([]);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  useEffect(() => {
    axios
      .get(BASE_URL + "/family-rabbits")
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    async function fetchMyAPI() {
      let breedingPairs = await axios
        .get(BASE_URL + "/family-breeding")
        .then((res) => res.data);

      let mapBP = await new Map();
      let mapRabbit = await new Map();
      let mapGenealogy = await new Map();

      for (let i = 0; i < rabbits.length; i++) {
        mapRabbit.set(rabbits[i].id, rabbits[i]);
      }
      for (let i = 0; i < breedingPairs.length; i++) {
        mapBP.set(breedingPairs[i].id, breedingPairs[i]);
      }

      for await (var key of mapRabbit.keys()) {
        if (mapRabbit.get(key).breeding_pair_id !== null) {
          const gkey = mapRabbit.get(
            mapBP.get(mapRabbit.get(key).breeding_pair_id).buck_id
          ).id;
          if (mapGenealogy.has(gkey)) {
            let v = mapGenealogy.get(gkey);
            v.push(mapRabbit.get(key));
            mapGenealogy.set(gkey, v);
          } else {
            mapGenealogy.set(gkey, [mapRabbit.get(key)]);
          }
        } else {
          mapGenealogy.set(key, []);
        }
      }

      setCurrentRabbit(mapRabbit.get("rabbit101874"));
      setGeneology(mapGenealogy);
    }
    fetchMyAPI();
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    const filteredClients = clients.filter((client) =>
      client.name.toLowerCase().includes(value)
    );
    setSearchedClients(filteredClients);
  };

  // let genealog = new Map();
  // genealog.set("maximo", ["joseph"]);
  // genealog.set("joseph", ["jeff", "john", "cynthia"]);
  // genealog.set("jeff", ["totoy", "yuna"]);

  // var p = "maximo";

  // function ancestors(g, p) {
  //     if (g.has(p)) {
  //         let parents = g.get(p);
  //         let result = [];

  //         parents.forEach((parent) => {
  //             const p = {
  //                 set name(nn) {
  //                     this.name = nn;
  //                 },
  //                 set children(c) {
  //                     this.children.push(c);
  //                 },
  //                 name: parent,
  //                 children: [],
  //             };

  //             p.name = parent;
  //             p.children = ancestors(g, parent);

  //             result = result.concat(p);
  //         });
  //         return result;
  //     }

  //     return [];
  // }
  // var orgChart = {
  //     name: p,
  //     attributes: {
  //         department: 'Fabrication',
  //     },
  //     children: ancestors(genealog, p)
  // }

  function ancestors(g, p) {
    if (g.has(p)) {
      let parents = g.get(p);
      let result = [];

      parents.forEach((parent) => {
        const p = {
          set name(nn) {
            this.name = nn;
          },
          set children(c) {
            this.children.push(c);
          },
          set attributes(att) {
            this.attributes = att;
          },
          name: parent.id,
          attributes: {},
          children: [],
        };

        p.name = parent.id;
        p.attributes = { name: parent.name };
        p.children = ancestors(g, parent.id);
        result = result.concat(p);
      });
      return result;
    }

    return [];
  }

  var orgChart = {
    name: currentRabbit.id,
    attributes: { name: currentRabbit.name },
    children: ancestors(geneology, currentRabbit.id),
  };

  console.log(orgChart);

  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <div className="main-container bg-light">
        <div className="d-flex justify-content-between">
          <h3>Genealogy</h3>
          <Select style={{ width: "25%" }} placeholder="Gender">
            {data &&
              data.map((data, i) => (
                <Select.Option value={data.id} key={i}>
                  {data.name}
                </Select.Option>
              ))}
          </Select>
        </div>

        <div
          id="treeWrapper"
          style={{ width: "50em", height: "20em" }}
          className="d-flex justify-content-between h-100 w-100"
        >
          <Tree data={orgChart} />
        </div>
      </div>
    </div>
  );
}

export default FamilTree;
