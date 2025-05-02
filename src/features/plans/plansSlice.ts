import { apiSlice } from "../api/apiSlice";
import { IPlan } from "./types/Plan";

const endpoint = "/plans";

function getPlans() {
  return `${endpoint}`;
}

function getPlanById(id: string) {
  return `${endpoint}/${id}`;
}

export const plansApiSlice = apiSlice.injectEndpoints({
  endpoints: ({ query }) => ({
    getPlans: query<IPlan[], void>({
      query: () => getPlans(),
      providesTags: ["plans"]
    }),
    getPlanById: query<IPlan, string>({
      query: (id) => getPlanById(id),
      providesTags: ["plans"]
    })
  })
});

export const { useGetPlansQuery, useGetPlanByIdQuery } = plansApiSlice;

