import ProfileDetails from '@/components/profile/ProfileDetails'
import SignIn from '@/components/profile/signin'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
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