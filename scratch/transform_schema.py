
import re

with open('prisma/schema.prisma', 'r') as f:
    lines = f.read().splitlines()

new_lines = []
in_generator = False
in_datasource = False

for line in lines:
    if line.strip().startswith('generator client {'):
        in_generator = True
        new_lines.append(line)
        continue
    if in_generator and line.strip() == '}':
        new_lines.append('  previewFeatures = ["multiSchema"]')
        new_lines.append('}')
        in_generator = False
        continue
    
    if line.strip().startswith('datasource db {'):
        in_datasource = True
        new_lines.append(line)
        continue
    if in_datasource and line.strip() == '}':
        new_lines.append('  url      = env("DATABASE_URL")')
        new_lines.append('  schemas  = ["public", "auth"]')
        new_lines.append('}')
        in_datasource = False
        continue
        
    # Inject @@schema into models and enums
    if re.match(r'^(model|enum)\s+\w+\s+\{', line.strip()):
        new_lines.append(line)
        new_lines.append('  @@schema("public")')
        continue
        
    new_lines.append(line)

with open('prisma/schema.prisma', 'w') as f:
    f.write('\n'.join(new_lines))
