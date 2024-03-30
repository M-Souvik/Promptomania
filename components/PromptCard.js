'use client';

import { useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Image from 'next/image';

const PromptCard = ({post, handleTagClick, handleEdit, handleDelete}) => {
  const { data: session } = useSession();
  // const router = useRouter();
  const pathName = usePathname();
  const [copied, setCopied] = useState("");

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3000);
  }

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image src={post.creator.image} className="rounded-full object-contain" alt="user_image" height={40} width={40}/>
          <div className="flex flex-col">
            <h3 className="font-satoshi font-bold text-gray-900">{post.creator.username}</h3>
            <p className="text-xs font-inter text-gray-500">{post.creator.email}</p>
          </div>
        </div>
        <div className="copy_btn hover:bg-slate-400 hover:bg-opacity-45" onClick={handleCopy}>
          <Image src={copied === post.prompt ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'} width={18} height={18}/>
        </div>
      </div>
      <p className="my-4 font-satoshi text-lg text-gray-700">{post.prompt}</p>
      <p className="font-satoshi text-sm text-gray-400" onClick={() => handleTagClick && handleTagClick(post.tag)}>#{post.tag}</p>
      {session?.user.id === post.creator._id && pathName === '/profile' && (
        <div className="mt-5 flex-center gap-5 border-t border-gray-100">
          <p className="font-inter text-sm blue_gradient cursor-pointer" onClick={handleEdit}>Edit</p>
          <p className="font-inter text-sm orange_gradient cursor-pointer" onClick={handleDelete}>Delete</p>
        </div>
      )}
    </div>
  )
}

export default PromptCard;
