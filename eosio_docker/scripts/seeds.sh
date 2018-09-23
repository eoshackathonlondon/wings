cleos push action wings setdata "$(cat scripts/payloads/user_data_1.json)" -p andres
cleos push action wings setdata "$(cat scripts/payloads/user_data_2.json)" -p stella
cleos push action wings setdata "$(cat scripts/payloads/user_data_3.json)" -p victoria
cleos push action wings share "$(cat scripts/payloads/share_data.json)" -p stella
cleos get table wings wings users
cleos get table wings wings messages
