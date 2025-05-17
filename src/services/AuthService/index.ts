"use server"
import { jwtDecode } from "jwt-decode";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const registerUser = async(userData:FieldValues)=>{
    try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user`,{
            method:"POST",
            headers:{
                
                "Content-Type":"application/json"
            },
            body:JSON.stringify(userData)
        });
         const result =await res.json()
        if(result.success){
            (await cookies()).set("accessToken",result.data.accessToken)
        }
        return result
    }
    catch(err:any){
return  Error(err)
    }
}





export const loginUser = async(userData:FieldValues)=>{
    try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(userData)
        });
        const result =await res.json()
        if(result.success){
            (await cookies()).set("accessToken",result.data.accessToken)
        }
        return result
    }
    catch(err:any){
return  Error(err)
    }
}

export const getCurrentUser = async()=>{
    const accessToken = (await cookies()).get('accessToken')?.value
    let decodeData = null;

    if(accessToken){
        decodeData = await jwtDecode(accessToken)
        return decodeData
    }else{
        return null
    }
}

export const rechaptchValidation = async(token:string)=>{
try{
        const res =await fetch("https://www.google.com/recaptcha/api/siteverify",{
        method:'POST',
        headers:{
            'Content-Type':"application/x-www-form-urlencoded"
        },
        body:new URLSearchParams({
            secret:process.env.NEXT_PUBLIC_RECAPTCHA_SERVER_KEY!,
            response:token
        })
    })
    return res.json()
}
catch(err:any){
    return Error(err)
}

};

export const logout = async() => {
  const cookieStore = await cookies();
  cookieStore.delete('accessToken');
};