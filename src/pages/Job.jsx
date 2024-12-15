import React, {  useEffect } from 'react'; // Ensure useState is imported
import { getSinglejob, updateHiringStatus } from '@/api/apijobs';
import useFetch from '@/hooks/useFetch';
import { useUser } from '@clerk/clerk-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import MDEditor from '@uiw/react-md-editor';
import { Briefcase, DoorClosed, DoorOpen, MapPinIcon } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { BarLoader } from 'react-spinners';
import ApplyjobDrawer from '@/components/Applyjob';
import ApplicationCard from '@/components/ApplicationCard';

const Job = () => {
  const { isLoaded, user } = useUser();
  const { id } = useParams();

  const { fn: fnjobs, data: job } = useFetch(getSinglejob, {
    job_id: id,
  });

  const { fn: fnHiringStatus, loading: loadingHiringStatus } = useFetch(updateHiringStatus, {
    job_id: id,
  });

  const handleStatusChange = (value) => {
    const isOpen = value === 'open';
    fnHiringStatus(isOpen).then(() => fnjobs());
  };

  useEffect(() => {
    if (isLoaded) fnjobs();
  }, [isLoaded]);

  if (!isLoaded) {
    return <BarLoader className='mb-4' width={"100%"} color='#36d7b7' />;
  }

  return (
    <div className='flex flex-col gap-8 mt-5'>
      <div className='flex flex-col-reverse gap-6 md:flex-row justify-between items-center m-10'>
        <h1 className='gradient-title font-extrabold pb-3 ml-20 text-4xl sm:text-6xl'>{job?.title}</h1>
        <img src={job?.company?.logo_url} className='h-12' alt={job?.title} />
      </div>

      <div className='flex justify-between '>
        <div className='flex gap-2 m-10'>
          <MapPinIcon />
          {job?.location}
        </div>
        <div className='flex gap-2 m-10'>
          <Briefcase /> {job?.applications?.length} Applicants
        </div>

        <div className='flex-wrap mr-6 mt-8'>
          {job?.isopen ? (
            <>
              <DoorOpen /> Open👍
            </>
          ) : (
            <>
              <DoorClosed /> Closed👎
            </>
          )}
        </div>
      </div>

      {loadingHiringStatus && <BarLoader width={"100%"} color='#36d7b7' />}
      {job?.recruiter_id === user?.id && (
        <Select onValueChange={handleStatusChange}>
          <SelectTrigger className={`w-full ${job?.isopen ? "bg-green-950" : "bg-red-950"}`}>
            <SelectValue placeholder={"Hiring Status " + (job?.isopen ? "(Open)" : "(Closed)")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="open"> Open</SelectItem>
            <SelectItem value="close"> Closed</SelectItem>
          </SelectContent>
        </Select>
      )}

      <h2 className='text-2xl sm:text-3xl font-bold m-2'>About the job</h2>
      <p className='sm:text-lg m-2'>{job?.description}</p>
      <h2 className='text-2xl sm:text-3xl font-bold m-2'> What we are looking for</h2>
      <MDEditor.Markdown source={job?.requirement} className='bg-transparent sm:text-lg m-2' />

      {job?.recruiter_id !== user?.id && (
        <ApplyjobDrawer
          job={job}
          user={user}
          fetchJob={fnjobs}
          applied={job?.applications?.find((ap) => ap.candidate_id === user.id)}
        />
      )}

      {job?.applications?.length > 0 && job?.recruiter_id === user?.id && (
        <div className='flex flex-col gap-2'>
          <h2 className='text-2xl sm:text-3xl font-bold'>Applications</h2>
          {job?.applications.map((application) => (
            <ApplicationCard key={application.id} application={application} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Job;
