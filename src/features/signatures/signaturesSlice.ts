import { apiSlice } from "../api/apiSlice";

interface IPlanInfo {
  name: string;
  type: 'free' | 'premium';
  features: string[];
}

const endpoint = "/signatures";

export const signaturesApiSlice = apiSlice.injectEndpoints({
  endpoints: ({ query }) => ({
    getActiveSignature: query<IPlanInfo, void>({
      query: () => `${endpoint}/active`,
      providesTags: ["signatures"]
    })
  })
});

export const { useGetActiveSignatureQuery } = signaturesApiSlice; 