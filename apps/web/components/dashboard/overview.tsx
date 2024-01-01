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
import { toast } from '@/components/ui/use-toast'
import { Icons } from "@/components/shared/icons"

import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"



export const Overview = ({ project }: any) => {



  async function onSubmit(data: FormData) {
    console.log(data)


    // const {status} =  await updateDocItemOpenAI(data,docItem.id)



  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Overview</CardTitle>
        <CardDescription>
          here is the overview of your project
          {/* where you can see the status of your project and the number of docs you have        */}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <CardTitle>
          Your project is {project?.status}
        </CardTitle>
        <CardDescription className="pt-2  ">

       <p className="flex items-center  gap-1">  Your docuconvo key is  <span className="select-none flex items-center gap-1 p-1 py-[2px] w-max font-mono bg-[#f7fbfc] hover:bg-gray-100 rounded-sm border  cursor-context-menu" onClick={() => {
            navigator.clipboard.writeText(project?.docuconvo_key);
            toast({
              title: 'Success!',
              description: "copied to clipboard",
              variant: 'default'
            })
          }}> {project?.docuconvo_key} <Icons.clipboard /> </span></p> 
<div>
 <h3 className="pt-1 mt-3 text-base font-semibold   text-black ">
  Here is example of how to use it in your code
 </h3>
  <div className="mt-2  p-2  rounded-md md:flex w-full items-center">
    <p className="w-1/3">
      You can copy this code and paste it in your codebase
      currently we support only javascript and typescript 
      either you can use our npm package or you can use our api directly

       </p>
    <pre className="w-full bg-[#f7fbfc] font-mono w-2/3 text-sm p-2 relative whitespace-pre-line" >
             <Icons.clipboard className="absolute  right-2 cursor-pointer " onClick={() => {
            navigator.clipboard.writeText(  `import {docuconvo} from 'docuconvo'

            const docuconvo = docuconvo('${project?.docuconvo_key}')
            const response = await docuconvo.ask('how to create a new project?')
            console.log(response)
            `);
            toast({
              title: 'Success!',
              description: "copied to clipboard",
              variant: 'default'
            })
          }} /> 
      {`import {docuconvo} from 'docuconvo'

const docuconvo = docuconvo('${project?.docuconvo_key}')
const response = await docuconvo.ask('how to create a new project?')
console.log(response)
`}
    </pre>
  </div>
</div>

        </CardDescription>
      </CardContent>
    </Card>
  )
}