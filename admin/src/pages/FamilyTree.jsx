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
    const [data, setData] = useState([]);
    const [rabbitGen, setRabbitGen] = useState({});
    const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle);
    };

    const handleInputSelect = (value) => {
        const rabbit = JSON.parse(value);
        var orgChart = {
            name: rabbit.id,
            attributes: { name: rabbit.name },
            children: ancestors(geneology, rabbit.id),
        };
        setRabbitGen(orgChart);

    };

    useEffect(() => {
        //old implementation
        // async function fetchMyAPI() {

        //     let rabbits = await axios
        //         .get(BASE_URL + "/family-rabbits")
        //         .then((res) => res.data);

        //     setData(rabbits); // Option component
        //     let breedingPairs = await axios
        //         .get(BASE_URL + "/family-breeding")
        //         .then((res) => res.data);

        //     let mapBP = await new Map();
        //     let mapRabbit = await new Map();
        //     let mapGenealogy = await new Map();

        //     for (let i = 0; i < rabbits.length; i++) {
        //         mapRabbit.set(rabbits[i].id, rabbits[i]);
        //     }
        //     for (let i = 0; i < breedingPairs.length; i++) {
        //         mapBP.set(breedingPairs[i].id, breedingPairs[i]);
        //     }

        //     for await (var key of mapRabbit.keys()) {
        //         if (mapRabbit.get(key).breeding_pair_id !== null) {

        //             const gkey = mapRabbit.get(
        //                 mapBP.get(mapRabbit.get(key).breeding_pair_id).buck_id
        //             ).id;
        //             if (mapGenealogy.has(gkey)) {
        //                 let v = mapGenealogy.get(gkey);
        //                 v.push(mapRabbit.get(key));
        //                 mapGenealogy.set(gkey, v);
        //             } else {
        //                 mapGenealogy.set(gkey, [mapRabbit.get(key)]);
        //             }

        //             const doeKey = mapRabbit.get(
        //                 mapBP.get(mapRabbit.get(key).breeding_pair_id).doe_id
        //             ).id;
        //             if (mapGenealogy.has(doeKey)) {
        //                 let v = mapGenealogy.get(doeKey);
        //                 v.push(mapRabbit.get(key));
        //                 mapGenealogy.set(doeKey, v);
        //             } else {
        //                 mapGenealogy.set(doeKey, [mapRabbit.get(key)]);
        //             }

        //         } else {
        //             mapGenealogy.set(key, []);
        //         }
        //     }
        //     // setCurrentRabbit(mapRabbit.get("rabbit101874"));
        //     console.log(mapGenealogy);
        //     setGeneology(mapGenealogy);
        // }

        //new implementation of tree
        async function fetchData() {
            let rabbits = await axios
                .get(BASE_URL + "/family-rabbits")
                .then((res) => res.data);

            setData(rabbits); // Option component
            let breedingPairs = await axios
                .get(BASE_URL + "/family-breeding")
                .then((res) => res.data);

            let mapBP = await new Map();
            let mapRabbit = await new Map();
            let mapRabbitByBreedingPair = await new Map();
            let mapGenealogy = await new Map();

            for (let i = 0; i < rabbits.length; i++) {
                const id = rabbits[i].id;
                const breedingPairId = rabbits[i].breeding_pair_id;
                mapRabbit.set(id, rabbits[i]);

                if (mapRabbitByBreedingPair.has(breedingPairId)) {
                    const v = mapRabbitByBreedingPair.get(breedingPairId);
                    v.push(rabbits[i]);
                    mapRabbitByBreedingPair.set(breedingPairId, v);
                } else {
                    mapRabbitByBreedingPair.set(breedingPairId, [rabbits[i]]);
                }
            }

            for (let i = 0; i < breedingPairs.length; i++) {
                const id = breedingPairs[i].id;
                const buckId = breedingPairs[i].buck_id;
                const doeId = breedingPairs[i].doe_id;

                mapBP.set(id, breedingPairs[i]);

                if (mapGenealogy.has(buckId)) {
                    const v = mapGenealogy.get(buckId);
                    mapGenealogy.set(buckId, [...v, ...mapRabbitByBreedingPair.get(id)]);
                } else {
                    mapGenealogy.set(buckId, mapRabbitByBreedingPair.get(id));
                }

                if (mapGenealogy.has(doeId)) {
                    const v = mapGenealogy.get(doeId);
                    mapGenealogy.set(doeId, [...v, ...mapRabbitByBreedingPair.get(id)]);
                } else {
                    mapGenealogy.set(doeId, mapRabbitByBreedingPair.get(id));
                }
            }
            setGeneology(mapGenealogy);
            setDefaultTree(rabbits, mapGenealogy);

        }
        // fetchMyAPI();
        fetchData();
    }, []);

    function setDefaultTree(rabbits, mapGenealogy) {
        var orgChart = {
            name: rabbits[0].id,
            attributes: { name: rabbits[0].name },
            children: ancestors(mapGenealogy, rabbits[0].id),
        };
        setRabbitGen(orgChart);
    }

    //   const handleSearch = (event) => {
    //     const value = event.target.value.toLowerCase();
    //     const filteredClients = clients.filter((client) =>
    //       client.name.toLowerCase().includes(value)
    //     );
    //     setSearchedClients(filteredClients);
    //   };

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
                    <Select onChange={(value) => handleInputSelect(value)} style={{ width: "25%" }} placeholder="Rabbits">
                        {data.map((data, i) => (
                            <Select.Option value={JSON.stringify(data)} key={i}>
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
                    <Tree data={rabbitGen} translate={{ x: 20, y: 300 }} />
                </div>
            </div>
        </div>
    );
}

export default FamilTree;
