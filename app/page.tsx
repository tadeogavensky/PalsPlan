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

  console.log('apiUrl PLANS:>> ', apiUrl);

  try {
    const response = await axios.get(`${apiUrl}api/plans`);
    console.log('response.data :>> ', response.data);
    return response.data;
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

  console.log('apiUrl CATEGORIES :>> ', apiUrl);

  try {
    const response = await axios.get(`${apiUrl}api/categories`);
    console.log('response.data :>> ', response.data);
    return response.data;

  } catch (error) {
    console.error(`Error fetching categories`, error);
  }
};

export default Home;
