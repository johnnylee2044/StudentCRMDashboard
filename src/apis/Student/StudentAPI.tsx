import request from "@/utils/request"


type ApplicationStatus= 'EXPLORING'| 'SHORTLISTING'|'APPLYING'|'SUBMITTED'

type Intent='HIGH'|'LOW'|'MEDIUM'

type Student={
      id: number;
  name: string;
  phone:string;
  email: string;
  grade?: string;
  country: string;
  applicationStatus: string;
  lastActive: string;
  intent: string;
  interactions?: Interaction[]; 
  communications?: Communication[];


    
    
}

const getStudents = async (params = {}): Promise<Student[]> => {
  try {
    const response = await request.get<Student[]>('/api/students', { params })
    
   
    return response.data
    
  } catch (error) {
    const err = error as any
    throw new Error(err.response?.data?.message || 'Get Student List Failed')
  }
}

const getStudentById = async (id:number) => {
  try {
    const response = await request.get(`/api/students/${id}`)
    return response.data
  } catch (error) {
    const err=error as any
    throw new Error(err.response?.data?.message || 'get Student information failed')
  }}

  export {getStudents,getStudentById,Student,ApplicationStatus,Intent}
  export interface Communication {
  id: number;
  type: string;
  subject: string;
  content: string;
  direction: string;
  createdBy: string;
  timestamp: string;
}

export interface Interaction {
  id: number;
  type: string;
  title: string;
  timestamp: string;
}