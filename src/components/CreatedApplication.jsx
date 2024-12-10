import { getApplication } from '@/api/apiApplications';
import useFetch from '@/hooks/useFetch';
import { useUser } from '@clerk/clerk-react';
import React, { useEffect } from 'react';
import { BarLoader } from 'react-spinners';
import ApplicationCard from './ApplicationCard';

const CreatedApplication = () => {

  const { user } = useUser();

  const {
    loading: lodingapplication,
    data: applications =[], 
    fn: fnapplication,
  } = useFetch(getApplication, {
    user_id: user?.id, 
  });

  useEffect(() => {
      fnapplication(); 
  }, []);

  if (lodingapplication) {
    return <BarLoader className='mb-4' width={"100%"} color='#36d7b7' />;
  }

  return (
    <div className='flex flex-col gap-2'>
      {applications.map((application) => {
        return (
          <ApplicationCard
            key={application.id}
            application={application}
            isCandidata
          />
        );
      })}
    </div>
  );
};

export default CreatedApplication;
