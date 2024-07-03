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
refresh_token=$(jq -r  '.refresh_token' <<< "${login_access}")

logout_response=$(curl -s -o /dev/null -w '%{http_code}' -k -X POST \
   -H "Content-Type:application/x-www-form-urlencoded" \
   -H "Authorization: Bearer $access_token" \
   -d "client_id=[CLIENT_ID]" \
   -d "refresh_token=$refresh_token" \
 'http://localhost:8080/auth/realms/askadrovip-realm/protocol/openid-connect/logout')

if [ $logout_response -eq 204 ]; then
    echo "Logout successful for test user."
else
    echo "Unable to logout test user ($logout_response)."
    exit 1
fi