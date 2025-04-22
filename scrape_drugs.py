import requests
from bs4 import BeautifulSoup
import json
import time

BASE_URL = "https://www.drugs.com"
START_URL = f"{BASE_URL}/drug_information.html"
HEADERS = {'User-Agent': 'Mozilla/5.0'}

def get_all_drug_links():
    response = requests.get(START_URL, headers=HEADERS)
    soup = BeautifulSoup(response.text, "html.parser")
    drug_links = []

    # ✅ CORRECT SELECTOR as of 2024
    for link in soup.select("ul.column-list-2 li a"):
        name = link.text.strip()
        url = BASE_URL + link['href']
        drug_links.append({'name': name, 'url': url})

    return drug_links

def get_drug_details(drug):
    try:
        response = requests.get(drug['url'], headers=HEADERS)
        soup = BeautifulSoup(response.text, "html.parser")

        uses = None
        side_effects = None

        # Try to find uses
        uses_section = soup.find('h2', string=lambda s: s and 'Uses' in s)
        if uses_section:
            uses_para = uses_section.find_next('p')
            uses = uses_para.get_text(strip=True) if uses_para else None

        # Try to find side effects
        side_effects_section = soup.find('h2', string=lambda s: s and 'Side effects' in s)
        if side_effects_section:
            side_para = side_effects_section.find_next('p')
            side_effects = side_para.get_text(strip=True) if side_para else None

        return {
            "name": drug['name'],
            "uses": uses or "Not listed",
            "sideEffects": side_effects or "Not listed",
            "components": [drug['name']]
        }

    except Exception as e:
        print(f"Error scraping {drug['name']}: {e}")
        return None

def main():
    all_drugs = get_all_drug_links()
    print(f"Found {len(all_drugs)} drugs. Scraping details...")

    results = []

    for i, drug in enumerate(all_drugs[:30]):  # Scrape first 30 drugs for testing
        print(f"{i+1}. Scraping {drug['name']}")
        details = get_drug_details(drug)
        if details:
            results.append(details)
        time.sleep(1)

    with open("drugs.json", "w", encoding='utf-8') as f:
        json.dump(results, f, indent=2)

    print("✅ Scraping complete. Data saved to drugs.json")

if __name__ == "__main__":
    main()
