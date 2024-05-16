import Plan from "./Plan";

type Category = {
  id: number;
  name: string;
  color: string;
  plans: Plan[];
};

export default Category;
