import { getmyjobs } from '@/api/apijobs';
import useFetch from '@/hooks/useFetch';
import { useUser } from '@clerk/clerk-react'
import React from 'react'
import { BarLoader } from 'react-spinners';
import JobsCards from './JobsCards';
import { useEffect } from 'react';


const  CreatedJobs=()=> {

    const {user}= useUser();

    const {
        loading:lodingcreatejobs,
        data:createdjobs=[],
        fn:fnCreateJobs,

    }= useFetch(getmyjobs,{
        recruiter_id: user.id,
    });

    useEffect(()=>{
        fnCreateJobs();
    },[]);

    if(lodingcreatejobs){
        return <BarLoader className='mb-4' width={"100%"} color='#36d7b7'/>
    }

  return (
    <div>
       
     <div className='mt-8  grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
      {createdjobs?.length ?(
          createdjobs.map((job)=>{
            // getting the jobs card data form this jobs card components 
           return (
           <JobsCards 
           key={job.id} 
           job={job}
           onJobSaved={fnCreateJobs}
           isMyjob
           />  
           );
          })
      ):(
        <div className='text-4xl text-center m-28'>No jobs Found 😔</div>
      )}
     </div>
    
    </div>
  )
}

export default CreatedJobs