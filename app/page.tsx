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
  const apiUrl = process.env.API_URL;

  if (!apiUrl) {
    console.error("API_URL is not defined");
    return [];
  }

  console.log("apiUrl PLANS:>> ", apiUrl);

  try {
    const response = await axios.get(
      `https://pals-plan-fhxwywlot-tadeogavensky1s-projects.vercel.app/api/plans`,
      {
        headers: {
          Authorization:
            "Bearer " +
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBnenBlY29ybmlhbHNucmh0Y3h0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU5NzU5OTgsImV4cCI6MjAzMTU1MTk5OH0.ZAxHkMB81oq5SLNchFKT-Rl26j_ca60YMjHYIJHnpx4",
        },
      }
    );
    console.log("response.data :>> ", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching plans", error);
    return [];
  }
};

const getCategories = async () => {
  const apiUrl = process.env.API_URL;

  if (!apiUrl) {
    console.error("API_URL is not defined");
    return [];
  }

  console.log("apiUrl CATEGORIES :>> ", apiUrl);

  try {
    const response = await axios.get(
      `https://pals-plan-fhxwywlot-tadeogavensky1s-projects.vercel.app/api/categories`,
      {
        headers: {
          Authorization:
            "Bearer " +
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBnenBlY29ybmlhbHNucmh0Y3h0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU5NzU5OTgsImV4cCI6MjAzMTU1MTk5OH0.ZAxHkMB81oq5SLNchFKT-Rl26j_ca60YMjHYIJHnpx4",
        },
      }
    );
    console.log("response.data :>> ", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories", error);
    return [];
  }
};

export default Home;
