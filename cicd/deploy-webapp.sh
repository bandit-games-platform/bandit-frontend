##!/bin/bash
#
##------------------------------------------------------------------------------------------------
##- Name:        deploy-webapp.sh
##- Author:      Alli-smith Ayodeji
##- Function:    Deploys an Azure Web App
##- Usage:       ./deploy-webapp.sh
##------------------------------------------------------------------------------------------------
#
## Variables
#ENV_NAME="null"
#RESOURCE_GROUP="null"
#WEBAPP_NAME="null"
#RUNTIME="null"
#OS_TYPE="null"
#REGION="null"
#SKU="null"
#
## Map
#declare -A provided_values
#for pair in $1; do
#    IFS='=' read -r key value <<< "$pair"
#    provided_values["$key"]="$value"
#done
#
#for key in "${!provided_values[@]}"; do
#    if declare -p "$key" &>/dev/null; then
#        declare "$key=${provided_values[$key]}"
#    else
#        echo "Warning: Variable $key is not defined."
#    fi
#done
#
## Web App Deployment
#echo "Deploying Azure Web App..."
#WEBAPP_EXISTS=$(az webapp list --resource-group $RESOURCE_GROUP --query "[?name=='$WEBAPP_NAME'].name" -o tsv)
#
#if [ -z "$WEBAPP_EXISTS" ]; then
#  echo "Creating Web App: $WEBAPP_NAME"
#  az webapp create \
#    --name "$WEBAPP_NAME" \
#    --resource-group "$RESOURCE_GROUP" \
#    --plan "$ENV_NAME" \
#    --runtime "$RUNTIME" \
#    --os-type "$OS_TYPE" \
#    --sku "$SKU" \
#    --location "$REGION"
#
#  echo "Configuring Web App settings..."
#  az webapp config set \
#    --name "$WEBAPP_NAME" \
#    --resource-group "$RESOURCE_GROUP" \
#    --always-on true
#
#  echo "Deployment to Web App $WEBAPP_NAME complete."
#else
#  echo "Web App $WEBAPP_NAME already exists."
#fi
