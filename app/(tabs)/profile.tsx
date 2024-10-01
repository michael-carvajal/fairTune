import ProfileDetails from '@/components/profile/ProfileDetails'
import SignIn from '@/components/profile/signin'
import { useAuth } from '@/providers/SuperbaseProvider'
import React from 'react'

function profile() {
    const { session } = useAuth()
    return (
        <>
            {!session ? <SignIn /> : <ProfileDetails />}
        </>
    )
}

export default profile