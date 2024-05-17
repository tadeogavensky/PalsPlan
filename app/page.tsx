// PAGE TSX
"use client";

import Header from "@/components/Header";
import Plans from "@/components/Plans";
import axios from "axios";

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
  const apiUrl = process.env.API_URL;  // Correct usage of process.env

  console.log("apiUrl PLANS:>> ", apiUrl);

  try {
    const response = await axios.get(`${apiUrl}/api/plans`);
    console.log("response.data :>> ", response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching plans`, error);
  }
};

const getCategories = async () => {
  const apiUrl = process.env.API_URL;  // Correct usage of process.env

  console.log("apiUrl CATEGORIES :>> ", apiUrl);

  try {
    const response = await axios.get(`${apiUrl}/api/categories`);
    console.log("response.data :>> ", response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching categories`, error);
  }
};

export default Home;
