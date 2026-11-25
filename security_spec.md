# Security Specification & Red Team Audit

## 1. Data Invariants
1. **Owner-Only Publishing**: Only the verified portfolio owner (`email == 'ramziddinios@gmail.com' && email_verified == true`) can create, update, or delete `/site/public_profile` and `/projects/{projectId}`.
2. **Draft Isolation**: Unauthenticated visitors and non-admin users can only `list` or `get` projects where `isPublished == true`. Drafts (`isPublished == false`) are strictly restricted to the verified owner.
3. **PII Isolation on Visitor Messages**: Any visitor may submit a bounded `/messages/{messageId}` document with `isRead == false` and `createdAt == request.time`, but only the verified owner may `get`, `list`, `update` (`isRead`), or `delete` messages.
4. **Immutable Ownership & Timestamps**: `ownerUid` and `createdAt` cannot be modified after creation; `createdAt` and `updatedAt` must equal `request.time`.
5. **Bounded Arrays & Strings**: Every string and array (`skills <= 12`, `tools <= 8`) has explicit `.size()` boundaries to prevent resource exhaustion.

## 2. "Dirty Dozen" Adversarial Payloads
1. Unauthenticated `create` on `/projects/p1` -> `PERMISSION_DENIED`
2. Authenticated non-owner (`other@example.com`) `create` on `/projects/p1` -> `PERMISSION_DENIED`
3. Unverified email (`ramziddinios@gmail.com`, `email_verified: false`) `create` on `/projects/p1` -> `PERMISSION_DENIED`
4. Owner `create` on `/projects/p1` with `ownerUid != request.auth.uid` -> `PERMISSION_DENIED`
5. Owner `create` on `/projects/p1` with shadow field `isVerified: true` -> `PERMISSION_DENIED`
6. Owner `create` on `/projects/invalid$id` (invalid path ID) -> `PERMISSION_DENIED`
7. Owner `update` on `/projects/p1` mutating `createdAt` or `ownerUid` -> `PERMISSION_DENIED`
8. Owner `create` on `/projects/p1` with `tools` array of 20 items (`> 8`) -> `PERMISSION_DENIED`
9. Unauthenticated `list` on `/projects` without `where('isPublished', '==', true)` -> `PERMISSION_DENIED`
10. Unauthenticated `get` on `/messages/m1` -> `PERMISSION_DENIED`
11. Unauthenticated `list` on `/messages` -> `PERMISSION_DENIED`
12. Visitor `create` on `/messages/m1` with `isRead: true` or forged `createdAt` -> `PERMISSION_DENIED`
