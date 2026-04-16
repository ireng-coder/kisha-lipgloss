import time
import random
import os
import re
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager

# Templates
templates = [
    "Hello {name}! Hope your week is going well. You’re warmly invited to the Throne tonight for Wahala Wednesday. See you there! 🥂",
    "Good evening {name}! We’re hosting a special session at the Throne tonight for Wahala Wednesday. It would be great to have you join us. ✨",
    "Hi {name}! Just a polite reminder that Wahala Wednesday is live at the Throne tonight. You’re on our guest list! 🦁",
    "Greetings {name}! We are officially open at the Throne for Wahala Wednesday. Looking forward to a great night with you. 🌙",
    "Hello {name}! Wishing you a great evening. Join us at the Throne tonight for the Wahala Wednesday experience. 🚀"
]

def load_and_filter_guests():
    filtered_list = []
    file_path = os.path.expanduser('~/all_guests.vcf')
    keywords = ["throne", "wahala", "wednesday", "simba", "vip", "lady", "che"]
    try:
        with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
            cards = content.split("BEGIN:VCARD")
            for card in cards:
                if not card.strip(): continue
                name_match = re.search(r"FN:(.*)", card)
                phone_match = re.search(r"TEL;.*:(.*)", card)
                if name_match and phone_match:
                    raw_name = name_match.group(1).strip()
                    phone = re.sub(r'\D', '', phone_match.group(1)) 
                    if any(key in raw_name.lower() for key in keywords):
                        clean_name = raw_name
                        for key in keywords:
                            clean_name = re.compile(re.escape(key), re.IGNORECASE).sub("", clean_name)
                        clean_name = re.sub(r'\bs\b', '', clean_name).replace("_", " ").replace("-", " ").strip()
                        clean_name = clean_name.split()[0] if clean_name.split() else "Friend"
                        if phone.startswith("0"): phone = "256" + phone[1:]
                        filtered_list.append((clean_name, phone))
        random.shuffle(filtered_list)
        return filtered_list[:50]
    except Exception: return []

def start_throne_invites():
    selected_guests = load_and_filter_guests()
    if not selected_guests: return

    chrome_options = Options()
    # Path to your saved session
    chrome_options.add_argument(f"--user-data-dir=/home/ireng/Simba_Session")
    chrome_options.add_argument("--profile-directory=Default")
    
    # Chromebook Stability Flags
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--window-size=1280,800")
    chrome_options.add_argument("--remote-debugging-port=9222")

    try:
        driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)
        wait = WebDriverWait(driver, 60)
        actions = ActionChains(driver)

        print(f"🦁 CLEAN START: Processing {len(selected_guests)} guests...")
        driver.get("https://web.whatsapp.com")
        input("⚠️ SCAN QR AND PRESS ENTER ONCE WHATSAPP IS READY...")

        count = 0
        for name, phone in selected_guests:
            try:
                msg_template = random.choice(templates)
                final_msg = msg_template.format(name=name)
                
                print(f"📡 {count+1}/50: Loading {name} ({phone})...")
                driver.get(f"https://web.whatsapp.com/send?phone={phone}")
                
                box_xpath = '//div[@contenteditable="true"][@data-tab="10"]'
                msg_box = wait.until(EC.element_to_be_clickable((By.XPATH, box_xpath)))
                
                time.sleep(4)
                actions.move_to_element(msg_box).click().perform()
                msg_box.send_keys(final_msg)
                time.sleep(5) 
                msg_box.send_keys(Keys.ENTER)
                time.sleep(2)
                
                print(f"✅ SENT to {name}!")
                count += 1
                time.sleep(random.randint(60, 140))

            except Exception:
                print(f"⚠️ {name} skipped. Refreshing...")
                driver.refresh()
                time.sleep(5)
                continue

    except Exception as e:
        print(f"❌ Critical Error: {e}")
    finally:
        if 'driver' in locals():
            driver.quit()

if __name__ == "__main__":
    start_throne_invites()
