'use client';


import { useState } from "react";
import Image from "next/image";
import { useSession } from 'next-auth/react';
import { usePathname } from "next/navigation";

const Promptcard = ({ post, handleTagClick, handleDelete, handleEdit }) => {

  const { data: session } = useSession();
  const pathName = usePathname();



  const [copied, setCopied] = useState("")

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => {
      setCopied("")
    }, 2000);

  }



  return (
    <div className="prompt_card">
      <div className='flex justify-between items-start gap-5'>
        <div
          className='flex-1 flex justify-start items-center gap-3 cursor-pointer'
        >
          <Image
            src={post.creator.image}
            alt='user_image'
            width={40}
            height={40}
            className='rounded-full object-contain'
          />

          <div className='flex flex-col'>
            <h3 className='font-satoshi font-semibold text-gray-900'>
              {post.creator.username}
            </h3>
            <p className='font-inter text-sm text-gray-500'>
              {post.creator.email}
            </p>
          </div>
        </div>

        <div className='copy_btn' onClick={handleCopy} >
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt={copied === post.prompt ? "tick_icon" : "copy_icon"}
            width={12}
            height={12}
          />
        </div>
      </div>

      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>




      <div className="flex flex-wrap">
        {
          post.tags.map((post, idx) => {
            return <div key={idx} className="flex flex-wrap my-1">
              <p className="font-inter mr-4 text-sm   bg-gray-300  rounded-lg p-1 cursor-pointer" onClick={() => handleTagClick && handleTagClick(post)}>#{post}</p>
            </div>


          })

        }
      </div>

      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
          <p
            className='font-inter text-sm green_gradient cursor-pointer'
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className='font-inter text-sm orange_gradient cursor-pointer'
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}



    </div >
  )
}

export default Promptcard