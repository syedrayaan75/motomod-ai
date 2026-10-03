import axios from 'axios';

export const api = axios.create({ baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:5072/api' });

export type Rider = { id: string; displayName: string; email: string; role: string };
export type ApiBike = { id: number; brand: string; model: string; year: number; style: string; powerBhp: number; weightKg: number; imageUrl?: string };
export type ApiPart = { id: number; brand: string; name: string; category: string; price: number; powerGainBhp: number; weightChangeKg: number; imageUrl?: string };
export type SavedBuild = { id: string; name: string; status: string; totalCost: number; updatedAt: string; bike: string; modelYear: number; imageUrl?: string };
export type FullBuild = { id: string; name: string; prompt: string; bikeId: number; bike: ApiBike; partIds: number[] };

export function setToken(token?: string) {
  if (token) api.defaults.headers.common.Authorization = `Bearer ${token}`;
  else delete api.defaults.headers.common.Authorization;
}

export async function authenticate(mode: 'login' | 'register', values: { name?: string; email: string; password: string }) {
  const { data } = await api.post<{ token: string; user: Rider }>(`/auth/${mode}`, mode === 'register' ? values : { email: values.email, password: values.password });
  return data;
}
export const getBikes = async () => (await api.get<ApiBike[]>('/bikes')).data;
export const getParts = async (bikeId: number, category?: string) => (await api.get<ApiPart[]>('/parts', { params: { bikeId, category } })).data;
export const compileBuild = async (payload: { bikeId: number; partIds: number[]; prompt: string; name: string }) => (await api.post('/builds/compile', payload)).data;
export const getMyBuilds = async () => (await api.get<SavedBuild[]>('/builds/mine')).data;
export const getBuild = async (id: string) => (await api.get<FullBuild>(`/builds/${id}`)).data;
