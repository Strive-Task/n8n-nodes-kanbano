# n8n-nodes-kanbano

This is an n8n official node for the Kanbano API. It lets you automate authentication, users, board collaboration, tasks, messages, tags, checklist items, and notification token management in n8n workflows.

Published package: `@strive-task/n8n-nodes-kanbano`

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

[Installation](#installation)
[Operations](#operations)
[Credentials](#credentials)
[Compatibility](#compatibility)
[Usage](#usage)
[Resources](#resources)
[Publishing](#publishing)
[Version history](#version-history)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

Supported resources and operations:

- **Board**: get many, create, update name, update order, set favorite, set public, archive, unarchive, duplicate, delete
- **Board (collaboration)**: get members, add member, invite member by email, change member role, remove member, precheck invite, send access request, accept/reject request, check pending request, get access requests, get public token
- **Board (cover)**: change cover value, remove cover
- **Auth**: register, login, verify email registration, refresh, request password reset, recover password, sign out
- **Column**: get many, create, update name, update order, archive, duplicate, delete
- **Firebase**: assign token, revoke token
- **Task**: get many (with filters), create, update name, update description, update status, update date, move, add/remove performer, add/remove member, add/remove tag, archive, duplicate, get history, delete
- **Task (sharing/advanced)**: create share link, get share link, remove all performers, remove all tags
- **Task Message**: get many, create, update, pin/unpin, delete
- **Tag**: get many, create, update, delete
- **User**: get me, update name, change password, create unauthorized user, delete avatar, delete me
- **Checklist**: get many, create, update name, update order, toggle, delete, delete all

## Credentials

Create a `Kanbano API` credential in n8n and choose one authentication mode:

1. **Access Token**
   - Paste a valid Kanbano access token
   - Useful when tokens are managed outside n8n
2. **Email & Password (Auto Refresh)**
   - Provide Kanbano account email/password
   - Node logs in and refreshes tokens automatically

You can also override the API base URL (default: `https://api.kanbano.ru`).

## Compatibility

Tested with current n8n community node tooling (`@n8n/node-cli`). Keep n8n reasonably up to date for the best compatibility.

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

## Publishing

Release model:

- Push to `main` runs CI (`lint` + `build`).
- Pushing a tag like `v0.3.0` runs the publish workflow and publishes to npm.

GitHub Actions prerequisites:

- Repository secret `NPM_TOKEN` must be set.
- npm token must have publish permissions for `@strive-task`.
- Package is configured as public scoped package through `publishConfig`.

Manual preflight before creating a release tag:

- `pnpm lint`
- `pnpm build`
- Optional: `npm pack`

## Version history

- `0.1.0`: initial Kanbano MVP with board/column/task/tag/checklist support.
- `0.2.0`: expanded authenticated API coverage for auth, users, board collaboration, task sharing, and task messages.
