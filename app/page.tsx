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
  let apiUrl;

  if (process.env.NODE_ENV === "development") {
    apiUrl = process.env.API_URL_DEVELOPMENT_LOCAL;
  } else {
    apiUrl = process.env.API_URL;
  }

  console.log("apiUrl PLANS:>> ", apiUrl);

  try {
    const apiUrl = "https://pals-plan.vercel.app"; // Asegúrate de que apiUrl esté definido

    const response = await fetch(`${apiUrl}/api/plans`);

    if (!response.ok) {
      // Maneja el error si la respuesta no es exitosa
      console.error("Error al obtener las categorías:", response.statusText);
      return;
    }

    const data = await response.json(); // Lee el cuerpo de la respuesta como JSON
    console.log("response.data :>> ", data);

    return data;
  } catch (error) {
    console.error(`Error fetching plans`, error);
  }
};

const getCategories = async () => {
  let apiUrl;
  if (process.env.NODE_ENV === "development") {
    apiUrl = process.env.API_URL_DEVELOPMENT_LOCAL;
  } else {
    apiUrl = process.env.API_URL;
  }

  console.log("apiUrl CATEGORIES :>> ", apiUrl);

  try {
    const apiUrl = "https://pals-plan.vercel.app"; // Asegúrate de que apiUrl esté definido

    const response = await fetch(`${apiUrl}/api/categories`);

    if (!response.ok) {
      // Maneja el error si la respuesta no es exitosa
      console.error("Error al obtener las categorías:", response.statusText);
      return;
    }

    const data = await response.json(); // Lee el cuerpo de la respuesta como JSON
    console.log("response.data :>> ", data);

    return data;
  } catch (error) {
    console.error(`Error fetching categories`, error);
  }
};

export default Home;
