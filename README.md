# Facebook Alerts

Facebook Alerts is a Node.js app that automatically notifies you of interesting posts published to preconfigured Facebook feeds. 

It runs every hour, traversing the preconfigured feeds and marking each post as interesting or irrelevant, based on the configurable `whitelist` and `blacklist` rules. Once an interesting post is detected, it automatically sends an e-mail alert to preconfigured e-mails with the post link and content.

## Supported Node Types

The following Facebook node types can be monitored for interesting posts:

* Facebook Pages
* Facebook Friends
* Facebook Groups (requires Facebook app with `v2.3` Graph API version support)

## Sample Use Case

An real-life use-case for Facebook Alerts is subscribing to alerts about interesting apartment rental posts. This is useful in case you are a member of several Facebook groups whose members post all sorts of apartment listing posts and you wish to filter them according to specific parameters (such as the number of bedrooms, pet allowance, etc), all while getting a near-realtime notification as soon as they are posted, so you can snatch one of the apartments before somebody else does.

# Requirements

* MongoDB database for post persistence
* Node.js `v4.2.x+` for ES6 generators support
* Facebook User Access Token to read the nodes' feeds
* Amazon Web Services account (free tier) + Amazon SES (Simple Email Service) to send the alert emails
* Facebook application with `v2.3` Graph API version support (`v2.3` only necessary if you wish to monitor Facebook groups)

# Instructions

### 1. Configure the MongoDB URI

Facebook Alerts needs a MongoDB database to avoid sending duplicate alerts for the same post.

1. Create a MongoDB database in your favorite cloud (check out [MongoLab](https://mongolab.com/) for a free database)
2. Set the MongoDB database endpoint URI in the `config.js` file

### 2. Generate a Facebook User Access Token

Facebook Alerts needs a User Access Token to read your target feeds and check them for interesting posts.

1. Go to the [Graph API Explorer](https://developers.facebook.com/tools/explorer/)
2. Select your application from the dropdown in the top right
2. Select `v2.3` as the API version in the request URI input field (only if you wish to monitor Facebook groups)
3. Click Get Token -> **Get User Access Token**
4. Select the `user_groups` permission (only if you wish to monitor Facebook groups)
5. Click **Get Access Token**

### 3. Extend the Facebook User Access Token

By default, Facebook User Access Tokens expire pretty quickly, usually within an hour. Facebook provides a mechanism for extending the access token's validity to 2 months. This means that you'll have to re-generate and re-extend a new access token every 2 months if you need Facebook Alerts to work for a longer period than 2 months.

1. Visit the following URL, replacing each `{variable}` with its corresponding value:
    * `https://graph.facebook.com/oauth/access_token?grant_type=fb_exchange_token&client_id={app-client-id}&client_secret={app-client-secret}&fb_exchange_token={user-access-token}`
2. Make sure the access token in the response is set to expire in 2 months by using the [Facebook Debugger](https://developers.facebook.com/tools/debug/)
3. Copy the entire access token to the `config.js` file (set it in `sources.facebook.access_token`)

### 4. Configure the Facebook Nodes to Monitor

Now it's time to define which Facebook nodes (groups/pages/friends) you wish to monitor for interesting posts.

Facebook's Graph API provides a way to query for node IDs with the following API endpoints:

* Pages - `https://graph.facebook.com/v2.3/me/pages?access_token={user-access-token}`
* Groups - `https://graph.facebook.com/v2.3/me/groups?access_token={user-access-token}`
* Friends - `https://graph.facebook.com/v2.3/me/friends?access_token={user-access-token}`

Extract the node IDs using these API calls and insert them into the `sources.facebook.nodes` array in the `config.js` file.


### 5. Set up Amazon SES for Sending Alert Emails

Now we need to make it possible for Facebook Alerts to send alert e-mails when interesting posts are found. This requires an Amazon Web Services account with verified Amazon SES e-mail addresses, along with an IAM user that has full access to Amazon SES.

1. Sign up for [Amazon SES](https://console.aws.amazon.com/ses/home?region=us-east-1)
2. Verify alert e-mail sender and recipient e-mails
3. Create an [AWS IAM user](https://console.aws.amazon.com/iam/home?region=us-east-1#security_credential) in the AWS Console
4. Copy the IAM user's **Access Key ID** & **Secret Access Key** into the `alerts.ses` object in the `config.js` file
5. Attach the `AmazonSESFullAccess` policy to the IAM user

### 6. Configure Alert Rules

Next, let's set up the alert rules for defining which posts interest us and which don't.

1. Configure the `whitelist` and `blacklist` keyword arrays in `config.js`
    1. Set the `filter.blacklist` array with phrases in posts that will mark a post as "not interesting", such as "no pets"
    2. Set the `filter.whitelist` array with phrases in posts that will mark a post as "interesting", such as "renovated"

### 7. Test and Deploy

1. Run `npm install && npm start` to make sure everything works as expected (you may receive lots of e-mails if configured loosely)
2. If all is well, deploy to a cloud service of your choice (AWS Elastic Beanstalk recommended, using the free tier)
3. Enjoy automated alerts about interesting posts delivered straight to your inbox!

# Collaborating

* If you find a bug or wish to make some kind of change, please create an issue first
* Make your commits as tiny as possible - one feature or bugfix at a time
* Write detailed commit messages, in-line with the project's commit naming conventions
* Make sure your code conventions are in-line with the project

# License

Apache 2.0