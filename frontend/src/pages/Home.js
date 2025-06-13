import React from "react"
import Banner from "../components/Banner/Banner"
import BestPropertyList from "../components/BestProperty/BestPropertyList"
import RecentPropertyList from "../components/RecentProperty/RecentPropertyList"

const Home = () => {
    return (
        <React.Fragment>
            <Banner />
            <RecentPropertyList title="Recent Properties" description="Find some of the recently added properties" />
            <BestPropertyList title="Best Price Properties" description="Find properties with lower price" />
        </React.Fragment>
    )
}

export default Home;