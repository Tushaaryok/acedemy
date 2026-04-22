
import re

with open('prisma/schema.prisma', 'r') as f:
    content = f.read()

# Fix the mangled schema attribute
fixed_content = content.replace('@@schema(" public\\)', '@@schema("public")')

with open('prisma/schema.prisma', 'w') as f:
    f.write(fixed_content)
