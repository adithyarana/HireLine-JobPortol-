import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import {z} from "zod";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"
import { Button } from './ui/button';
import { Input } from '../components/ui/input';
import useFetch from '@/hooks/useFetch';
import { Addnewcompany } from '@/api/apicompany';
import { BarLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom'
  

const schema=z.object({
    name:z.string().min(1,{message:"Company name is required"}),
    logo: z
    .any()
    .refine(
      (file) =>
        file[0] &&
        (file[0].type === "image/png" ||
          file[0].type === "image/jpeg"),
      { message: "Only Image are allowed" }
    ),
})

const  AddComapnyDrawer=({fetchcompanies})=> {

    const {register ,handleSubmit , control , formState:{errors}} = useForm({
        resolver: zodResolver(schema),
    })

    const navigate = useNavigate();
   

    // api foe the company

    const {
  loading: loadingAddCompany,
  error: errorAddCompany,
  data: dataAddCompany,
  fn: fnAddCompany,
    } = useFetch(Addnewcompany)
    

    const onSubmit=(data)=>{
       fnAddCompany({
        ...data,
        logo: data.logo[0]
       })
    }

    useEffect(()=>{
     if(dataAddCompany?.length >0) {
        fetchcompanies();
        navigate('/postjobs')
     }
     
       
    },[loadingAddCompany ,navigate  ])

  return (
    <Drawer>
  <DrawerTrigger>
    <Button variant="secondary" size="sm" type="button">Add Company👇</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Add a new Company</DrawerTitle>
    </DrawerHeader>

<form className='flex gap-2 p-4 pb-0'>
    <Input placeholder="Company Name" {...register("name")}/>
    {errors.name && <p className='text-red-600' >{errors.name.message}</p>}

    <Input type="file" {...register("logo")} accept="image/*" className="file:text-gray-500"/>
    {errors.logo && <p className='text-red-600'>{errors.logo.message}</p>}


<Button
type="button"
onClick={handleSubmit(onSubmit)}
variant="destructive"
className="w-40"
>

    Add
    
</Button>

</form>

{errorAddCompany?.message &&(
    <p className='text-red-600'>{errorAddCompany?.message}</p>
 
)}

{loadingAddCompany && <BarLoader width={"100%"} color="#36d7b7"/>}

    <DrawerFooter>
      <DrawerClose asChild>
        <Button variant="secondary" type="button">Cancel</Button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>

  )
}

export default AddComapnyDrawer