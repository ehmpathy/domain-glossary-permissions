# domain-glossary-permissions

![test](https://github.com/ehmpathy/domain-glossary-permissions/workflows/test/badge.svg)
![publish](https://github.com/ehmpathy/domain-glossary-permissions/workflows/publish/badge.svg)

A glossary of intuitive, universally unambiguous **permissions** definitions and useful procedures.

# purpose

define a ubiquitous, simple, pit of success for
- defining permissions
- deciding authorization by comparing permissions.granted vs permissions.required

usecases
- declare permissions
- compute authorization

note
- heavy inspiration from aws access management (e.g., https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html)


# install

```sh
npm install domain-glossary-permissions
```

# use

### extend the Permission dobj to narrow it to your domain

```ts
/**
 * the permission actions relevant to the domain
 */
const PERMISSION_ACTION_OPTIONS = [
  '*',
  'data:get:*',
  'data:get:crew',
  'data:set:crew',
  'data:get:leads',
  'data:set:leads',
  'data:get:comms',
  'data:set:comms',
  'data:get:quotes',
  'data:set:quotes',
] as const;
export type PermissionAction = typeof PERMISSION_ACTION_OPTIONS[number];


/**
 * a permission specifies whether or not an agent has the ability to perform some action on some resource
 */
export interface AgentPermission extends Permission {
  action: PermissionAction; // overwrite the actions to narrow them to our domain
}
export class AgentPermission
  extends DomainLiteral<AgentPermission>
  implements AgentPermission
{
  public static schema = schema;
}

```


### compute whether an agent has a set of required permissions

```ts
  import { decideIsPermissionGranted } from 'domain-glossary-permissions';

  // given
  const permissionsRequired = ['data:get:message', 'data:set:message']
  const permissionsAssigned = ['data:get:*', 'data:set:message']

  // check that the role has each required permission
  const hasPermission = permissionsRequired.every((required) =>
    decideIsPermissionGranted({
      assigned: permissionsAssigned,
      required,
    }),
  );
  if (!hasPermission)
    log.warn(
      'user does not have access to do this action. cant represent them',
      {
        assigned: permissionsAssigned,
        required: permissionsRequired,
      },
    );
  return hasPermission;
```

