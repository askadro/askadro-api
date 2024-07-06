login_access=$(curl -k -X POST \
   -H "Content-Type:application/x-www-form-urlencoded" \
   -d "grant_type=password" \
   -d "client_id=admin-cli" \
   -d "username=$KEYCLOAK_ADMIN" \
   -d "password=$KEYCLOAK_ADMIN_PASSWORD" \
 'http://localhost:8080/realms/master/protocol/openid-connect/token')

error=$(jq -r .error <<< $login_access)

if [ $error == "null" ]; then
    echo "Login successful for test user."
else
    echo "Unable to login test user ($error)."
    exit 1
fi

access_token=$(jq -r  '.access_token' <<< "${login_access}")

# Kullanıcı oluştur
user_id=$(curl -s -X POST "http://localhost:8080/admin/realms/askadrovip-realm-x/users" \
  -H "Authorization: Bearer $access_token" \
  -H "Content-Type: application/json" \
  -d '{
        "username": "frintar",
        "enabled": true,
        "email": "hknd25@gmail.com",
        "firstName": "Hakan",
        "lastName": "Dursun",
        "emailVerified": true,
        "credentials": [{
          "type": "password",
          "value": "24262060",
          "temporary": false
        }]
      }')

echo "Admin user created with ID: $user_id"