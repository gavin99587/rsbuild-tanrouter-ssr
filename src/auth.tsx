import * as React from 'react'

// import { sleep } from './utils'

export interface AuthContext {
    isAuthenticated: boolean
    login: (username: string) => Promise<void>
    logout: () => Promise<void>
    user: string | null
}

const AuthContext = React.createContext<AuthContext | null>(null)

const key = 'tanstack.auth.user'

function getStoredUser() {
    if (typeof window !== 'undefined') {
        if (localStorage) {
            const val= localStorage.getItem(key);
            console.log('getStoredUser()-', val)
            return val;
        }
    }
    return null;
}

function setStoredUser(user: string | null) {
    if (typeof window !== 'undefined') {
        if (localStorage) {
            if (user) {
                localStorage.setItem(key, user)
            } else {
                localStorage.removeItem(key)
            }
        }
    }
}

export function AuthProvider({children}: { children: React.ReactNode }) {
    const [user, setUser] = React.useState<string | null>(getStoredUser())
    const isAuthenticated = !!user

    const logout = React.useCallback(async () => {
        // await sleep(250)

        setStoredUser(null)
        setUser(null)
    }, [])

    const login = React.useCallback(async (username: string) => {
        // await sleep(500)

        setStoredUser(username)
        setUser(username)
    }, [])

    React.useEffect(() => {
        setUser(getStoredUser())
    }, [])

    return (
        <AuthContext.Provider value={{isAuthenticated, user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = React.useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
