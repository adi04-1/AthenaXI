# AthenaXI — Data Models

## User
| Field | Type | Notes |
|-------|------|-------|
| Id | Guid | PK |
| Username | string | Unique |
| Email | string | Unique |
| PasswordHash | string | BCrypt |
| Role | enum | Admin / Player |
| CreatedAt | DateTime | |

## Player
| Field | Type | Notes |
|-------|------|-------|
| Id | Guid | PK |
| Name | string | |
| IPLTeam | string | e.g. CSK, MI |
| Role | enum | Batsman / Bowler / AllRounder / WicketKeeper |
| IsOverseas | bool | |

## UserTeam
| Field | Type | Notes |
|-------|------|-------|
| Id | Guid | PK |
| UserId | Guid | FK → User |
| IsLocked | bool | Locked after submission |
| CreatedAt | DateTime | |
| UpdatedAt | DateTime | |

## UserTeamPlayer
| Field | Type | Notes |
|-------|------|-------|
| Id | Guid | PK |
| UserTeamId | Guid | FK → UserTeam |
| PlayerId | Guid | FK → Player |
| Slot | enum | PlayingXI / Substitute |
| IsCaptain | bool | |
| IsViceCaptain | bool | |
| IsImpactPlayer | bool | |

## MatchEvent
| Field | Type | Notes |
|-------|------|-------|
| Id | Guid | PK |
| MatchNumber | int | 1–74 |
| MatchDate | DateTime | |
| Team1 | string | |
| Team2 | string | |
| IsTransferWindowOpen | bool | |
| ScrapedAt | DateTime | nullable |

## PlayerMatchPoints
| Field | Type | Notes |
|-------|------|-------|
| Id | Guid | PK |
| PlayerId | Guid | FK → Player |
| MatchEventId | Guid | FK → MatchEvent |
| BasePoints | decimal | Raw points before multiplier |
| Multiplier | decimal | 1x / 1.25x / 1.5x / 2x |
| FinalPoints | decimal | BasePoints × Multiplier |
| DidPlay | bool | |

## TransferLog
| Field | Type | Notes |
|-------|------|-------|
| Id | Guid | PK |
| UserId | Guid | FK → User |
| TransferWindow | int | 1, 2, or 3 |
| FromPlayerId | Guid | nullable |
| ToPlayerId | Guid | nullable |
| TransferType | enum | SwapXI / ChangeCaptain / ChangeVC / ChangeImpact |
| MadeAt | DateTime | |
