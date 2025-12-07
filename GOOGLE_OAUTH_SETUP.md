# Google OAuth Setup Instructions

## Error: "Unsupported provider: provider is not enabled"

This error occurs because Google OAuth provider is not enabled in your Supabase project.

## Quick Fix Steps:

### 1. Enable Google Provider in Supabase Dashboard

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Navigate to: **Authentication** > **Providers**
4. Find **Google** in the list
5. Click **Enable** or toggle it **ON**
6. You'll need to provide:
   - **Google OAuth Client ID**
   - **Google OAuth Client Secret**

### 2. Get Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable **Google+ API**
4. Go to **Credentials** > **Create Credentials** > **OAuth client ID**
5. Choose **Web application**
6. Add **Authorized redirect URIs**:
   - For local dev: `http://localhost:8080/auth/callback`
   - For production: `https://yourdomain.com/auth/callback`
   - Supabase URL: `https://YOUR_PROJECT_ID.supabase.co/auth/v1/callback`
7. Copy the **Client ID** and **Client Secret**

### 3. Configure in Supabase

1. Paste your **Client ID** and **Client Secret** in Supabase
2. Save the settings

### 4. Add Redirect URLs in Supabase

1. In Supabase Dashboard: **Authentication** > **URL Configuration**
2. Add to **Redirect URLs**:
   - `http://localhost:8080/auth/callback` (for local)
   - `https://yourdomain.com/auth/callback` (for production)

## Alternative: Use Email/Password Sign-In

If you don't want to set up Google OAuth right now, you can use the email/password sign-in option on the auth page.

