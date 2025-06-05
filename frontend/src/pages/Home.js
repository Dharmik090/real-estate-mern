import PopularFlatList from "../components/RecentFlat/RecentFlatList"
import Banner from "../components/Banner/Banner"
import React from "react"
import TeamList from "../components/TeamList"
import References from "../components/References"
import Subscribe from "../components/Subscribe"
import BestFlatList from "../components/BestFlat/BestFlatList"
import Register from "../components/Register"

const Home = () => {
    return (
        <React.Fragment>
            <Banner />
            <PopularFlatList title="Popular Properties" description="Find some of the most popular properties" />
            <BestFlatList title="Best Price Properties" description="Find properties with lower price" />
        </React.Fragment>
    )
}

export default Home;