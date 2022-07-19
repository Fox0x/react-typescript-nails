import { FirebaseError } from "firebase/app"
import { notification } from 'antd';
import type { NotificationPlacement } from "antd/lib/notification";



const openNotification = (message: string, description: string, placement: NotificationPlacement) => {
    notification['error']({
        message,
        description,
        placement,
    });
}

export const getErrorMessage = (error: FirebaseError) => {
    switch (error.code) {

        case 'auth/user-disabled':
            return (
                openNotification('User Disabled', 'Your account has been disabled. Please contact support', 'bottomLeft')
            )

        case 'auth/operation-not-allowed':
            return (
                openNotification('Operation Not Allowed', 'This operation is not allowed. Please contact support', 'bottomLeft')
            )

        case 'auth/missing-phone-number':
            return (
                openNotification('Missing Phone Number', 'Please provide a phone number', 'bottomLeft')
            )

        case 'auth/invalid-phone-number': 
            return (
                openNotification('Invalid Phone Number', 'Please provide a valid phone number', 'bottomLeft')
            )

        case 'auth/too-many-requests':
            return (
                openNotification('Too Many Requests', 'Too many requests. Please try again later', 'bottomLeft')
            )

        case 'auth/invalid-verification-code':
            return (
                openNotification('Invalid Verification Code', 'Please provide a valid verification code', 'bottomLeft')
            )
    }
}