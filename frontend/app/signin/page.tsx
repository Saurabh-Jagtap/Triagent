"use client"
import { AuthCard, AuthLayout } from '@/components/auth'
import SigninForm from '@/components/auth/forms/SigninForm'

const SignInPage = () => {
    return (
        <AuthLayout>
            <AuthCard>
                <SigninForm />
            </AuthCard>
        </AuthLayout>
    )
}

export default SignInPage