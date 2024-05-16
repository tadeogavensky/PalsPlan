"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { HiPencilAlt } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import NewPlanForm from "./NewPlanForm";
import Plan from "@/types/Plan";
import Category from "@/types/Category";

interface PlansProps {
  plans: Plan[];
  categories: Category[];
}

const Plans: React.FC<PlansProps> = ({ plans, categories }) => {
  const [form, isFormVisible] = useState(false);

  const [updatedPlans, setUpdatedPlans] = useState(plans);

  useEffect(() => {
    setUpdatedPlans(plans);
  }, [plans]);

  const deletePlan = async (id: number) => {
    console.log("id :>> ", id);
    try {
      const result = await Swal.fire({
        title: `Eliminar plan`,
        icon: "info",
        text: "Estás seguro/a que querés cancelar este plan?",
        showCancelButton: true,
        confirmButtonColor: "#005DFF",
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Confirmar",
      });

      if (result.isConfirmed) {
        await axios.delete(`/api/plans/${id}`);
        toast.success("Plan cancelado!");

        const updatedList = updatedPlans.filter((plan) => plan.id !== id);
        setUpdatedPlans(updatedList);
      }
    } catch (error) {
      console.error("Error in deletePlan:", error);
    }
  };

  const modifyPlan = async (id: number) => {
    try {
      toast.success("Plan changed");
    } catch (error) {}
  };

  const addNewPlan = (newPlan: Plan) => {
    setUpdatedPlans([...updatedPlans, newPlan]);
  };

  return (
    <div className="p-3 shadow-lg rounded w-full md:w-[450px] flex flex-col">
      <Toaster />
      <div className="flex flex-row items-center flex-wrap md:flex-nowrap justify-between mb-3">
        <p className="font-semibold text-xl">Nuestros planes</p>
        <button
          onClick={() => isFormVisible(!form)} // Correcto: envolver en una función
          className="text-blue-500 font-semibold hover:text-blue-400 transition-all"
        >
          Nuevo plan
        </button>
      </div>

      {form && <NewPlanForm categories={categories} onAddPlan={addNewPlan} />}

      <ul>
        {updatedPlans.map((plan) => (
          <div
            key={plan.id} // Moved key to the outer div
            className="flex flex-row justify-between items-center mb-3"
          >
            <li className="flex flex-row gap-2 items-center">
              <p>{plan.name}</p>
              {/*   <p className={`lowercase text-${plan.category.color}-500`}>
                #{plan.category.name}
              </p> */}
            </li>
            <div className="flex flex-row items-center gap-4">
              <button
                onClick={() => deletePlan(plan.id)}
                className="bg-red-600 text-white p-2 rounded-md font-semibold hover:bg-red-400 duration-100 transition-all"
              >
                <MdDelete />
              </button>
              <button
                onClick={() => modifyPlan(plan.id)} // Pass plan.id to modifyPlan
                className="bg-blue-600 text-white p-2 rounded-md font-semibold hover:bg-blue-400 duration-100 transition-all"
              >
                <HiPencilAlt />
              </button>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Plans;
