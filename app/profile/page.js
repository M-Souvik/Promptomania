'use client'
import {useState, useEffect} from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import MyProfile from '@components/Profile.js'

const Profile = () => {
const {data: session}= useSession();
const [posts, setPosts] = useState([]);
const router=useRouter();

  useEffect(()=>{
    const fetchPosts = async()=>{
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();
     
      setPosts(data);
  
    }
  
    if(session?.user.id) fetchPosts();
  },[])
  const handleEdit=(post)=>{
    router.push(`/update-prompt?id=${post._id}`)
  }
  const handleDelete=async(post)=>{
    const hasConfirmed=confirm("Are you sure, You want to delete this?");
    if(hasConfirmed){
      try {
        await fetch(`/api/prompt/${post._id.toString()}`,{
          method: 'DELETE',
        });
        const filteredPosts=posts.filter((deletePost)=> deletePost._id !== post._id)

        setPosts(filteredPosts)
      } catch (error) {
        console.log(error);
      }
    }
  }
  return (
    <div>
      < MyProfile
      name="My"
      desc="Welcome to your Personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      />
    </div>
  )
}

export default Profile ;
