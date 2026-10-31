const axios = require('axios');

// Webhook manager - send events to registered webhooks
const triggerWebhook = async (userId, event, data) => {
  try {
    // TODO: Store webhooks in database, retrieve by userId
    // For now, log event
    console.log(`Webhook triggered: ${event}`, { userId, data });

    // Example: Send to registered webhook URL
    // const webhooks = await getWebhooksForUser(userId);
    // webhooks.forEach(webhook => {
    //   axios.post(webhook.url, { event, data, timestamp: new Date() })
    //     .catch(err => console.error('Webhook failed:', err));
    // });
  } catch (error) {
    console.error('Webhook trigger error:', error);
  }
};

module.exports = { triggerWebhook };
