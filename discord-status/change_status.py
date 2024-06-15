import os
from pathlib import Path
import csv
import random
import requests
from notifypy import Notify


with open(os.path.join(os.getcwd(), ".config", "quotes", "discord_token.txt")) as tokenfile:
    token = tokenfile.read()

quotes = []
with open(os.path.join(os.getcwd(), ".config", "quotes", "discord_quotes.csv")) as quotesfile:
    reader = csv.reader(quotesfile)
    for row in reader: # each row is a list
        quotes.append(row)

def get_info(token): # not actually used, but leaving here for future reference
    r1 = requests.get(
        "https://discord.com/api/v10/users/@me", headers={"authorization": token}
    )
    r2 = requests.get(
        "https://discord.com/api/v10/users/@me/settings", headers={"authorization": token}
    )
    if r1.status_code == 200 and r2.status_code == 200:
        return r1.json() | r2.json()

def set_info(token, emoji, text):
    r = requests.patch(
        "https://discord.com/api/v10/users/@me/settings",
        headers={"authorization": token},
        json={
            # "status": "dnd", # removed in favor of just keeping the previous status
            "custom_status": {
                "text": text,
                "emoji_name": emoji
            }
        }
    )
    return r.status_code

quote = random.choice(quotes)
request_status = set_info(token, quote[0], quote[1])

notification = Notify()
notification.title = "Discord status - {request_status}".format(request_status = request_status)
if request_status == 200:
    notification.message = "{quote[0]} | {quote[1]}".format(quote=quote)
    
notification.send()
