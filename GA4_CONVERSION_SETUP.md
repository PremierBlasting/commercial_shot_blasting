# Google Analytics 4 Conversion Setup Guide

This guide explains how to set up conversions (goals) in Google Analytics 4 for the contact tracking events on your Commercial Shot Blasting website.

## Tracked Events

Your website currently tracks two key contact events:

### 1. `call_button_click`
Fired when a user clicks the floating "Call Now" button on mobile.

**Event Parameters:**
- `event_category`: "Contact"
- `event_label`: "Floating Call Button"
- `phone_number`: "07721375756"
- `click_location`: Current page path

### 2. `whatsapp_button_click`
Fired when a user clicks the "Chat on WhatsApp" button in the WhatsApp widget popup.

**Event Parameters:**
- `event_category`: "Contact"
- `event_label`: "WhatsApp Chat Button"
- `phone_number`: "447721375756"
- `click_location`: Current page path

---

## Setting Up Conversions in GA4

### Step 1: Access GA4 Admin Panel

1. Log in to [Google Analytics](https://analytics.google.com/)
2. Select your **Commercial Shot Blasting** property
3. Click the **Admin** gear icon (bottom left)

### Step 2: Create Conversion for Call Button Clicks

1. In the **Admin** panel, under the **Property** column, click **Events**
2. Wait for the `call_button_click` event to appear in the list (it may take 24-48 hours after the first click)
3. Once visible, toggle the **Mark as conversion** switch next to `call_button_click`
4. The event is now tracked as a conversion

**Alternative Method (if event hasn't appeared yet):**

1. In **Admin** → **Property** column, click **Conversions**
2. Click **New conversion event**
3. Enter `call_button_click` as the event name
4. Click **Save**

### Step 3: Create Conversion for WhatsApp Button Clicks

Repeat the same process for the `whatsapp_button_click` event:

1. Go to **Admin** → **Events** (or **Conversions**)
2. Mark `whatsapp_button_click` as a conversion
3. Click **Save**

### Step 4: Verify Conversions Are Tracking

1. Go to **Reports** → **Engagement** → **Conversions**
2. You should see both `call_button_click` and `whatsapp_button_click` listed
3. Click each conversion to see detailed metrics:
   - Number of conversions
   - Conversion rate
   - Pages where conversions happen
   - Traffic sources driving conversions

---

## Using Conversion Data

### View Conversion Reports

**Real-time Conversions:**
- Go to **Reports** → **Realtime** → Click on an event to see live conversions

**Historical Conversions:**
- Go to **Reports** → **Engagement** → **Conversions**
- Filter by date range to analyze trends

**Conversion by Page:**
- Go to **Reports** → **Engagement** → **Pages and screens**
- Add a secondary dimension: **Event name**
- Filter to show only `call_button_click` or `whatsapp_button_click`

### Set Up Custom Reports

1. Go to **Explore** (left sidebar)
2. Click **Blank** to create a new exploration
3. Add dimensions:
   - Page path
   - Event name
   - Traffic source/medium
4. Add metrics:
   - Event count
   - Conversions
5. Drag and drop to build custom tables and charts

### Track Conversion Value (Optional)

If you want to assign a monetary value to each contact:

1. Go to **Admin** → **Events**
2. Click **Create event** (not "Mark as conversion")
3. Create a modified event based on `call_button_click`:
   - Matching conditions: `event_name = call_button_click`
   - Parameter: Add `value` = `50` (example: £50 estimated value per call)
4. Repeat for `whatsapp_button_click`

---

## Recommended GA4 Setup

### Enable Enhanced Measurement

1. Go to **Admin** → **Data Streams**
2. Click your web data stream
3. Toggle on **Enhanced measurement**
4. Ensure these are enabled:
   - Page views
   - Scrolls
   - Outbound clicks
   - Site search
   - Video engagement
   - File downloads

### Link to Google Ads (if applicable)

1. Go to **Admin** → **Google Ads Links**
2. Click **Link** and follow the wizard
3. Import your conversions to Google Ads for campaign optimization

---

## Troubleshooting

### Events Not Showing Up

- **Wait 24-48 hours**: GA4 can take time to register new events
- **Check DebugView**: Go to **Admin** → **DebugView** to see events in real-time (requires Google Analytics Debugger extension)
- **Verify GA4 Measurement ID**: Check that `VITE_GA_MEASUREMENT_ID` is set correctly in your environment

### Conversions Not Counting

- Ensure you've toggled **Mark as conversion** for each event
- Check that events are firing correctly in **Reports** → **Realtime**
- Verify the event name matches exactly (`call_button_click`, not `call-button-click`)

### Duplicate Events

- If you see duplicate conversions, check that you haven't created both an event-based conversion AND a custom event with the same name

---

## Contact Funnel Analysis

To understand your full contact funnel:

1. Go to **Explore** → **Funnel exploration**
2. Create a funnel with these steps:
   - Step 1: Page view (any page)
   - Step 2: `call_button_click` OR `whatsapp_button_click`
3. Analyze drop-off rates and optimize pages with low conversion rates

---

## Summary

- **Two key conversions**: `call_button_click` and `whatsapp_button_click`
- **Setup time**: 5-10 minutes in GA4 Admin panel
- **Data availability**: 24-48 hours after first event fires
- **Use cases**: Track contact funnel, optimize high-performing pages, measure campaign ROI

For more help, visit the [Google Analytics Help Center](https://support.google.com/analytics).
