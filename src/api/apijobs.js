
import supabaseClient from "@/utlis/supabase";

export async function getjobs(token , {location , company_id , searchquery}){
    const supabase = await supabaseClient(token);

    let query = supabase
    .from("jobs")
    .select("* , company:companies(name , logo_url) , saved: saved_jobs(id)");

    if(location){
        query= query.eq("location", location);
    }
    if(company_id){
        query= query.eq("company_id", company_id);
    }
    if(searchquery){
        query= query.ilike("title", `%${searchquery}%`);
    }

    const {data , error} =await query;

    if(error){
        console.error("Error fetching jobs: ", error);
        return null;
    }

    return data;
}

// this is logic for the saved jobs

export async function savejob(token , {alreadysaved}, saveData){
    const supabase = await supabaseClient(token);


    if(alreadysaved){
        const {data , error: deleteError} = await supabase
        .from("saved_jobs")
        .delete()
       .eq("job_id", saveData.job_id)

       if(deleteError){
        console.error("Error Deleting Saved job:", deleteError);
        return null;
        
    }

    return data;
    } 
    else{
        const {data , error: insertError} = await supabase
       .from("saved_jobs")
       .insert([saveData])
       .select();

       if(insertError){
        console.error("Error fetching jobs", insertError);
        return null;
        
    }
    return data;

    }


}

export async function getSinglejob(token,{job_id}){
    const supabase = await supabaseClient(token);

    const {data , error} = await supabase
    .from("jobs")
    .select("* , company:companies(name , logo_url),applications:applications(*)")
    .eq("id",job_id)
    .single();

    if(error){
        console.error("Error getting job", error);
        return null;
        
    }
    return data;
}

export async function updateHiringStatus(token,{job_id}, isopen){
    const supabase = await supabaseClient(token);

    const {data , error} = await supabase
    .from("jobs")
    .update({isopen})
    .eq("id",job_id)
    .select()

    if(error){
        console.error("Error updating job", error);
        return null;
        
    }
    return data;
}


export async function addnewjob(token,_, jobData){
    const supabase = await supabaseClient(token);

    const {data , error} = await supabase
    .from("jobs")
    .insert([jobData])
    .select()

    if(error){
        console.error("Error creating job", error);
        return null;
        
    }
    return data;
}


export async function getSavedjobs(token){
    const supabase = await supabaseClient(token);

    const {data , error} = await supabase
    .from("saved_jobs")
    .select("*, job:jobs(*,company:companies(name,logo_url))");

    if(error){
        console.error("Error Fetching Saving job", error);
        return null;
        
    }
    return data;
}

export async function getmyjobs(token,{recruiter_id}){
    const supabase = await supabaseClient(token);

    const {data , error} = await supabase
    .from("jobs")
    .select("* ,company:companies(name,logo_url)")
    .eq("recruiter_id", recruiter_id)

    if(error){
        console.error("Error Fetching  jobs", error);
        return null;
        
    }
    return data;
}

export async function deletejobs(token,{job_id}){
    const supabase = await supabaseClient(token);

    const {data , error} = await supabase
    .from("jobs")
    .delete()
    .eq("id", job_id)
    .select();

    if(error){
        console.error("Error Deleting   jobs", error);
        return null;
        
    }
    return data;
}