import nextAuth, { DefaultUser } from "next-auth";

declare module "next-auth" {
    interface User {
        user: {
            id: string;
            email: string;
        },
        token: string;
    }
    interface Session {
        accessToken: string;
        totalFriends: number;
        totalNotifications: number;
        listsSharedTotal: number;
        user: {
            id: string;
            email: string;
            name: string;
            image: string
        }
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        accessToken: string;
        totalNotifications: number
        totalFriends: number;
        listsSharedTotal: number;
        user: {
            id: string;
            email: string;
            name: string;
            image: string
        }
    }
}