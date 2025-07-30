import request from "@/utils/request"

type role='ADMIN'|'SALES'|'TECHNICIAN'|'MANAGER';
type dpt='SALES'|'REPAIR'|'SIM_SALES';
type status='ACTIVE'|'INACTIVE';
type emp={
    id?:number,
    name:string,
    username:string,
    password:string,
    phone:string,
    role?:role,
    department?:dpt,
    status?:status,
    created_at?:string,
    last_login?:string

    
    

}
const addEMP=()=>{
    request.post
}