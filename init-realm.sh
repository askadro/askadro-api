#!/bin/bash


# Admin token almak için kimlik doğrulama
login_access=$(curl -s -X POST "http://localhost:8080/realms/master/protocol/openid-connect/token" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=$KEYCLOAK_ADMIN" \
  -d "password=$KEYCLOAK_ADMIN_PASSWORD" \
  -d 'grant_type=password' \
  -d 'client_id=admin-cli')

error=$(jq -r .error <<< $login_access)

if [ $error == "null" ]; then
    echo "Login successful for test user."
else
    echo "Unable to login test user ($error)."
    exit 1
fi

access_token=$(jq -r  '.access_token' <<< "${login_access}")
refresh_token=$(jq -r  '.refresh_token' <<< "${login_access}")


# Realm oluştur
curl -s -X POST "http://localhost:8080/admin/realms" \
  -H "Authorization: Bearer $access_token" \
  -H "Content-Type: application/json" \
  -d "{
        \"realm\": \"$KC_REALM_NAME\",
        \"enabled\": true
      }"

# Client oluştur
curl -s -X POST "http://localhost:8080/admin/realms/askadrovip-realm/clients" \
  -H "Authorization: Bearer $access_token" \
  -H "Content-Type: application/json" \
  -d "{
        \"clientId\": \"$KEYCLOAK_CLIENT_ID\",
        \"clientSecret\": \"$KEYCLOAK_CLIENT_SECRET\",
        \"enabled\": true,
        \"publicClient\": true,
        \"redirectUris\": [\"*\"]
      }"
