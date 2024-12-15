import React, { useEffect, useState }  from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button } from './ui/button';
import { SignIn, useUser } from '@clerk/clerk-react';
import { SignedOut } from '@clerk/clerk-react';
import { UserButton } from '@clerk/clerk-react';
import { SignedIn } from '@clerk/clerk-react';
import { BriefcaseBusiness, Heart, PenBox } from 'lucide-react';

const Header = () => {

  const  [showsignin , setshowsignin] = useState(false);

  const [search , setsearch]= useSearchParams();
  const {user}= useUser();

  useEffect(()=>{
    if(search.get("sign-in")){
      setshowsignin(true);
    }
  },[search])

  // to handle if user click outside the login page  the page wiill go
  const handleclick=(e)=>{
  if(e.target === e.currentTarget){
    setshowsignin(false);  // hide the login page when user click outside of it.
    setsearch({});
  }
  }
  return (
    <>
      <nav className='py-4 px-6  flex  justify-between items-center shadow-md'>
        <Link to="/">
          <img src="/Logo1.png" alt="Hire Line Logo" className='h-40' />
        </Link>

    
   <div className='flex gap-8'>
   <SignedOut>
           <Button variant="outline" onClick={()=> setshowsignin(true)}  >Login</Button>
      </SignedOut>
      <SignedIn>
      {user?.unsafeMetadata?.role === "Recruiter" && (
          <Link to='/postjobs'>
          <Button  variant="destructive" className='rounded-full'>
            <PenBox size={20} className='mr-2'/>
            Post a Job
          </Button>
        </Link>
      )}
        <UserButton

        appearance={{
          elements: {
            avatarBox: "w-10 h-10",
          },
        }}
        >

          <UserButton.MenuItems>

             <UserButton.Link
             label ="My jobs"
             labelIcon ={<BriefcaseBusiness size={15}/>}
             href="/myjobs"
             />

             <UserButton.Link
             label ="Saved jobs"
             labelIcon ={<Heart size={15}/>}
             href="/savedjobs"
             />


          </UserButton.MenuItems>

        

        </UserButton>
      </SignedIn>
   </div>
      </nav> 

      {/* Clerk Sign In Modal */}

      {showsignin && (
        <div className='fixed inset-0 flex  items-center justify-center bg-black bg-opacity-50'
        onClick={handleclick}
        >
          
          <SignIn
          signUpForceRedirectUrl='/onboarding'
          fallbackRedirectUrl='/onboarding'
          />
        </div>
      )}
    </>
  );
}

export default Header;
