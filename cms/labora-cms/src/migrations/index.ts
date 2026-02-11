import * as migration_20260204_005658_add_skills_requeridas_only from './20260204_005658_add_skills_requeridas_only';

export const migrations = [
  {
    up: migration_20260204_005658_add_skills_requeridas_only.up,
    down: migration_20260204_005658_add_skills_requeridas_only.down,
    name: '20260204_005658_add_skills_requeridas_only'
  },
];
