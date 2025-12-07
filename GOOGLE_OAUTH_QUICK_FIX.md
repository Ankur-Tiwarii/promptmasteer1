# Quick Fix: Google Sign-In Error

## Error Message
```
"Unsupported provider: provider is not enabled"
```

## Solution (2 Minutes)

### Step 1: Enable Google Provider in Supabase

1. Go to: https://supabase.com/dashboard
2. Select your project
3. Click **Authentication** (left sidebar)
4. Click **Providers** (under Authentication)
5. Find **Google** in the list
6. Toggle it **ON** or click **Enable**

### Step 2: Get Google OAuth Credentials (Optional - if not already done)

If you need to create Google OAuth credentials:

1. Go to: https://console.cloud.google.com/apis/credentials
2. Click **Create Credentials** > **OAuth client ID**
3. Choose **Web application**
4. Add redirect URI: `https://pegkaifosoltghnncgao.supabase.co/auth/v1/callback`
5. Copy **Client ID** and **Client Secret**
6. Paste them in Supabase Google provider settings

### Step 3: Add Redirect URL (If needed)

1. In Supabase: **Authentication** > **URL Configuration**
2. Add redirect URL: `http://localhost:8080/auth/callback`

### Alternative: Disable Google Sign-In Button

If you don't want to set up Google OAuth, you can temporarily hide the Google sign-in button or just use email/password authentication.

## That's It!

After enabling Google provider in Supabase, the Google sign-in button will work immediately.

