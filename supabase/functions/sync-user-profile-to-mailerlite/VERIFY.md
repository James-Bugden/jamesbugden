// Quick verification script for sync-user-profile-to-mailerlite deployment
// Run after deployment to verify setup

console.log('HIR-68 Deployment Verification Checklist\n');

const steps = [
  {
    name: '1. MailerLite Custom Fields',
    check: 'Manual: Log into MailerLite UI → Subscribers → Fields',
    required: ['target_role (Text)', 'target_industry (Text)', 'job_search_stage (Text)', 'tuesday_email_opted_in (Boolean)'],
    notes: 'All four must exist with exact keys'
  },
  {
    name: '2. Edge Function Secrets',
    check: 'Supabase Studio → Project Settings → Functions → Secrets',
    required: ['MAILERLITE_API_KEY (exists)', 'SYNC_USER_PROFILE_WEBHOOK_SECRET (new)', 'SUPABASE_URL (auto)', 'SUPABASE_SERVICE_ROLE_KEY (auto)'],
    notes: 'SYNC_USER_PROFILE_WEBHOOK_SECRET = E5uYvaXts+f8aZ9grHGgfO1CPOr3Ge9fWL+30/a9/rU='
  },
  {
    name: '3. Database Webhook',
    check: 'Supabase Studio → Database → Webhooks',
    required: ['Name: sync-user-profile-to-mailerlite', 'Table: public.profiles', 'Events: UPDATE only', 'Header: x-webhook-secret: <secret from step 2>'],
    notes: 'Do NOT enable INSERT or DELETE events'
  },
  {
    name: '4. Function Deployment',
    check: 'Supabase Studio → Functions',
    required: ['sync-user-profile-to-mailerlite shows as deployed'],
    notes: 'Deploys via Lovable Publish after PR merge'
  }
];

steps.forEach(step => {
  console.log(`\n${step.name}`);
  console.log(`Check: ${step.check}`);
  console.log('Required:');
  step.required.forEach(req => console.log(`  • ${req}`));
  if (step.notes) console.log(`Notes: ${step.notes}`);
});

console.log('\n\nVerification Test:');
console.log('1. Update a test user profile in Supabase Studio:');
console.log('   UPDATE public.profiles SET target_role = \'Test Value\' WHERE user_id = \'test-user-id\';');
console.log('\n2. Check sync log:');
console.log('   SELECT * FROM public.mailerlite_sync_log ORDER BY created_at DESC LIMIT 5;');
console.log('\n3. Look for:');
console.log('   • status = "success"');
console.log('   • fields_synced includes target_role: "Test Value"');
console.log('\n4. Verify in MailerLite:');
console.log('   Subscriber → test user → Custom fields shows updated value');

console.log('\n\nTroubleshooting:');
console.log('• No log rows: Webhook not firing (check step 3)');
console.log('• status = "failed": Check error column in mailerlite_sync_log');
console.log('• MailerLite 422 error: Custom fields missing (step 1)');
console.log('• 401 error: Webhook secret mismatch (steps 2-3)');