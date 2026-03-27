-- Add job application URL + job-specific fit target vectors.
alter table if exists "Jobs"
  add column if not exists "ApplyUrl" text,
  add column if not exists "TargetOpenness" numeric(5,1),
  add column if not exists "TargetConscientiousness" numeric(5,1),
  add column if not exists "TargetExtraversion" numeric(5,1),
  add column if not exists "TargetAgreeableness" numeric(5,1),
  add column if not exists "TargetEmotionalStability" numeric(5,1),
  add column if not exists "TargetRealistic" numeric(5,1),
  add column if not exists "TargetInvestigative" numeric(5,1),
  add column if not exists "TargetArtistic" numeric(5,1),
  add column if not exists "TargetSocial" numeric(5,1),
  add column if not exists "TargetEnterprising" numeric(5,1),
  add column if not exists "TargetConventional" numeric(5,1),
  add column if not exists "TargetAutonomy" numeric(5,1),
  add column if not exists "TargetSecurity" numeric(5,1),
  add column if not exists "TargetChallenge" numeric(5,1),
  add column if not exists "TargetService" numeric(5,1),
  add column if not exists "TargetWorkLifeBalance" numeric(5,1),
  add column if not exists "TargetPace" numeric(5,1),
  add column if not exists "TargetCollaboration" numeric(5,1),
  add column if not exists "TargetStructure" numeric(5,1);

-- Backfill seeded jobs with apply links and target vectors.
update "Jobs"
set
  "ApplyUrl" = 'https://example.com/jobs/senior-ux-designer',
  "TargetOpenness" = 90, "TargetConscientiousness" = 65, "TargetExtraversion" = 55, "TargetAgreeableness" = 70, "TargetEmotionalStability" = 65,
  "TargetRealistic" = 35, "TargetInvestigative" = 65, "TargetArtistic" = 90, "TargetSocial" = 70, "TargetEnterprising" = 40, "TargetConventional" = 30,
  "TargetAutonomy" = 75, "TargetSecurity" = 50, "TargetChallenge" = 70, "TargetService" = 65, "TargetWorkLifeBalance" = 70,
  "TargetPace" = 60, "TargetCollaboration" = 75, "TargetStructure" = 40
where "Id" = 1;

update "Jobs"
set
  "ApplyUrl" = 'https://example.com/jobs/product-manager',
  "TargetOpenness" = 80, "TargetConscientiousness" = 75, "TargetExtraversion" = 75, "TargetAgreeableness" = 65, "TargetEmotionalStability" = 70,
  "TargetRealistic" = 25, "TargetInvestigative" = 60, "TargetArtistic" = 45, "TargetSocial" = 65, "TargetEnterprising" = 85, "TargetConventional" = 45,
  "TargetAutonomy" = 75, "TargetSecurity" = 55, "TargetChallenge" = 80, "TargetService" = 55, "TargetWorkLifeBalance" = 55,
  "TargetPace" = 80, "TargetCollaboration" = 85, "TargetStructure" = 45
where "Id" = 2;

update "Jobs"
set
  "ApplyUrl" = 'https://example.com/jobs/data-scientist',
  "TargetOpenness" = 80, "TargetConscientiousness" = 80, "TargetExtraversion" = 35, "TargetAgreeableness" = 55, "TargetEmotionalStability" = 70,
  "TargetRealistic" = 40, "TargetInvestigative" = 95, "TargetArtistic" = 35, "TargetSocial" = 30, "TargetEnterprising" = 40, "TargetConventional" = 60,
  "TargetAutonomy" = 75, "TargetSecurity" = 65, "TargetChallenge" = 90, "TargetService" = 35, "TargetWorkLifeBalance" = 65,
  "TargetPace" = 60, "TargetCollaboration" = 50, "TargetStructure" = 50
where "Id" = 3;

update "Jobs"
set
  "ApplyUrl" = 'https://example.com/jobs/community-manager',
  "TargetOpenness" = 70, "TargetConscientiousness" = 65, "TargetExtraversion" = 78, "TargetAgreeableness" = 78, "TargetEmotionalStability" = 65,
  "TargetRealistic" = 15, "TargetInvestigative" = 40, "TargetArtistic" = 55, "TargetSocial" = 85, "TargetEnterprising" = 70, "TargetConventional" = 40,
  "TargetAutonomy" = 60, "TargetSecurity" = 45, "TargetChallenge" = 60, "TargetService" = 55, "TargetWorkLifeBalance" = 55,
  "TargetPace" = 75, "TargetCollaboration" = 80, "TargetStructure" = 40
where "Id" = 4;

update "Jobs"
set
  "ApplyUrl" = 'https://example.com/jobs/frontend-developer',
  "TargetOpenness" = 70, "TargetConscientiousness" = 75, "TargetExtraversion" = 35, "TargetAgreeableness" = 55, "TargetEmotionalStability" = 70,
  "TargetRealistic" = 50, "TargetInvestigative" = 75, "TargetArtistic" = 60, "TargetSocial" = 25, "TargetEnterprising" = 35, "TargetConventional" = 45,
  "TargetAutonomy" = 80, "TargetSecurity" = 55, "TargetChallenge" = 75, "TargetService" = 35, "TargetWorkLifeBalance" = 75,
  "TargetPace" = 65, "TargetCollaboration" = 45, "TargetStructure" = 45
where "Id" = 5;

update "Jobs"
set
  "ApplyUrl" = 'https://example.com/jobs/hr-business-partner',
  "TargetOpenness" = 60, "TargetConscientiousness" = 75, "TargetExtraversion" = 70, "TargetAgreeableness" = 80, "TargetEmotionalStability" = 70,
  "TargetRealistic" = 10, "TargetInvestigative" = 40, "TargetArtistic" = 20, "TargetSocial" = 85, "TargetEnterprising" = 65, "TargetConventional" = 60,
  "TargetAutonomy" = 55, "TargetSecurity" = 70, "TargetChallenge" = 55, "TargetService" = 75, "TargetWorkLifeBalance" = 65,
  "TargetPace" = 55, "TargetCollaboration" = 85, "TargetStructure" = 65
where "Id" = 6;

update "Jobs"
set
  "ApplyUrl" = 'https://example.com/jobs/technical-writer',
  "TargetOpenness" = 85, "TargetConscientiousness" = 65, "TargetExtraversion" = 40, "TargetAgreeableness" = 60, "TargetEmotionalStability" = 60,
  "TargetRealistic" = 15, "TargetInvestigative" = 55, "TargetArtistic" = 90, "TargetSocial" = 45, "TargetEnterprising" = 45, "TargetConventional" = 35,
  "TargetAutonomy" = 85, "TargetSecurity" = 40, "TargetChallenge" = 60, "TargetService" = 45, "TargetWorkLifeBalance" = 75,
  "TargetPace" = 50, "TargetCollaboration" = 35, "TargetStructure" = 30
where "Id" = 7;

update "Jobs"
set
  "ApplyUrl" = 'https://example.com/jobs/startup-cofounder',
  "TargetOpenness" = 85, "TargetConscientiousness" = 75, "TargetExtraversion" = 75, "TargetAgreeableness" = 45, "TargetEmotionalStability" = 70,
  "TargetRealistic" = 35, "TargetInvestigative" = 55, "TargetArtistic" = 50, "TargetSocial" = 50, "TargetEnterprising" = 95, "TargetConventional" = 30,
  "TargetAutonomy" = 95, "TargetSecurity" = 20, "TargetChallenge" = 90, "TargetService" = 50, "TargetWorkLifeBalance" = 30,
  "TargetPace" = 90, "TargetCollaboration" = 55, "TargetStructure" = 20
where "Id" = 8;
