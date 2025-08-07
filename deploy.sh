# #!/bin/bash

# # PRODUCTION
# git checkout master
# git pull origin master

# docker compose up -d


#!/bin/bash

# Step 1: Checkout to master and pull latest code
git checkout master
git pull origin master

# Step 2: Stop and remove old containers, volumes, and images
docker compose down -v --remove-orphans --rmi all

# Step 3: Rebuild everything from scratch
docker compose build --no-cache

# Step 4: Start containers
docker compose up -d
