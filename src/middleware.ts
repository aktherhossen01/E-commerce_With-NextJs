
import { NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "./services/AuthService"


type Role = keyof typeof roleBasedPrivateRole

const authRoutes= ["/login","/register"]
const roleBasedPrivateRole ={
    user:[/^\/user/],
    admin:[/^\/admin/]
}

export const middleware = async(request:NextRequest)=>{
   const {pathname}= request.nextUrl
    const userInfo = await getCurrentUser()

    if(!userInfo){
        if(authRoutes.includes(pathname)){
            return NextResponse.next()
        }else{
            return NextResponse.redirect(
                new URL(`http://localhost:3000/login?redirectPath=${pathname}`,request.url)
            )
        }
    }
    if(userInfo.role && roleBasedPrivateRole[userInfo?.role as Role]){
        const routes = roleBasedPrivateRole[userInfo?.role as Role];
        if(routes.some((route)=>pathname.match(route))){
            return NextResponse.next()
        }
    }

    return NextResponse.redirect(new URL("/", request.url))
};

export const  config={
    matcher:[
        "/login",
        "/create-shop",
        "/admin",
        "/admin/:page",
        "/user",
        "/user/:page",
    ]
}