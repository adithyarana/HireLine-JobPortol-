// this is the file to filter the companirs data form supabase 

import supabaseClient, { supabaseUrl } from "@/utlis/supabase";

export async function getCompanies(token){
    const supabase = await supabaseClient(token);

    const {data , error} = await supabase.from("companies")
    .select("*")
    if(error){
        console.error("Error getting companies", error);
        
    }
    return data;
}

export async function Addnewcompany(token,_, companyData){
    const supabase = await supabaseClient(token);

    const random = Math.floor(Math.random() *90000)
    const filename = `logo-${random}-${companyData.name}`;

    // this is the code for uploading the resume 

  const {error: storageError}=  await supabase.storage.from("company-logo").upload(filename,companyData.logo);

  if(storageError){
    console.error("Error uplading logo..!", storageError);
    return null;
    
}
  

const logo_url = `${supabaseUrl}/storage/v1/object/public/company-logo/${filename}`;

    const {data , error} = await supabase.from("companies")
    .insert([{
        name: companyData.name,
        logo_url
    }])
    .select()
    if(error){
        console.error("Error Submiting companies", error);
        
    }
    return data;
}