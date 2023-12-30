"use client"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import * as z from "zod"
  import { Input } from "@/components/ui/input"
  import { Label } from "@/components/ui/label"
  import { toast } from "@/components/ui/use-toast"
  import { Icons } from "@/components/shared/icons"

    import { Button } from "@/components/ui/button"
    import { useForm } from "react-hook-form"
    import { zodResolver } from "@hookform/resolvers/zod"



export const Overview = ({docItem}:any) => {

      

    async function onSubmit(data: FormData) {
        console.log(data)
       
        
        // const {status} =  await updateDocItemOpenAI(data,docItem.id)

        
      
        }
     
    return (
       <Card>
      <CardHeader>
        <CardTitle>Overview</CardTitle>
        <CardDescription>
          docs item overview
        </CardDescription>
      </CardHeader>
       </Card>
    )
}