import { zodResolver } from '@hookform/resolvers/zod';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '../components/ui/input';
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { z} from "zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup } from "../components/ui/select";
import { State } from 'country-state-city';
import useFetch from '@/hooks/useFetch';
import { useUser } from '@clerk/clerk-react';
import { BarLoader } from 'react-spinners';
import { getCompanies } from '@/api/apicompany';
import MDEditor from '@uiw/react-md-editor';
import { Button } from '@/components/ui/button';
import { addnewjob } from '@/api/apijobs';
import { Navigate, useNavigate } from 'react-router-dom';
import AddComapnyDrawer from '@/components/AddComapnyDrawer';


const schema = z.object({
  title:z.string().min(1,{message:"Title is required"}),
  description:z.string().min(1,{message:"Description is required"}),
  location:z.string().min(1,{message:"Location is required"}),
  company_id:z.string().min(1,{message:"Select or add a new company"}),
  requirement:z.string().min(1,{message:"requirements are required"}),

});

const Postjobs = () => {

  const {isLoaded ,user} = useUser();
  const navigate = useNavigate();
  
   const {register , handleSubmit , control , formState:{errors} }= useForm({
   
      defaultValues:{
        location:"",
        company_id:"",
        requirement:"",
      },

      resolver: zodResolver(schema),
    })

    const {fn:fncompanies , data:companies , loding:lodingcompanies} = useFetch(getCompanies);

    // console.log(jobs);  to check if the data is coming or not 
  
  
  // this is for filters the companies 
    useEffect(()=>{
      if(isLoaded) fncompanies();
  
    },[isLoaded])


    const{
      loding:lodingCreatejob,
      error:errorCreatejob,
      data:dataCreatejob,
      fn:fnCreatejob,
    } = useFetch(addnewjob);

    const onSubmit = (data)=>{
      fnCreatejob({
        ...data,
        recruiter_id:user.id,
        isopen:true
      });

    };

    useEffect(() => 
      { if (dataCreatejob) {
         navigate('/jobs');
         } }, [dataCreatejob, navigate]);

    if(!isLoaded || lodingcompanies){
      return <BarLoader className='mb-4' width={"100%"} color='#366d7b7'/>
    }

    // this page is acces to the recuriter only the code logic

    if(user?.unsafeMetadata?.role !== "Recruiter"){
      return <Navigate to='/jobs'/>
     
    }



  return (
    <div>
      <h1 className='gradient-title text-5xl font-extrabold text-center sm:text-7xl pb-8'>Post a Job</h1>

      <form onSubmit={handleSubmit(onSubmit)} className='p-10 space-y-4 flex flex-col' >
     <Input
     placeholder="job Title"{...register("title")}
     />
     {errors.title && <p className="text-red-500">{errors.title.message}</p>}

     <Textarea placeholder='Job discription' {...register("description")} />
     {errors.description && <p className="text-red-500">{errors.description.message}</p>}

 
 <div className='flex justify-between gap-6 items-center'>

  <Controller
  name='location'
  control={control}
  render={({field})=>(
    <Select 
    value={field.value}
    onValueChange={field.onChange}
    >
  
    <SelectTrigger>
      <SelectValue placeholder="Filter by Location" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
      {State.getStatesOfCountry("IN").map(({name})=>{
        return(
          <SelectItem key={name} value={name}>{name}</SelectItem>
        );
      })}
      </SelectGroup>
    </SelectContent>
   </Select>
  )}
  />

<Controller
  name='company_id'
  control={control}
  render={({field})=>(

    <Select
  value={field.value} 
  onValueChange={field.onChange}
  >
  <SelectTrigger>
    <SelectValue placeholder="Filter by Company" >

   {field.value? companies?.find((com)=> com.id === Number(field.value))?.name
   : "company"}

      </SelectValue>
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      {companies?.length > 0 ? companies.map(({name ,id})=>{
        return(
          <SelectItem key={name} value={id}>
            {name}
          </SelectItem>
        );
      }) : <SelectItem>No companies found</SelectItem>}
    </SelectGroup>
  </SelectContent>
</Select>

  )}
  />





{/* add company drawer */}

<AddComapnyDrawer fetchcompanies={fncompanies}/>

</div>

{errors.location && (
  <p className="text-red-500">{errors.location.message}</p>
)}

{errors.company_id && (
  <p className="text-red-500">{errors.company_id.message}</p>
)}

<Controller
name='requirement'
control={control}
render={({field})=>(
  <MDEditor value={field.value} onChange={field.onChange}/>
)}
/>

{errors.requirement && (
  <p className="text-red-500">{errors.requirement.message}</p>
)}

{errorCreatejob?.message &&(
  <p className="text-red-500">{errorCreatejob?.message}</p>
 
)}

{lodingCreatejob && <BarLoader width={"100%"} color='#36d7b7'/>}

<Button type="submit" variant="blue" size="lg" className="mt-2">
  Submit

</Button>

      </form>
    </div>
  )
}

export default Postjobs