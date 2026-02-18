# GA4 Conversion Tracking Documentation

## Overview

Google Analytics 4 conversion tracking has been fully implemented across the website to monitor key user interactions and measure ROI. All events automatically include UTM attribution data for campaign tracking.

## Tracked Events

### 1. Quote Form Submissions (`generate_lead`)
**Trigger:** When users submit the HubSpot quote form  
**Location:** All pages with quote popup/form  
**Event Parameters:**
- `event_category`: "Lead"
- `event_label`: "Quote Form Submitted"
- `currency`: "GBP"
- UTM parameters (source, medium, campaign, etc.)

**Implementation:** `client/src/components/HubSpotForm.tsx`

### 2. Phone Clicks (`phone_call`)
**Trigger:** When users click any phone number link  
**Locations:**
- Header (desktop navigation)
- Mobile header
- Floating call button (mobile)
- Footer
- County pages (hero, CTA sections)
- Location pages (hero, bottom CTA)
- Service area pages
- About page
- Industry pages (Aerospace, etc.)
- Nearby towns sections
- Service areas map

**Event Parameters:**
- `event_category`: "Contact"
- `event_label`: Phone number (07970566409)
- `phone_number`: "07970566409"
- `click_location`: Specific location (e.g., "Header", "Footer", "County Page")
- UTM parameters

**Implementation:** Multiple components with `trackPhoneCall()` function

### 3. Email Clicks (`email_click`)
**Trigger:** When users click email links  
**Location:** Footer  
**Event Parameters:**
- `event_category`: "Contact"
- `event_label`: "Footer Email"
- `email`: "info@commercialshotblasting.co.uk"
- UTM parameters

**Implementation:** `client/src/components/Footer.tsx`

### 4. WhatsApp Clicks (`whatsapp_click`)
**Trigger:** When users click WhatsApp button  
**Location:** Floating button (mobile)  
**Event Parameters:**
- `event_category`: "Contact"
- `event_label`: "WhatsApp Button"
- `click_location`: "Floating Button"
- UTM parameters

**Implementation:** `client/src/components/FloatingCallButton.tsx`

## UTM Attribution

All tracked events automatically include UTM parameters when available:

**Last-Touch Attribution:**
- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_term`
- `utm_content`

**First-Touch Attribution:**
- `first_touch_source`
- `first_touch_medium`
- `first_touch_campaign`

**Additional Tracking:**
- `gclid` (Google Ads)
- `fbclid` (Facebook Ads)
- `msclkid` (Microsoft Ads)
- `landing_page`
- `referrer`

## Setting Up Conversions in GA4

### Step 1: Access GA4 Admin
1. Go to https://analytics.google.com
2. Select your property (G-6LC7XCLGK2)
3. Click "Admin" (gear icon)

### Step 2: Mark Events as Conversions
1. In the Admin panel, click "Events" under Property
2. Find these events and toggle "Mark as conversion":
   - `generate_lead` (Quote submissions) - **Primary conversion**
   - `phone_call` (Phone clicks)
   - `email_click` (Email clicks)
   - `whatsapp_click` (WhatsApp clicks)

### Step 3: Create Custom Conversions (Optional)
You can create custom conversions based on specific parameters:

**Example: Track conversions from specific locations**
- Event name: `phone_call`
- Parameter: `click_location` equals "County Page"

**Example: Track conversions from paid campaigns**
- Event name: `generate_lead`
- Parameter: `utm_medium` equals "cpc"

### Step 4: Set Up Goals & Funnels
1. Go to "Explore" in GA4
2. Create funnel exploration to track user journey:
   - Step 1: Page view (landing page)
   - Step 2: `phone_call` OR `email_click`
   - Step 3: `generate_lead` (quote submission)

## Monitoring & Reporting

### Real-Time Events
1. Go to GA4 → Reports → Realtime
2. View events as they happen
3. Test tracking by clicking phone/email links

### Conversion Reports
1. Go to GA4 → Reports → Engagement → Conversions
2. View conversion counts and trends
3. Compare conversion rates across pages

### Attribution Reports
1. Go to GA4 → Advertising → Attribution
2. View which campaigns drive conversions
3. Compare first-touch vs last-touch attribution

### Custom Reports
Create custom reports in "Explore" to analyze:
- Conversion rate by location page
- Phone vs email vs form conversions
- UTM campaign performance
- Geographic conversion patterns

## Event Testing

Run the test suite to verify tracking implementation:

```bash
pnpm test server/ga4-conversion-tracking.test.ts
```

All 6 tests should pass, verifying:
- Tracking functions are available
- Phone calls tracked correctly
- Email clicks tracked correctly
- Form submissions tracked correctly
- Quote submissions tracked as leads
- No errors without UTM data

## Troubleshooting

### Events Not Appearing in GA4
1. Check GA4 measurement ID is correct: `G-6LC7XCLGK2`
2. Wait 24-48 hours for data to appear in reports (real-time shows immediately)
3. Check browser console for JavaScript errors
4. Verify GA4 script is loading (check Network tab)

### Duplicate Events
- Each click should only fire one event
- Check that `onClick` handlers aren't duplicated
- Verify event listeners are properly cleaned up

### Missing UTM Parameters
- UTM data is stored in localStorage on first visit
- Check that `client/src/lib/utm.ts` is working correctly
- UTM parameters are optional - events fire without them

## Best Practices

1. **Monitor Conversion Rates Weekly:** Check which pages drive the most conversions
2. **A/B Test CTAs:** Compare conversion rates for different button placements
3. **Track Campaign ROI:** Use UTM parameters for all marketing campaigns
4. **Set Up Alerts:** Create GA4 alerts for sudden drops in conversions
5. **Regular Audits:** Test tracking quarterly to ensure it's working correctly

## Support

For GA4 configuration help:
- Google Analytics Help: https://support.google.com/analytics
- GA4 Community: https://support.google.com/analytics/community

For implementation questions, refer to:
- `client/src/lib/analytics.ts` - Main tracking functions
- `client/src/lib/utm.ts` - UTM attribution logic
- Component files listed above for specific implementations
