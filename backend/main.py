'''
CQJr-nCMrz8y*nV
'''
import random
import time
from datetime import datetime, timedelta
import uuid
import json
from dotenv import load_dotenv
import os
from pymongo import MongoClient

# Load environment variables
load_dotenv()

# MongoDB connection settings

MONGODB_URI = os.getenv('MONGODB_URI')
# Original categories
fast_food = ['mcdonalds', 'kfc', 'subway', 'wendys', 'burger king', 'shake shack', 'five guys', 'chick-fil-a']
barista = ['starbucks', 'tim hortons', 'second cup', 'coffeeshop', 'dunkin', 'blue bottle', 'gregory\'s coffee', 'joe coffee']
grocery = ['walmart', 'superstore', 'loblaws', 'metro', 'nofrills', 'whole foods', 'trader joes', 'fairway market']
clothing = ['h&m', 'zara', 'gap', 'forever 21', 'uniqlo', 'century 21', 'nordstrom rack', 'macy\'s']

# NYC specific additions
transit = ['mta subway', 'nyc ferry', 'uber', 'lyft', 'yellow cab', 'via', 'citi bike', 'path train']
entertainment = ['amc theaters', 'regal cinemas', 'bowlero', 'madison square garden', 'brooklyn bowl', 'museum of modern art', 'broadway show', 'comedy cellar']
delivery = ['doordash', 'uber eats', 'grubhub', 'seamless', 'caviar', 'postmates', 'instacart', 'freshdirect']
fitness = ['equinox', 'planet fitness', 'crunch fitness', 'nysc', 'soulcycle', 'barry\'s bootcamp', 'orangetheory', 'peloton']
nightlife = ['bars', 'rooftop lounges', 'clubs', 'beer gardens', 'wine bars', 'speakeasies', 'sports bars', 'karaoke bars']

# Products for each category
fast_food_products = ['burger', 'fries', 'chicken', 'sandwich', 'salad', 'milkshake', 'combo meal', 'nuggets']
barista_products = ['coffee', 'tea', 'latte', 'cappuccino', 'americano', 'cold brew', 'espresso', 'pastry']
grocery_products = ['milk', 'bread', 'eggs', 'apples', 'bananas', 'organic produce', 'prepared meals', 'snacks']
clothing_products = ['shirt', 'pants', 'shoes', 'hat', 'jacket', 'dress', 'accessories', 'sweater']
transit_products = ['single ride', 'monthly pass', 'weekly pass', 'ride share', 'bike rental', 'express bus', 'airport trip', 'group ride']
entertainment_products = ['movie ticket', 'concert ticket', 'bowling game', 'museum entry', 'show ticket', 'comedy show', 'sports event', 'arcade games']
delivery_products = ['food delivery', 'grocery delivery', 'meal kit', 'convenience items', 'pharmacy items', 'alcohol delivery', 'restaurant pickup', 'catering']
fitness_products = ['monthly membership', 'class pack', 'personal training', 'day pass', 'annual membership', 'virtual class', 'equipment rental', 'spa service']
nightlife_products = ['cocktails', 'beer', 'wine', 'cover charge', 'bottle service', 'bar food', 'happy hour', 'group event']

account = {
    "_id": "5709dddd059d0946504a03c1",
    "balance": 1733,
    "customer_id": "5709dddd059d0946504a03bf",
    "nickname": "Emiline Emiline",
    "rewards": 795,
    "type": "Checking"
}

def generate_transaction_amount(category):
    amounts = {
        'fast_food': (8, 35),
        'barista': (4, 18),
        'grocery': (15, 300),
        'clothing': (25, 200),
        'transit': (2.90, 150),  # From single ride to monthly passes
        'entertainment': (15, 250),
        'delivery': (15, 100),
        'fitness': (20, 300),
        'nightlife': (15, 400)
    }
    min_amount, max_amount = amounts.get(category, (10, 100))
    return round(random.uniform(min_amount, max_amount), 2)

def generate_transactions():
    transactions = []
    categories = {
        'fast_food': {'merchants': fast_food, 'products': fast_food_products},
        'barista': {'merchants': barista, 'products': barista_products},
        'grocery': {'merchants': grocery, 'products': grocery_products},
        'clothing': {'merchants': clothing, 'products': clothing_products},
        'transit': {'merchants': transit, 'products': transit_products},
        'entertainment': {'merchants': entertainment, 'products': entertainment_products},
        'delivery': {'merchants': delivery, 'products': delivery_products},
        'fitness': {'merchants': fitness, 'products': fitness_products},
        'nightlife': {'merchants': nightlife, 'products': nightlife_products}
    }
    
    # Generate transactions for the last 7 days
    end_date = datetime.now()
    start_date = end_date - timedelta(days=7)
    
    current_date = start_date
    while current_date <= end_date:
        # Generate 8-20 transactions per day (NYC is busy!)
        num_transactions = random.randint(8, 20)
        
        for _ in range(num_transactions):
            # Adjust probability based on time of day
            hour = random.randint(9, 22)
            minute = random.randint(0, 59)
            transaction_time = current_date.replace(hour=hour, minute=minute)
            
            # Weight categories based on time of day
            if 6 <= hour <= 10:  # Morning
                category_weights = ['barista'] * 4 + ['transit'] * 3 + list(categories.keys())
            elif 11 <= hour <= 14:  # Lunch
                category_weights = ['fast_food'] * 3 + ['delivery'] * 2 + list(categories.keys())
            elif 17 <= hour <= 22:  # Evening
                category_weights = ['entertainment'] * 2 + ['nightlife'] * 2 + ['delivery'] * 2 + list(categories.keys())
            else:  # Middle of the day
                category_weights = list(categories.keys())
            
            category = random.choice(category_weights)
            merchant = random.choice(categories[category]['merchants'])
            product = random.choice(categories[category]['products'])
            amount = generate_transaction_amount(category)
            
            transaction = {
                "id": str(uuid.uuid4()),
                "created_at": transaction_time.isoformat(),
                "merchant": merchant,
                "category": category,
                "product": product,
                "amount": amount,
                "customer_id": account["customer_id"],
                "account_id": account["_id"],
                "status": "completed",
                "type": "debit",
                "description": f"Purchase at {merchant.title()} - {product.title()}"
            }
            
            transactions.append(transaction)
        
        current_date += timedelta(days=1)
    
    # Sort transactions by date
    transactions.sort(key=lambda x: x['created_at'])
    return transactions

def upload_to_mongodb(transactions_data):
    try:
        # Connect to MongoDB Atlas
        client = MongoClient(MONGODB_URI)
        db = client['mongodata']  # database name
        collection = db['transactions']  # collection name
        
        # Insert the account data first
        account_data = {
            "_id": transactions_data["_id"],
            "balance": transactions_data["balance"],
            "customer_id": transactions_data["customer_id"],
            "nickname": transactions_data["nickname"],
            "rewards": transactions_data["rewards"],
            "type": transactions_data["type"]
        }
        
        # Upsert the account data (update if exists, insert if doesn't)
        collection.update_one(
            {"_id": account_data["_id"]},
            {"$set": account_data},
            upsert=True
        )
        
        # Insert all transactions
        if "transactions" in transactions_data:
            # Create a bulk write operation for transactions
            result = collection.update_one(
                {"_id": account_data["_id"]},
                {"$set": {"transactions": transactions_data["transactions"]}},
                upsert=True
            )
            
            print(f"Successfully uploaded {len(transactions_data['transactions'])} transactions to MongoDB")
            return True
            
    except Exception as e:
        print(f"Error uploading to MongoDB: {str(e)}")
        return False
    finally:
        if 'client' in locals():
            client.close()

# Main execution
if __name__ == "__main__":
    # Read the existing transactions.json file
    try:
        with open('transactions.json', 'r') as f:
            transactions_data = json.load(f)
            
        # Upload to MongoDB
        success = upload_to_mongodb(transactions_data)
        
        if success:
            print("Data successfully uploaded to MongoDB Atlas")
        else:
            print("Failed to upload data to MongoDB Atlas")
            
    except FileNotFoundError:
        print("transactions.json file not found")
    except json.JSONDecodeError:
        print("Error reading transactions.json file")




# account

