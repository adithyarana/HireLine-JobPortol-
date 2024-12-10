// this is the file to filter the companirs data form supabase 

import supabaseClient, { supabaseUrl } from "@/utlis/supabase";


export async function applyTojobs(token, _, jobData){
    const supabase = await supabaseClient(token);

    const random = Math.floor(Math.random() *90000)
    const filename = `resume-${random}-${jobData.candidate_id}`;

    // this is the code for uploading the resume 

  const {error: storageError}=  await supabase.storage.from("resumes").upload(filename,jobData.resume);

  if(storageError){
    console.error("Error uplading resume..!", storageError);
    return null;
    
}
  

const resume = `${supabaseUrl}/storage/v1/object/public/resumes/${filename}`;

const {data , error} = await supabase.from("applications").insert([
    {
    ...jobData, resume
},
]).select();


if(error){
    console.error("Error Submiting applcations..!", error);
    
}
  

    return data;
}



export async function updateApplicationsStatus(token,{job_id}, status){
    const supabase = await supabaseClient(token);

    const {data , error} = await supabase
    .from("applications")
    .update({status})
    .eq("job_id", job_id)
    .select();


    if(error || data.length ===0){
        console.error("Error Updating Applications Status", error);
        
    }
    return data;


}
export async function getApplication(token,{user_id}){
    const supabase = await supabaseClient(token);

    const {data , error} = await supabase
    .from("applications")
    .select("*,job:jobs(title , company:companies(name))")
    .eq("candidate_id", user_id)
   
   
  


    if(error){
        console.error("Error getting Applications ", error);
        return null;
    }
    return data;
}