# n8n-nodes-kanbano

This is an n8n official node for the Kanbano API. It lets you automate authentication, users, board collaboration, tasks, messages, tags, checklist items, and notification token management in n8n workflows.

Published package: `@strive-task/n8n-nodes-kanbano`

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

[Installation](#installation)
[Operations](#operations)
[Credentials](#credentials)
[Usage](#usage)
[Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

Supported resources and operations:

- **Auth**: login, recover password, refresh, register, request password reset, sign out, verify email registration
- **Board**: accept access request, add member, archive, change cover, change member role, create, delete, duplicate, get access requests, get many, get members, get public token, invite member by email, is access request sent, precheck invite, reject access request, remove cover, remove member, send access request, set favorite, set public, unarchive, update name, update order
- **Checklist**: create, delete, delete all, get many, toggle, update name, update order
- **Column**: archive, create, delete, duplicate, get many, update name, update order
- **Firebase**: assign token, revoke token
- **Tag**: create, delete, get many, update
- **Task**: add member, add performer, add tag, archive, create, create share link, delete, duplicate, get history, get many (with filters), get share link, move, remove all performers, remove all tags, remove member, remove performer, remove tag, update date, update description, update name, update status
- **Task Message**: create, delete, get many, pin/unpin, update
- **User**: change password, create unauthorized user, delete avatar, delete me, get me, update name

## Credentials

Create a `Kanbano API` credential in n8n and choose one authentication mode:

1. **API Token**
   - Paste a Kanbano personal API token (`kanbano_at_...`)
   - Best for long-lived integrations without login credentials
2. **Access Token**
   - Paste a valid Kanbano access token
   - Useful when tokens are managed outside n8n
3. **Email & Password (Auto Refresh)**
   - Provide Kanbano account email/password
   - Node logs in and refreshes tokens automatically

You can also override the API base URL (default: `https://api.kanbano.ru`).

## Usage

Common flows:

- Sync board data: `Board -> Get Many`, then `Column -> Get Many`, then `Task -> Get Many`
- Create and move tasks: `Task -> Create`, then `Task -> Move`
- Complete work items: `Task -> Update Status` with `Completed`
- Manage labels and checklist:
  - `Tag -> Create/Update/Delete`
  - `Checklist -> Create/Toggle/Delete`
- Manage collaboration:
  - `Board -> Invite Member By Email`
  - `Board -> Get Access Requests` then `Accept Access Request` or `Reject Access Request`
- Work with task messages:
  - `Task Message -> Get Many`, `Create`, `Pin`, `Delete`
- Manage session lifecycle:
  - `Auth -> Login`, `Refresh`, `Sign Out`

Order fields are entered in UI units. The node automatically scales them to Kanbano API order format.

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
- [Kanbano API docs](https://docs.kanbano.ru/)
