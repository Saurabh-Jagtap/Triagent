"use client"
import { AuthCard, AuthLayout } from '@/components/auth'
import SignupForm from '@/components/auth/forms/SignupForm'

const SignUpPage = () => {
    return (
        <AuthLayout>
            <AuthCard size="2xl">
                <SignupForm />
            </AuthCard>
        </AuthLayout>
    )
}

export default SignUpPage