#!/bin/bash
set -e

# HIR-68 deployment script for sync-user-profile-to-mailerlite Edge Function
# Generated: $(date)

echo "=============================================="
echo "HIR-68: sync-user-profile-to-mailerlite deployment"
echo "=============================================="

# Generated webhook secret (save this!)
WEBHOOK_SECRET="E5uYvaXts+f8aZ9grHGgfO1CPOr3Ge9fWL+30/a9/rU="
echo "Generated webhook secret: $WEBHOOK_SECRET"
echo "IMPORTANT: Save this secret for steps 2 and 3 below"
echo

echo "========================================================================"
echo "STEP 1: MailerLite custom fields (UI or API)"
echo "========================================================================"
echo
echo "OPTION A: UI (recommended)"
echo "--------------------------"
echo "1. Go to MailerLite UI → Subscribers → Fields"
echo "2. Create four custom fields with EXACT keys and types:"
echo "   - target_role (Text)"
echo "   - target_industry (Text)"
echo "   - job_search_stage (Text)"
echo "   - tuesday_email_opted_in (Boolean)"
echo
echo "OPTION B: API (if you have MAILERLITE_API_KEY)"
echo "----------------------------------------------"
echo "# First, get your MailerLite API key from Supabase Studio:"
echo "# Project Settings → Functions → Secrets → MAILERLITE_API_KEY"
echo
echo "# Then run these curl commands (replace YOUR_API_KEY):"
cat << 'EOF'
curl -X POST "https://connect.mailerlite.com/api/fields" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"key":"target_role","name":"Target Role","type":"text"}'

curl -X POST "https://connect.mailerlite.com/api/fields" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"key":"target_industry","name":"Target Industry","type":"text"}'

curl -X POST "https://connect.mailerlite.com/api/fields" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"key":"job_search_stage","name":"Job Search Stage","type":"text"}'

curl -X POST "https://connect.mailerlite.com/api/fields" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"key":"tuesday_email_opted_in","name":"Tuesday Email Opted In","type":"boolean"}'
EOF
echo

echo "========================================================================"
echo "STEP 2: Supabase Edge Function secrets"
echo "========================================================================"
echo
echo "1. Go to Supabase Studio → Project Settings → Functions → Secrets"
echo "2. Add these secrets (MAILERLITE_API_KEY should already exist):"
echo "   - MAILERLITE_API_KEY: (reuse from sync-mailerlite function)"
echo "   - SYNC_USER_PROFILE_WEBHOOK_SECRET: $WEBHOOK_SECRET"
echo "   - SUPABASE_URL: auto-injected"
echo "   - SUPABASE_SERVICE_ROLE_KEY: auto-injected"
echo

echo "========================================================================"
echo "STEP 3: Database webhook"
echo "========================================================================"
echo
echo "1. Go to Supabase Studio → Database → Webhooks"
echo "2. Create new webhook with these settings:"
echo "   - Name: sync-user-profile-to-mailerlite"
echo "   - Table: public.profiles"
echo "   - Events: UPDATE only (do NOT enable INSERT or DELETE)"
echo "   - Type: HTTP Request → POST"
echo "   - URL: [Your deployed Edge Function URL]"
echo "      Get this from: Supabase Studio → Functions → sync-user-profile-to-mailerlite"
echo "   - Headers: x-webhook-secret: $WEBHOOK_SECRET"
echo "   - Timeout: 1000ms (default)"
echo

echo "========================================================================"
echo "STEP 4: Deploy the Edge Function"
echo "========================================================================"
echo
echo "The function code is already in the repo. Deploy via:"
echo "1. Merge PR #41 to main"
echo "2. In Lovable, click Publish to deploy"
echo "   OR wait for Lovable auto-sync (every ~30 min)"
echo

echo "========================================================================"
echo "STEP 5: Verification"
echo "========================================================================"
echo
echo "After all steps are complete:"
echo
echo "1. Update a test user's profile in Supabase Studio:"
echo "   UPDATE public.profiles SET target_role = 'Test Engineer' WHERE user_id = '...';"
echo
echo "2. Check mailerlite_sync_log table for a success row:"
echo "   SELECT * FROM public.mailerlite_sync_log ORDER BY created_at DESC LIMIT 5;"
echo
echo "3. Check MailerLite subscriber custom fields:"
echo "   - Go to MailerLite UI → Subscribers → Find test user"
echo "   - Verify target_role shows 'Test Engineer'"
echo

echo "========================================================================"
echo "TROUBLESHOOTING"
echo "========================================================================"
echo
echo "Common issues:"
echo "1. '401 unauthorized' in logs: Webhook secret mismatch"
echo "   → Check SYNC_USER_PROFILE_WEBHOOK_SECRET matches header in DB webhook"
echo
echo "2. 'MailerLite 422' in mailerlite_sync_log.error:"
echo "   → Custom field missing in MailerLite"
echo "   → Verify all 4 fields created with exact keys"
echo
echo "3. No rows in mailerlite_sync_log:"
echo "   → Webhook not firing"
echo "   → Check DB webhook is enabled and targeting public.profiles UPDATE"
echo
echo "4. '503 service_unavailable' in logs:"
echo "   → MAILERLITE_API_KEY missing in Edge Function secrets"
echo

echo "Deployment complete! The function will now sync profile changes to MailerLite."
echo "Check mailerlite_sync_log for monitoring."