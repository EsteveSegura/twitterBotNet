# twitterBotNet

**twitterBotNet** is a system ready to load a few users, passwords, proxies and we can start doing great things!

## Quick usage
#### Step 1
Edit the file **/database/db.json** with your proxies.
If you wish you can also add or edit the __UserAgents__
```json
{
    "users": [ {} ],
    "userAgents": [
        {
        "userAgent": "Mozilla/5.0 (Windows NT 6.1; rv:49.0) Gecko/20100101 Firefox/49.0"
        },......
    ],
    "proxies": [
        {
            "proxy" : "<ip>:<port>:<user>:<password>"
        },
        {
            "proxy" : "<ip>:<port>:<user>:<password>"
        }
    ]
}
```
#### Step 2
You can add the bots from the CLI, to run the app in our terminal ``node src/addBot.js ``