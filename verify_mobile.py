from playwright.sync_api import sync_playwright
import time
import os

def capture_mobile_screenshots():
    if not os.path.exists('verification/mobile'):
        os.makedirs('verification/mobile', exist_ok=True)

    with sync_playwright() as p:
        # iPhone 13 Pro dimensions
        device = p.devices['iPhone 13 Pro']
        browser = p.chromium.launch()
        context = browser.new_context(**device)
        page = context.new_page()

        routes = {
            'home': 'http://localhost:3000',
            'inventory': 'http://localhost:3000/cars',
            'about': 'http://localhost:3000/about',
            'contact': 'http://localhost:3000/contact',
            'car_detail': 'http://localhost:3000/cars/1'
        }

        for name, url in routes.items():
            try:
                print(f"Capturing {name}...")
                page.goto(url, wait_until='networkidle')
                time.sleep(2) # Wait for animations
                # Force reveal of elements for screenshot
                page.evaluate("document.querySelectorAll('.reveal').forEach(el => el.classList.add('active'))")
                page.screenshot(path=f"verification/mobile/{name}_mobile.png", full_page=True)
            except Exception as e:
                print(f"Error capturing {name}: {e}")

        browser.close()

if __name__ == "__main__":
    capture_mobile_screenshots()
