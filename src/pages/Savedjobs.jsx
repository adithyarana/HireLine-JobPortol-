import { getSavedjobs } from '@/api/apijobs';
import JobsCards from '@/components/JobsCards';
import useFetch from '@/hooks/useFetch';
import { useUser } from '@clerk/clerk-react'
import React, { useEffect } from 'react'
import { BarLoader } from 'react-spinners';



const Savedjobs = () => {
  const {isLoaded} = useUser();

  const {
   loading:lodingsavedjobs,
   data:savedjobs,
   fn:fnSavedjobs,
  }= useFetch(getSavedjobs)


  useEffect(()=>{
    if(isLoaded) fnSavedjobs();
  },[isLoaded])

  if(!isLoaded || lodingsavedjobs){
    return <BarLoader className='mb-4' width={"100%"} color='#36d7b7' />
  }

  return (
    <div>
      <h1 className='gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8'>Saved Jobs</h1>


      {lodingsavedjobs === false && (
     <div className='mt-8  grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
      {savedjobs?.length ?(
          savedjobs.map((saved)=>{
            // getting the jobs card data form this jobs card components 
           return <JobsCards key={saved.id} job={saved?.job}
           savedInit={true}
           onjobsaved={fnSavedjobs}
           />  
            
          })
      ):(
        <div className='text-4xl text-center m-28'>No  Saved jobs Found 😔</div>
      )}
     </div>
    )}

    </div>



  )
}

export default Savedjobs