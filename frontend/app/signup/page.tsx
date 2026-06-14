"use client"
import { signIn, signUp } from '@/utils/auth-client'
import { useState } from 'react'
import { useRouter } from "next/navigation";

const Page = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const router = useRouter()

    const handleSignup = async (e: any) => {
        e.preventDefault()

        if (!name.trim() || !email.trim() || !password.trim()) {
            alert("All fields are required!")
            return
        }

        console.log({
            name,
            email,
            password
        });

        const res = await signUp.email({
            name,
            email,
            password
        })

        setName('')
        setEmail('')
        setPassword('')

        console.log(res)
    }

    const handleSignIn = async (e: any) => {
        e.preventDefault()

        if (!email.trim() || !password.trim()) {
            alert("All fields are required!")
            return
        }

        console.log({
            email,
            password
        });

        const res = await signIn.email({
            email,
            password
        })

        if (res.error) {
            console.error(res.error)
            alert(res.error.message)
            return
        }

        setEmail('')
        setPassword('')

        console.log(res)
        router.push('/dashboard')
    }

    return (
        <div>
            <input type="text" placeholder='name' value={name} onChange={(e) => setName(e.target.value)} />
            <input type="text" placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="text" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />

            <button onClick={(e) => handleSignup(e)} >signup</button>

            <br></br>
            <br></br>
            <input type="text" placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="text" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className='mx-4' onClick={(e) => handleSignIn(e)} >signin</button>
            


        </div>
    )
}

export default Page
