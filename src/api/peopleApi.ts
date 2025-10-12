import axios from 'axios';
import type { PersonRaw, SearchParams, PagedResponse } from '../types';


const api = axios.create({
baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
timeout: 10000,
});


export async function fetchPeople(params: {
page: number; // 1-based
size: number;
search?: SearchParams;
}): Promise<PagedResponse<PersonRaw>> {
const { page, size, search } = params;
const res = await api.get<PagedResponse<PersonRaw>>('/people', {
params: { page, size, ...search },
});
return res.data;
}


export async function createPerson(payload: Omit<PersonRaw, '人材ID'>): Promise<PersonRaw> {
// 人材IDはサーバー側で自動生成
const res = await api.post<PersonRaw>('/people', payload);
return res.data;
}


export async function updatePerson(id: string, payload: Omit<PersonRaw, '人材ID'>): Promise<PersonRaw> {
const res = await api.put<PersonRaw>(`/people/${id}`, payload);
return res.data;
}


export async function deletePerson(id: string): Promise<void> {
await api.delete(`/people/${id}`);
}