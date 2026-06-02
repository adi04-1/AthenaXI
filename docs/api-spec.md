# AthenaXI — API Specification

Base URL: `https://athenaxi-api.onrender.com/api`

## Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /auth/register | Register new user |
| POST | /auth/login | Login, returns JWT |
| GET | /auth/me | Get current user info |

## Players
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /players | Get all players (filter: team, role) |
| GET | /players/{id} | Get player by ID |

## Team
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /team | Get my team |
| POST | /team | Submit team (one-time lock) |
| GET | /team/{userId} | Get another user's team (admin) |

## Transfers
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /transfers/window | Get current transfer window status |
| POST | /transfers | Submit a transfer |
| GET | /transfers/history | My transfer history |

## Scores & Leaderboard
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /leaderboard | All users ranked by total points |
| GET | /scores/me | My points breakdown by match |
| GET | /scores/player/{id} | Points history for a player |

## Admin
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /admin/sync | Manually trigger score sync |
| POST | /admin/transfer-window/{open|close} | Toggle transfer window |
