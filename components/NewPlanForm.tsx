import React, { FormEvent, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Category from "@/types/Category";
import Plan from "@/types/Plan";

interface NewPlanFormProps {
  categories: Category[];
  onAddPlan: (newPlan: Plan) => void;
}

const NewPlanForm: React.FC<NewPlanFormProps> = ({ categories, onAddPlan }) => {
  const [plan, setPlan] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  console.log("categories :>> ", categories);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!plan || !selectedCategory) {
      toast.error("Completa los campos");
      return;
    }

    const category: Category = JSON.parse(selectedCategory);

    const object = {
      plan: plan,
      category: category.id,
      color: category.color,
    };

    try {
      const response = await axios.post<{ newPlan: Plan }>(
        "/api/plans",
        object
      );

      toast.success("Plan agregado a la lista!");

      onAddPlan(response.data.newPlan);

      setSelectedCategory("");
      setPlan("");
    } catch (error) {
      console.error("Error adding plan:", error);
      toast.error("Error al agregar el plan");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="my-4 flex flex-col overflow-hidden gap-2 items-start"
    >
      <div className="flex flex-row w-full gap-2">
        <input
          type="text"
          value={plan}
          onChange={(e) => setPlan(e.target.value)}
          placeholder="Nombre del plan"
          className="p-2 border w-full border-gray-300 rounded"
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">Selecciona una categoría</option>
          {categories.map((category) => (
            <option key={category.id} value={JSON.stringify(category)}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="bg-blue-500 w-full text-white p-2 rounded"
      >
        Agregar Plan
      </button>
    </form>
  );
};

export default NewPlanForm;
