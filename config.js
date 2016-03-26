module.exports = {
    api: {
        // Koa port
        port: 3000,
        // MongoDB database URI
        mongodb: {
            endpoint: 'mongodb://localhost/test'
        },
        // Sync config
        sync: {
            // Crawl interval in milliseconds (defaults to every 60 minutes)
            interval: 1000 * 60 * 60
        }
    },
    // Post sources
    sources: {
        // Facebook configuration
        facebook: {
            // User Access Token with feed permissions (preferrably extended)
            access_token: 'CAANeSyXrZAakBA...',
            // Facebook node IDs
            nodes: [
                '1234567891234567',
                '8912345678912345'
            ]
        }
    },
    // Post filters
    filter: {
        // Any one of these words immediately mark a post as "not interesting"
        blacklist: [
            'no pets'
        ],
        // Any one of these words immediately mark a post as "interesting"
        whitelist: [
            'renovated',
        ]
    },
    // Alert configuration
    alerts: {
        // Sender e-mail (must be SES-approved)
        from: 'example@gmail.com',
        // Recipient e-mails (must be SES-approved)
        to: [
            'example@gmail.com'
        ],
        // Amazon SES IAM user credentials
        ses: {
            key: 'AKIAJU_12345',
            secret: 'giiDxbjo123456_giiDxbjo123456'
        }
    }
};