# n8n-nodes-tamtam

![n8n.io - Workflow Automation](https://raw.githubusercontent.com/n8n-io/n8n/master/assets/n8n-logo.png)

[n8n](https://n8n.io/) community node for TamTam messenger integration.

## Installation

Follow the installation instructions in the n8n community nodes documentation:

1. Go to **Settings > Community Nodes** in your n8n instance
2. Click **Install a community node**
3. Enter `n8n-nodes-tamtam` and click **Install**

## Features

- **TamTam Node**: Send messages, files, photos, videos, and manage chats
- **TamTam Trigger**: Receive webhook updates from TamTam
- **Full API Coverage**: Supports all major TamTam Bot API methods

## Credentials

To use this node, you need to create a bot in TamTam and get an access token:

1. Create a bot via [@PrimeBot](https://tt.me/PrimeBot) in TamTam
2. Get your bot's access token
3. Add TamTam API credentials in n8n using the token

## Operations

### Message Operations
- Send message
- Edit message
- Delete message
- Send audio/file/photo/video
- Pin/unpin messages

### Chat Operations
- Get chat info
- Get chat members
- Leave chat
- Send typing actions

### User Operations
- Get current user info
- Get user by ID

### Subscription Operations
- Set webhook
- Delete webhook
- Get updates

## License

[MIT](https://github.com/lumian/n8n-nodes-tamtam/blob/master/LICENSE)