import { NextResponse } from 'next/server';
import admin from 'firebase-admin'; // Import Firebase Admin SDK

// Initialize Firebase Admin SDK if not already done (typically in a separate file)
if (!admin.apps.length) {
    const serviceAccount = require('./fhb-deal-analyser-firebase-adminsdk-85699-6ca3fa1818.json'); // Replace with your service account path
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

export default async function middleware(request) {
    const pathname = request.nextUrl.pathname;
    
    // Exclude routes that shouldn't require authentication (e.g., sign-in)
    if (pathname.startsWith('/sign-in')) {
        return NextResponse.next(); 
    }

    const token = request.cookies.get('firebase-auth-token')?.value;

    if (!token) {
        return NextResponse.redirect(new URL('/sign-in', request.url));
    }

    try {
        await admin.auth().verifyIdToken(token);
        return NextResponse.next();
    } catch (error) {
        console.error('Error verifying token:', error);
        return NextResponse.redirect(new URL('/sign-in', request.url));
    }
}
