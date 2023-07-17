'use client'
import React, {useState, useEffect} from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Form from '@components/Form'
const EditPrompt = () => {
    const [isSubmitting, setisSubmitting] = useState(false)
    , router = useRouter()
    , searchParams = useSearchParams()
    , promptId = searchParams.get('id')
    , [post, setPost] = useState({
        prompt: ''
        , tag: ''
    })
    , updatePrompt = async (e) => {
        e.preventDefault()
        setisSubmitting(true)
        if (!promptId) return alert('Prompt ID not found')
        try {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: 'PATCH'
                , body: JSON.stringify({
                    prompt: post.prompt
                    , tag: post.tag
                })
            })
            if (response.ok) router.push('/')
        } catch (error) {
            console.log(error); return
        } finally {
            setisSubmitting(false)
        }
    }
    useEffect(() => {
        const getPromptData = async () => {
            const response = await fetch(`/api/prompt/${promptId}`)
                , data = await response.json()
            setPost({
                prompt: data.prompt, tag: data.tag
            })
        }
        if (promptId) getPromptData()
    }, [promptId])
    return (
        <Form 
            type='Edit' post={post} setPost={setPost}
            submitting={isSubmitting}
            handleSubmit={updatePrompt}
        />
    )
}

export default EditPrompt