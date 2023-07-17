'use client'
import React, {useState} from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Form from '@components/Form'
const CreatePrompt = () => {
    const [isSubmitting, setisSubmitting] = useState(false)
    , router = useRouter()
    , { data: session } = useSession()
    , [post, setPost] = useState({
        prompt: ''
        , tag: ''
    })
    , createPrompt = async (e) => {
        e.preventDefault()
        setisSubmitting(true)
        try {
            const response = await fetch('/api/prompt/new', {
                method: 'POST'
                , body: JSON.stringify({
                    prompt: post.prompt
                    , tag: post.tag
                    , userId: session?.user.id
                })
            })
            if (response.ok) router.push('/')
        } catch (error) {
            console.log(error); return
        } finally {
            setisSubmitting(false)
        }
    }
    return (
        <Form 
            type='Create' post={post} setPost={setPost}
            submitting={isSubmitting}
            handleSubmit={createPrompt}
        />
    )
}

export default CreatePrompt