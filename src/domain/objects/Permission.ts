import { DomainLiteral } from 'domain-objects';

export enum PermissionEffect {
  ALLOW = 'ALLOW',
  BLOCK = 'BLOCK',
}

/**
 * a permission specifies whether or not an agent has the ability to perform some action on some resource
 */
export interface Permission {
  uuid?: string;

  /**
   * specifies whether the permission allows or blocks some action
   *
   * note
   * - by default, access to resources is denied
   *   - to allow access to a resource, you must set the effect to ALLOW
   * - the effect can be to BLOCK some action
   *   - to enable combining with a permission which allows everything except for one action
   *   - to override some default already set by some other setting
   */
  effect: PermissionEffect;

  /**
   * specifies the action that is enabled
   */
  action: string;

  /**
   * specifies the resource upon which the action is enabled
   */
  resource: string;
}
export class Permission
  extends DomainLiteral<Permission>
  implements Permission {}
