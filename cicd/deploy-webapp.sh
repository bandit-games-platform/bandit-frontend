#!/bin/bash

#------------------------------------------------------------------------------------------------
#- Name:        deploy-webapp.sh
#- Author:      Alli-smith Ayodeji
#- Function:    Deploys an Azure Web App with Container Image Support
#- Usage:       ./deploy-webapp.sh "NAME=app-name RESOURCE_GROUP=resource-group PLAN=app-service-plan SKU=B1 SUBSCRIPTION=subscription-id OS_TYPE=Linux RUNTIME=NODE:14 CONTAINER_IMAGE=registry/image:tag REGISTRY_URL=https://registry-url REGISTRY_USER=username REGISTRY_PASSWORD=password"
#------------------------------------------------------------------------------------------------

# Default variable values
NAME="null"
RESOURCE_GROUP="null"
PLAN="null"
SKU="null"
SUBSCRIPTION="null"
OS_TYPE="null"
RUNTIME="null"
CONTAINER_IMAGE="null"
REGISTRY_URL="null"
REGISTRY_USERNAME="null"
REGISTRY_PASSWORD="null"

# Map input arguments to variables
declare -A provided_values
for pair in $1; do
    IFS='=' read -r key value <<< "$pair"
    provided_values["$key"]="$value"
done

for key in "${!provided_values[@]}"; do
    if declare -p "$key" &>/dev/null; then
        declare "$key=${provided_values[$key]}"
    else
        echo "Warning: Variable $key is not defined."
    fi
done

#Frontend WebAPP

# Validate required variables
if [[ "$NAME" == "null" || "$RESOURCE_GROUP" == "null" || "$PLAN" == "null" || "$CONTAINER_IMAGE" == "null" || "$REGISTRY_URL" == "null" || "$REGISTRY_USER" == "null" || "$REGISTRY_PASSWORD" == "null" || "$OS_TYPE" == "null" || "$RUNTIME" == "null" ]]; then
    echo "Error: One or more required variables are not set."
    echo "Ensure NAME, RESOURCE_GROUP, PLAN, LOCATION, OS_TYPE, RUNTIME, CONTAINER_IMAGE, REGISTRY_URL, REGISTRY_USER, and REGISTRY_PASSWORD are provided."
    exit 1
fi

# Check if the Web App already exists
echo "Checking if the Azure Web App '$NAME' exists in resource group '$RESOURCE_GROUP'..."
WEBAPP_EXISTS=$(az webapp list --resource-group "$RESOURCE_GROUP" --query "[?name=='$NAME'].name" -o tsv)

if [ -z "$WEBAPP_EXISTS" ]; then
    echo "Azure Web App '$NAME' does not exist. Proceeding with deployment..."

    az webapp create \
        --name "$NAME" \
        --plan "$PLAN" \
        --resource-group "$RESOURCE_GROUP" \
        --sku "$SKU" \
        --subscription "$SUBSCRIPTION" \
        --location northeurope \
        --os-type "$OS_TYPE" \
        --runtime "$RUNTIME" \
        --container-image-name "$CONTAINER_IMAGE" \
        --container-registry-url "$REGISTRY_URL" \
        --container-registry-user "$REGISTRY_USERNAME" \
        --container-registry-password "$REGISTRY_PASSWORD" \
        --https-only true

    echo "Azure Web App '$NAME' has been successfully deployed with container image '$CONTAINER_IMAGE'."
else
    echo "Azure Web App '$NAME' already exists in resource group '$RESOURCE_GROUP'. Skipping deployment."
fi
