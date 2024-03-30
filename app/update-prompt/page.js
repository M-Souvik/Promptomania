'use client';

import {useState, useEffect} from 'react';
import {useRouter, useSearchParams} from "next/navigation"
import Form from'@components/Form'
import { Suspense } from 'react';
const EditPrompt = () => {
    const [submitting, setsubmitting]=useState(false)
    const searchParams=useSearchParams();
    const promptId=searchParams.get('id');
    const router = useRouter();
    const [post, setPost]=useState({
        prompt:'',
        tag:'',
    });

    useEffect(()=>{
        const getPromptDetails = async()=>{
            const response=await fetch(`/api/prompt/${promptId}`)
            const data=await response.json();

            setPost({
                prompt: data.prompt,
                tag: data.tag,
            })
        }
        if(promptId) getPromptDetails();
    },[promptId])

    if(!promptId) return alert('Prompt Id not found');
    const UpdatePrompt= async(e)=>{
      e.preventDefault();
      setsubmitting(true);
      try{
        const response=await fetch(`/api/prompt/${promptId}`,{
          method: 'PATCH',
          body: JSON.stringify({
            prompt: post.prompt,
            tag: post.tag
          })
        });
        if(response.ok){
          router.push('/');
        }

      } catch(error){
        console.log(error);

      }finally{
        setsubmitting(false);
      }
    }
  return (
    <Form
    type="Edit"
    post={post}
    setPost={setPost}
    submitting={submitting}
    handleSubmit={UpdatePrompt}
    />
  )
}

export default EditPrompt
