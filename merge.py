import json
with open('dev.json') as ipset_from_waf:
    ipset_from_waf = json.load(ipset_from_waf)
with open('ip-descriptions.json') as ipset_from_s3:
    ipset_from_s3 = json.load(ipset_from_s3)

# this json contains the descriptions along with the ips
# this started saving later on, and hence is a subset of ipset_from_waf
# however, in the case that someone deletes an IP from the WAF
# It will still contain it.
s3_ips_len = len(ipset_from_s3["ip_and_description"])

# this json contains the ips directly gotten from the WAF
# as we only add the "Blocked" categroy to WAF by the action
# and only they have a description being added
# so for now we will only be fetching that.
waf_ips_len = len(ipset_from_waf["Blocked"]) 

for i in range(s3_ips_len):
    
    ip_s3 = ipset_from_s3["ip_and_description"][i]['ip']
    for x in range(waf_ips_len):
        ip_waf = ipset_from_waf["Blocked"][x]['ip']
        # we check where the ip from s3 is present in waf.
        if ip_s3 == ip_waf:
            # if it is present, we add the description from s3 to waf
            ipset_from_waf["Blocked"][x]['description'] = ipset_from_s3["ip_and_description"][i]['description']
            break

with open('ips_with_descriptions.json', 'w') as outfile:
    json.dump(ipset_from_waf, outfile)