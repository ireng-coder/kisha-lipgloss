import re

def clean_text(text):
    # Remove long strings of numbers (ID numbers)
    text = re.sub(r'\d{10,}', '', text)
    # Remove "Multimedia" or "Comp" technical tags
    text = re.sub(r'multimedia|comp|id:|#', '', text, flags=re.IGNORECASE)
    return text.strip()

def analyze_sentiment(text):
    text = text.lower()
    if any(word in text for word in ["vip", "book", "table", "sponsor"]):
        return "🔥 HIGH PRIORITY (Hot Lead)"
    elif any(word in text for word in ["stop", "remove", "not interested"]):
        return "⚠️ NEGATIVE (Opt-Out)"
    else:
        return "📋 NEUTRAL (Standard Inquiry)"

print("--- SIMBA AI: EXECUTIVE DASHBOARD ---")
processed_guests = set()

try:
    with open('/home/ireng/simba_replies.txt', 'r') as f:
        for line in f:
            if ":" in line:
                name, raw_msg = line.split(":", 1)
                name = name.strip()
                if name not in processed_guests:
                    # Clean the message before showing it to the Directors
                    display_msg = clean_text(raw_msg)
                    label = analyze_sentiment(display_msg)
                    
                    print(f"\nGUEST: {name}")
                    print(f"MESSAGE: \"{display_msg}\"")
                    print(f"STATUS: {label}")
                    processed_guests.add(name)
except FileNotFoundError:
    print("\n[!] Inbox empty. System standing by...")

print("\n--- END OF LIVE FEED ---")
