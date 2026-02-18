# GA4 Conversion Setup Guide

## Overview

This guide will walk you through setting up conversion goals in Google Analytics 4 for your Commercial Shot Blasting website. By marking key events as conversions, you can track ROI, measure campaign performance, and optimize your marketing efforts.

## Prerequisites

- Access to Google Analytics 4 account
- Admin permissions for your GA4 property
- Your GA4 Measurement ID: **G-6LC7XCLGK2**

## Events to Mark as Conversions

Your website tracks these key events that should be marked as conversions:

1. **`generate_lead`** - Quote form submissions (PRIMARY CONVERSION)
2. **`phone_call`** - Phone number clicks
3. **`email_click`** - Email address clicks
4. **`whatsapp_click`** - WhatsApp button clicks (optional)

---

## Step-by-Step Setup Instructions

### Step 1: Access Google Analytics 4

1. Go to https://analytics.google.com
2. Sign in with your Google account
3. Select your property (should show **G-6LC7XCLGK2**)

### Step 2: Navigate to Events

1. In the left sidebar, click **"Admin"** (gear icon at bottom left)
2. In the **Property** column (middle), click **"Events"**
3. You'll see a list of all events being tracked on your website

**Note:** It may take 24-48 hours after implementation for events to appear in this list. Check the "Realtime" report to see if events are firing immediately.

### Step 3: Mark Events as Conversions

For each event listed below, follow these steps:

#### 1. Mark `generate_lead` as Conversion (PRIORITY)

1. Find **`generate_lead`** in the events list
2. Toggle the **"Mark as conversion"** switch to **ON** (it will turn blue)
3. A confirmation message will appear

**Why this matters:** This tracks quote form submissions - your primary lead generation goal.

#### 2. Mark `phone_call` as Conversion

1. Find **`phone_call`** in the events list
2. Toggle the **"Mark as conversion"** switch to **ON**

**Why this matters:** Tracks when users click your phone number to call you directly.

#### 3. Mark `email_click` as Conversion

1. Find **`email_click`** in the events list
2. Toggle the **"Mark as conversion"** switch to **ON**

**Why this matters:** Tracks when users click your email address to contact you.

#### 4. Mark `whatsapp_click` as Conversion (Optional)

1. Find **`whatsapp_click`** in the events list
2. Toggle the **"Mark as conversion"** switch to **ON**

**Why this matters:** Tracks WhatsApp button clicks on mobile devices.

### Step 4: Verify Conversions Are Tracking

1. In the left sidebar, click **"Reports"**
2. Navigate to **"Engagement" → "Conversions"**
3. You should see your marked events listed with conversion counts

**Note:** Data may take 24-48 hours to populate in reports. Use "Realtime" reports to see immediate activity.

---

## Viewing Conversion Data

### Real-Time Conversions

1. Go to **Reports → Realtime**
2. Scroll down to **"Event count by Event name"**
3. You'll see conversions as they happen in real-time
4. Test by clicking phone numbers or submitting a quote form

### Conversion Reports

1. Go to **Reports → Engagement → Conversions**
2. View conversion counts and trends over time
3. Click on any conversion to see detailed metrics:
   - Conversion rate
   - Total conversions
   - Revenue (if configured)

### Attribution Reports

1. Go to **Reports → Advertising → Attribution**
2. See which marketing channels drive the most conversions
3. Compare first-touch vs last-touch attribution

---

## Setting Up Conversion Values (Optional but Recommended)

Assign monetary values to conversions to track ROI:

### Method 1: Default Event Value

1. Go to **Admin → Events**
2. Click **"Create event"** (top right)
3. Click **"Modify event"** for an existing conversion
4. Add parameter: `value` with a number (e.g., 50 for £50)
5. Save the modification

### Method 2: Enhanced Conversions (Advanced)

For more accurate tracking, implement server-side conversion tracking with customer data (email, phone, address). This requires technical implementation.

---

## Creating Custom Conversions

You can create custom conversions based on specific parameters:

### Example: Track Conversions from Specific Locations

1. Go to **Admin → Events**
2. Click **"Create event"** (top right)
3. Enter event name: `county_page_phone_call`
4. Add matching condition:
   - Parameter: `click_location`
   - Operator: `contains`
   - Value: `County Page`
5. Copy parameters from: `phone_call`
6. Click **"Create"**
7. Mark the new event as a conversion

### Example: Track Conversions from Paid Campaigns

1. Create event: `paid_lead`
2. Matching conditions:
   - Event name: `generate_lead`
   - Parameter: `utm_medium` equals `cpc`
3. Mark as conversion

---

## Setting Up Conversion Goals & Funnels

### Create a Funnel Exploration

1. Go to **Explore** in the left sidebar
2. Click **"Blank"** to create new exploration
3. Select **"Funnel exploration"** template
4. Configure funnel steps:
   - **Step 1:** Page view (landing page)
   - **Step 2:** `phone_call` OR `email_click` (contact attempt)
   - **Step 3:** `generate_lead` (quote submission)
5. Click **"Apply"** to see the funnel visualization

This shows you:
- Where users drop off in the conversion process
- Conversion rate at each step
- Opportunities for optimization

---

## Monitoring & Alerts

### Set Up Conversion Alerts

1. Go to **Admin → Custom Alerts** (under Property)
2. Click **"Create custom alert"**
3. Configure alert:
   - Name: "Drop in Quote Submissions"
   - Apply to: All website data
   - Alert conditions: Conversions (`generate_lead`) decreases by more than 50%
   - Period: Day
4. Add your email address
5. Click **"Save"**

### Weekly Monitoring Checklist

- [ ] Check total conversions week-over-week
- [ ] Review conversion rate by page
- [ ] Analyze which UTM campaigns drive most conversions
- [ ] Identify top-performing location pages
- [ ] Compare phone vs email vs form conversions

---

## Troubleshooting

### Events Not Appearing in GA4

**Problem:** Events don't show up in the Events list

**Solutions:**
1. Wait 24-48 hours - GA4 has a processing delay
2. Check "Realtime" reports to verify events are firing
3. Verify GA4 measurement ID is correct: `G-6LC7XCLGK2`
4. Check browser console for JavaScript errors
5. Verify GA4 script is loading (Network tab in DevTools)

### Conversions Not Tracking

**Problem:** Events appear but conversions show zero

**Solutions:**
1. Verify you toggled "Mark as conversion" to ON
2. Wait 24-48 hours for data to process
3. Test by triggering the event yourself (click phone, submit form)
4. Check "Realtime" → "Conversions" to see immediate results

### Duplicate Conversions

**Problem:** Same user action creates multiple conversion events

**Solutions:**
1. Check that event handlers aren't duplicated in code
2. Verify `onClick` handlers fire only once
3. Review browser console for multiple gtag() calls
4. Contact support if issue persists

---

## Best Practices

### 1. Prioritize Primary Conversions

- **`generate_lead`** is your primary conversion - monitor it daily
- Phone and email clicks are secondary - they indicate interest but not commitment

### 2. Use UTM Parameters Consistently

All marketing campaigns should include UTM parameters:
```
https://commercialshotblasting.co.uk/?utm_source=google&utm_medium=cpc&utm_campaign=shot-blasting-uk
```

This allows you to track which campaigns drive conversions.

### 3. Set Up Regular Reports

Create custom reports in "Explore" to monitor:
- Conversion rate by location page
- ROI by UTM campaign
- Geographic conversion patterns
- Time-of-day conversion trends

### 4. A/B Test CTAs

Compare conversion rates for:
- Different button placements
- Different button text ("Get Quote" vs "Free Quote")
- Different page layouts

### 5. Review Monthly

- Analyze conversion trends
- Identify top-performing pages
- Optimize low-performing pages
- Adjust marketing spend based on ROI

---

## Quick Reference

### Your GA4 Setup

- **Property ID:** G-6LC7XCLGK2
- **Primary Conversion:** `generate_lead` (quote submissions)
- **Secondary Conversions:** `phone_call`, `email_click`, `whatsapp_click`
- **UTM Tracking:** Enabled (automatic)
- **Attribution:** First-touch and last-touch

### Key Metrics to Monitor

1. **Conversion Rate:** (Conversions / Sessions) × 100
2. **Cost Per Conversion:** Ad Spend / Total Conversions
3. **Conversion Value:** Total Revenue / Total Conversions
4. **Top Converting Pages:** Which location pages drive most leads

### Useful GA4 Reports

- **Realtime → Conversions:** See conversions as they happen
- **Engagement → Conversions:** View conversion trends over time
- **Advertising → Attribution:** See which channels drive conversions
- **Explore → Funnel:** Analyze user journey to conversion

---

## Support Resources

- **GA4 Help Center:** https://support.google.com/analytics
- **GA4 Community:** https://support.google.com/analytics/community
- **Google Analytics Academy:** https://analytics.google.com/analytics/academy/
- **Implementation Documentation:** See `GA4_CONVERSION_TRACKING.md` in project root

---

## Next Steps After Setup

1. ✅ Mark all 4 events as conversions in GA4
2. ✅ Set up conversion alert for quote submissions
3. ✅ Create funnel exploration to track user journey
4. ✅ Set up weekly conversion report email
5. ✅ Add UTM parameters to all marketing campaigns
6. ✅ Review conversion data after 7 days
7. ✅ Optimize low-performing pages based on data

---

**Need Help?** If you encounter any issues setting up conversions, refer to the GA4 Help Center or contact Google Analytics support directly through your GA4 account.
