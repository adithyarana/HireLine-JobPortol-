import React, { useEffect, useState } from 'react'
import { getjobs } from '@/api/apijobs'
import useFetch from '@/hooks/useFetch'
import { useUser } from '@clerk/clerk-react'
import { BarLoader } from 'react-spinners';
import JobsCards from '@/components/JobsCards';
import { getCompanies } from '@/api/apicompany';
import { Input } from '../components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { State } from 'country-state-city';




const Joblisting = () => {



 const [searchquery , setsearchquery] = useState('');
 const [location , setlocation] = useState('');
 const [company_id , setcompany_id] = useState();
 const {isLoaded} = useUser('');
 


 
  const {fn:fnjobs , data:jobs , loading:lodingjobs}= useFetch(getjobs,{
    location,
    company_id,
    searchquery
  });

  const {fn:fncompanies , data:companies}= useFetch(getCompanies);

  // console.log(jobs);  to check if the data is coming or not 


// this is for filters the companies 
  useEffect(()=>{
    if(isLoaded) fncompanies();

  },[isLoaded])
  

  useEffect(() => {
    if(isLoaded) fnjobs();
  }, [isLoaded , location , company_id , searchquery]);


  const handlesearch = (e)=>{
    e.preventDefault();

   let formData = new FormData(e.target);

   const query = formData.get("search-query")
   if(query) setsearchquery(query);
  }

  const clearfilter= ()=>{
    setsearchquery('');
    setlocation('');
    setcompany_id('');
  }

  if(!isLoaded){
    return <BarLoader className='mb-4' width={"100%"} color='#36d7b7'/>
  }

 
  
  
  return (
    <div>
      <h1 className='gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8 mb-8'>Latest Jobs</h1>

      {/* // add Filter here */}
      <form onSubmit={handlesearch} className='h-14 flex w-full gap-1 items-center mb-3'>
       <Input
       type='text'
       placeholder='Search Jobs by title..'
       className="h-full flex-1 px-4 text-md m-10 "
       name="search-query"
       />

       <Button type="submit" className="h-full sm:w-28 m-10" variant="blue">
        Search

       </Button>
      </form>

      <div className='flex flex-col sm:flex-row gap-2 m-10'>
    <Select  value={location} onValueChange={(value)=>setlocation(value)}>

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

 <Select value={company_id} onValueChange={(value)=>setcompany_id(value)}>
  <SelectTrigger>
    <SelectValue placeholder="Filter by Company" />
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

<Button onClick={clearfilter} variant="destructive" className="sm:w-1/2">Clear Filter</Button>

      </div>



      {lodingjobs && (
        <BarLoader className='mt-4' width={"100%"} color='#36d7b7'/>
    )}

    {lodingjobs === false && (
     <div className='mt-8  grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
      {jobs?.length ?(
          jobs.map((job)=>{
            // getting the jobs card data form this jobs card components 
           return <JobsCards key={job.id} job={job}
           savedInit={job?.saved?.length>0}
           />  
            
          })
      ):(
        <div className='text-4xl text-center m-28'>No jobs Found 😔</div>
      )}
     </div>
    )}
 </div>
    );
  
  };

export default Joblisting