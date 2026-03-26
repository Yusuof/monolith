import re
import os

files = ['index.html', 'catalog.html', 'story.html', 'product.html', 'cart.html']
desktop_link = '<a class="text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 transition-colors relative after:absolute after:-bottom-1 after:left-0 after:h-[1px] after:w-full after:origin-bottom-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:bg-stone-800 dark:after:bg-stone-200" href="visit.html">Visit Us</a>'
mobile_link = '<a class="text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors" href="visit.html">Visit Us</a>'

for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # We match the exact class for the desktop link to ensure we only target the desktop one
    desktop_target = '<a class="text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 transition-colors relative after:absolute after:-bottom-1 after:left-0 after:h-[1px] after:w-full after:origin-bottom-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:bg-stone-800 dark:after:bg-stone-200" href="story.html">Story</a>'
    
    content = content.replace(desktop_target, desktop_target + '\n' + desktop_link)
    
    # And the mobile link
    mobile_target = '<a class="text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors" href="story.html">Story</a>'
    content = content.replace(mobile_target, mobile_target + '\n        ' + mobile_link)
    
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)

# Now fix visit.html
with open('index.html', 'r', encoding='utf-8') as f:
    index_content = f.read()

# Grab everything up to <main>
head_nav = index_content.split('<main>')[0]
# Grab everything from <footer> to end
footer = index_content.split('</main>')[1]

with open('visit.html', 'r', encoding='utf-8') as f:
    visit_content = f.read()

# Extract the main content from visit.html
visit_main = visit_content.split('<main class="pt-[88px]">')[1].split('</main>')[0]

# Construct new visit.html
new_visit = head_nav + '<main class="pt-24 min-h-screen">\n' + visit_main + '</main>\n' + footer

with open('visit.html', 'w', encoding='utf-8') as f:
    f.write(new_visit)

print("done")
