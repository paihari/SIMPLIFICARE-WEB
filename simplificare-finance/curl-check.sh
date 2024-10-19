TOKEN='TOKEN'
BODY='{}'
URL='https://windmill.simplificare.ch/api/w/finance/jobs/run/p/f/simplificare/magical_script?token=TOKEN'
UUID=$(curl -s -H 'Content-Type: application/json'  -X POST -d "$BODY" $URL)


URL="https://windmill.simplificare.ch/api/w/finance/jobs_u/completed/get_result_maybe/$UUID"
while true; do
  curl -s -H "Authorization: Bearer $TOKEN" $URL -o res.json
  COMPLETED=$(cat res.json | jq .completed)
  if [ "$COMPLETED" = "true" ]; then
    cat res.json | jq .result
    break
  else
    sleep 1
  fi
done