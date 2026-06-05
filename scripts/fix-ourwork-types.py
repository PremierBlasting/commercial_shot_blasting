"""Fix missing beforeImage/afterImage fields in OurWork.tsx galleryItems."""
with open('client/src/pages/OurWork.tsx', 'r') as f:
    content = f.read()

# Fix item 15 (Steel Sheeting) - video only, no before/after images
old1 = '    video: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663300283832/ZRFzUipVNoPynrdt.mp4",\n    location: "West Midlands",'
new1 = '    video: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663300283832/ZRFzUipVNoPynrdt.mp4",\n    beforeImage: "",\n    afterImage: "",\n    location: "West Midlands",'
content = content.replace(old1, new1)

# Fix item 10 (Complete Chassis Restoration) - after only, no before
old2 = '    after: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/dAQXgKdkBiPdcYhw.webp",\n    location: "Nottinghamshire",'
new2 = '    before: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/dAQXgKdkBiPdcYhw.webp",\n    beforeImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/dAQXgKdkBiPdcYhw.webp",\n    after: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/dAQXgKdkBiPdcYhw.webp",\n    afterImage: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663301568782/dAQXgKdkBiPdcYhw.webp",\n    location: "Nottinghamshire",'
content = content.replace(old2, new2)

# Fix WhatsApp video item - video only, no before/after images
old3 = '    video: "/manus-storage/WhatsAppVideo2026-04-27at09.27.29(1)_3886b1d3.mp4",\n    location: "North West England",'
new3 = '    video: "/manus-storage/WhatsAppVideo2026-04-27at09.27.29(1)_3886b1d3.mp4",\n    beforeImage: "",\n    afterImage: "",\n    location: "North West England",'
content = content.replace(old3, new3)

with open('client/src/pages/OurWork.tsx', 'w') as f:
    f.write(content)

print("Done - fixed all missing beforeImage/afterImage fields")
