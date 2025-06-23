import { decideIsPermissionGranted } from './decideIsPermissionGranted';

describe('decideIsPermissionGranted', () => {
  const cases: { assigned: string[]; required: string; decision: boolean }[] = [
    {
      assigned: ['data:get:crew'],
      required: 'data:get:crew',
      decision: true,
    },
    {
      assigned: ['data:get:crew'],
      required: 'data:set:crew',
      decision: false,
    },
    {
      assigned: ['data:get:crew', 'data:set:crew'],
      required: 'data:set:crew',
      decision: true,
    },
    {
      assigned: ['data:get:*'],
      required: 'data:get:crew',
      decision: true,
    },
    {
      assigned: ['data:get:*'],
      required: 'data:set:crew',
      decision: false,
    },
    {
      assigned: ['data:set:*'],
      required: 'data:set:crew',
      decision: true,
    },
    {
      assigned: ['data:get:crew'],
      required: 'data:get:profit',
      decision: false,
    },
    {
      assigned: ['*'],
      required: 'data:get:crew',
      decision: true,
    },
    {
      assigned: ['*'],
      required: 'data:get:*',
      decision: true,
    },
  ];

  cases.map((thisCase) =>
    test(`decides '${thisCase.decision}' when requires '${
      thisCase.required
    }' and assigned '${JSON.stringify(thisCase)}'`, () => {
      const decision = decideIsPermissionGranted({
        required: thisCase.required,
        assigned: thisCase.assigned,
      });
      expect(decision).toEqual(thisCase.decision);
    }),
  );
});
