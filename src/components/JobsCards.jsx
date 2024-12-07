import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Heart, MapPinIcon, Trash2Icon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { deletejobs, savejob } from '@/api/apijobs';
import useFetch from '@/hooks/useFetch';
import { BarLoader } from 'react-spinners';

const JobsCards = ({
    job,
    isMyjob = false,
    savedInit = false,
    onJobSaved=()=>{},
}) => {

    const [saved , setsaved]= useState(savedInit);

    const {fn:fnsavedjob , data:savedjob , loading:lodingsavedjob}= useFetch(savejob,{
        alreadysaved: saved,
    });
    

    const {user} = useUser();

    const handlesavedjobs = async()=>{
        await fnsavedjob({
            user_id: user.id,
            job_id:job.id
        })

        onJobSaved();
    }

    // this is the logic to delete the jobs 

    const {
        loading:loadingdeletejob,
        fn: fndeletejob,
    }= useFetch(deletejobs,{
        job_id: job.id,
    })

    const handledeletejob= async()=>{
        await fndeletejob();
        onJobSaved();
    }
    useEffect(()=>{
        if(savedjob !== undefined) setsaved(savedjob?.length >0);
    },[savedjob]);

  return (
    <Card className="m-10 flex flex-col">
        {loadingdeletejob && (
            <BarLoader className='mt-4' width={"100%"} color='#36d7b7'/>
        )}
        <CardHeader>
            <CardTitle className="flex justify-between font-bold" >
                {job.title}

                {isMyjob &&(
                    <Trash2Icon 
                    fill="red"
                    size={18}
                    className='text-red-300 cursor-pointer'
                    onClick={handledeletejob}
                    />
                )}
            </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-4 flex-1">
            <div className='flex justify-between'>
                {job.company && <img src={job.company.logo_url} className='h-6'/>}

                <div className='flex gap-2 items-center'>
                    <MapPinIcon size={15}/> {job.location}
                </div>
            </div>

            <hr/>

            {job.description.substring(0, job.description.indexOf("."))}

        </CardContent>

        <CardFooter className="flex gap-2">
            <Link to={`/job/${job.id}`} className='flex-1'>

            <Button variant ="secondary" className="w-full">More Details

            </Button>
            </Link>

            {!isMyjob &&(
                <Button
                variant='outline' 
                className="w-15"
                onClick={handlesavedjobs}
                disabled={lodingsavedjob}
                >

                    {saved ? (
                     <Heart size={20} stroke='red' fill='red' className='cursor-pointer'/>
                    ):(
                        <Heart size={20}/>
                    )
                    
                }
                </Button>
            )}

           
        </CardFooter>

     
    </Card>
  )
}

export default JobsCards