import React, { useEffect } from "react";

import Navbar from "../../Components/common/Navbar";
import Footer from "../../Components/common/Footer";
import Hero from "./Hero1";
import GoalCategory from "./GoalCategory";
import Category from "./Category";
import Deals from "./Deals";
import { About } from "./About";
import Partners from "./Partners";
import Cta from "./Cta";

import fetchProdsByCategory from "./fetchProdsByCategory";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
    const { id } = useParams();
    const results = useQuery(["prodsByCategories", id], fetchProdsByCategory);

    if (results.isLoading) {
        return (
          <div className="loading-pane m-auto">
            <h2 className="loader">🌀</h2>
          </div>
        );
      }
    const topSellers = results.data["top-sellers"];
    const whey_protien = results.data["whey-protien"];
    const creatine = results.data["creatine"];
     console.log(results.data);


    return (
        <>
            <Navbar />
            <main>
                <Hero />
                <GoalCategory />
                <Category title="TOP SELLERS" category="top-sellers" products={topSellers} />
                <Deals />
                <Category title="WHEY PROTIEN" category="whey-protien" products={whey_protien} />
                <Category title="CREATINE" category="creatine" products={creatine} />
                <About />
                <Partners />
                <Cta />
            </main>
            <Footer />
        </>
    )
} 