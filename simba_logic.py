def generate_reply(message):
    message = message.lower()
    if "vip" in message:
        return "Thank you for your interest! A Simba manager will contact you in 5 minutes to confirm your VIP table."
    elif "price" in message or "how much" in message:
        return "Our standard tickets are 100k UGX. Would you like the payment link?"
    else:
        return "Thank you for reaching out! A member of our team will assist you shortly."

# Test the logic with your message
test_msg = "Yes, I want to book a VIP table for 5 people. How much?"
print(f"CUSTOMER: {test_msg}")
print(f"AI REPLY: {generate_reply(test_msg)}")
