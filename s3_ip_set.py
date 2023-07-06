import json
import os
# This script generates the json file that needs to be added to the S3 bucket.
with open ('ip-descriptions.json') as ip_descriptions_s3:
    ip_descriptions_s3 = json.load(ip_descriptions_s3)

with open('new-ip.json') as new_ip:
    new_ip = json.load(new_ip)


ip_descriptions_s3["ip_and_description"].append(new_ip)

with open('ip-descriptions.json', 'w') as outfile:
    json.dump(ip_descriptions_s3, outfile)