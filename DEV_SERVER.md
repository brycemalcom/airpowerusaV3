powershell
# Step 1: Kill all Node processes
taskkill /f /im node.exe

# Step 2: Clear Next.js cache  
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue

# Step 3: Clear npm cache
npm cache clean --force

# Step 4: Start fresh
npm run dev