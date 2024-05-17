// PAGE TSX
"use client";

import Header from "@/components/Header";
import Plans from "@/components/Plans";
import axios from "axios";
import { env } from "process";

const Home = async () => {
  const plans = await getPlans();
  const categories = await getCategories();

  return (
    <main className="flex min-h-screen flex-col items-center bg-white font-roboto m-10">
      <Header />
      <Plans plans={plans} categories={categories} />
    </main>
  );
};

const getPlans = async () => {
  let url = env.API_URL;
  try {
    const response = await axios.get(`${url}/api/plans`);
    console.log("response.data :>> ", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching plans", error);
    return [];
  }
};

const getCategories = async () => {
  let url = env.API_URL;

  try {
    const response = await axios.get(`${url}/api/categories`);
    console.log("response.data :>> ", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories", error);
    return [];
  }
};

export default Home;
