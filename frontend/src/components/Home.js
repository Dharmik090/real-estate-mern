import FlatList from "./Property/FlatList"
import Banner from "./Banner"
import React from "react"
import TeamList from "./TeamList"
import References from "./References"
import Subscribe from "./Subscribe"
import BestFlatList from "./Property/BestFlatList"
import Register from "./Register"

const Home=()=>{
    return (
        <React.Fragment>
            <Banner/>
            <FlatList title="Popular Properties" description="Find some of the most popular properties" />
            <BestFlatList title="Best Price Properties" description="Find properties with lower price" />
        </React.Fragment>
    )
}

export default Home;