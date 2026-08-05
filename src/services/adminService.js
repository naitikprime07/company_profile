import { ENVIRONMENT } from "../constants/environment";
const request=async(path,options={})=>{const token=sessionStorage.getItem("adminToken");const response=await fetch(`${ENVIRONMENT.apiBaseUrl}${path}`,{...options,headers:{"Content-Type":"application/json",...(token?{Authorization:`Bearer ${token}`}:{})}});const body=await response.json();if(!response.ok)throw new Error(body.message);return body.data;};
export const loginAdmin=(email,password)=>request("/admin/login",{method:"POST",body:JSON.stringify({email,password})});
export const getContacts=()=>request("/admin/contacts");
export const setContactStatus=(id,status)=>request(`/admin/contacts/${id}`,{method:"PATCH",body:JSON.stringify({status})});
export const getAdminOpenings=()=>request("/admin/openings");
export const createOpening=data=>request("/admin/openings",{method:"POST",body:JSON.stringify(data)});
export const deleteOpening=id=>request(`/admin/openings/${id}`,{method:"DELETE"});
