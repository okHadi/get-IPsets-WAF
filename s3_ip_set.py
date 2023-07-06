import json
import os
# This script generates the json file that needs to be added to the S3 bucket.
with open ('ip-descriptions.json') as ip_descriptions_s3:
    ip_descriptions_s3 = json.load(ip_descriptions_s3)

new_ip_with_description = os.environ.get("NEW_IP_WITH_DESCRIPTION")
ip_descriptions_s3["ip_and_description"].append(new_ip_with_description)

with open('ip-descriptions.json', 'w') as outfile:
    json.dump(ip_descriptions_s3, outfile)