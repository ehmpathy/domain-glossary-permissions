/**
 * decides whether permission is granted by checking whether the required permission is assigned
 *
 * note
 * - permissions must match exactly, with the only exception being `*` which is a wildcard that can be specified on the assigned permissions
 *
 * todo:
 * - generalize to `resource` vs `action`
 *
 * todo:
 * - support `allow` vs `deny`
 */
export const decideIsPermissionGranted = ({
  assigned,
  required,
}: {
  assigned: string[];
  required: string;
}): boolean => {
  // check exact match
  if (assigned.includes(required)) return true;

  // check wildcard match
  const assignedWithWildcards = assigned
    .filter((permission) => permission.endsWith('*')) // has a wildcard
    .map(
      (permission) => permission.replace(/\*$/, ''), // remove the trailing wildcard character
    );
  return assignedWithWildcards.some(
    (permission) => required.startsWith(permission), // check that it starts with the wildcard-ed permission
  );
};
