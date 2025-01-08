
# Scoreboard API Service

  

This document provides the specifications for the Scoreboard API Service. The service is designed to handle user score updates and display the top 10 user scores on a scoreboard. It includes functionalities to ensure live updates of scores and prevent unauthorized score increases.

  

## Table of Contents

  

1. [Overview](#overview)

2. [Diagram](#diagram)

3. [Endpoints](#endpoints)

4. [Database Schema](#database-schema)

5. [Authentication and Authorization](#authentication-and-authorization)

6. [WebSocket Integration for Live Updates](#websocket-integration-for-live-updates)

7. [Rate Limiting and Security Measures](#rate-limiting-and-security-measures)

8. [Error Handling](#error-handling)

8. [Improvements](#improvements)

  

## Overview

  

The Scoreboard API Service consists of the following functionalities:

  

- Updating user scores upon completion of a specific action.

- Displaying the top 10 user scores on the scoreboard.

- Ensuring live updates of the scoreboard.

- Preventing unauthorized score increases.

  

## Diagram

  

```plaintext

	[Client/Website] <----WebSocket----> [WebSocket Server]

			↑ 									↑

			| 									|

		REST API 							Reads/Updates

			| 									|

			↓ 									↓

	[API Gateway/Load Balancer] -----> [Application Server]

			| 									↑

		Authorization 							|

			↓ 									↓

	[Authentication Service] 				[Database]

```

Flow of execution:
1. User login to get authentication token (access token)
2. Call API /api/scores/leaderboard to get a list of top 10 highest score users.
3. Call API /api/scores/update along with an `actionId` to find a valid action to update user's score after attempting an action
4. Call websocket server to fetch seamlessly leaderboard scores.

## Endpoints

### 1. Get Top 10 Scores

  

**Endpoint:**  `GET /api/scores/leaderboard Authorization: Bearer {JWT_TOKEN}`

  

**Description:** This endpoint retrieves the top 10 user scores.

  

**Response:**

```json

{
	"leaderboard": [ 
		{ 
			"userId": "string", 
			"username": "string", 
			"score": number, 
			"rank": number, 
			"updatedAt": "ISO8601 timestamp" 
		} 
	], 
	"updatedAt": "ISO8601 timestamp"
}

```

### 1. Update User Score

  

**Endpoint:**  `POST /api/scores/update Authorization: Bearer {JWT_TOKEN}`


**Description:** This endpoint updates the user's score upon completion of an action.

  

**Request Body:**

```json

{

	"userId": "string",

	"actionId": "string",

	"increment": "number"

}

```
**Response:**

```json

{
	"success": boolean, 
	"newScore": number, 
	"rank": number,
	"updatedAt": "ISO8601 timestamp"
}

```

## Database Schema
```
-- Users Table
CREATE TABLE users (
    id UUID PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    rank INT DEFAULT 0,
    score BIGINT DEFAULT 0,
    updatedAt TIMESTAMP WITH TIME ZONE
);
```

## Authentication and Authorization
-   Use JWT (JSON Web Tokens) for authentication.
-   Each request to update the score should include a valid JWT token.
-   Implement middleware to verify the JWT token and authorize the request.

## WebSocket Integration for Live Updates
To ensure live updates of the scoreboard:

1.  Set up a WebSocket server.
2.  When a user's score is updated, broadcast the update to all connected clients.
3.  Clients should subscribe to the WebSocket server to receive real-time updates.
Example:
```
	WSS://api.domain.com/ws/leaderboard
	Query Parameters:
	- token: JWT token for authentication
```

## Rate Limiting and Security Measures
-   Implement rate limiting to prevent abuse (e.g., max 10 score updates per minute per user).
-   Use IP-based rate limiting and user-based rate limiting.
-   Validate the  `increment`  value to ensure it is within a reasonable range.
-   Log suspicious activities for further analysis.

## Security Measures
### 2.1 Request Authentication

-   All requests must include a valid JWT token
-   Tokens must be obtained through the authentication service
-   Tokens expire after 1 day
-   Rate limiting: 100 requests per minute per user

### 2.2 Score Update Validation

-   Each score update request must include:
    -   Valid action ID
    -   Server-side timestamp validation (±30 seconds tolerance)
    -   HMAC signature using shared secret
-   Score updates are atomic operations
-   Score history is maintained for audit purposes

## Error Handling
### 5.1 HTTP Status Codes

-   200: Success
-   400: Bad Request
-   401: Unauthorized
-   403: Forbidden
-   429: Too Many Requests
-   500: Internal Server Error

### 5.2 Error Response Format

```json
{ 
	"error": { 
		"code": "", 
		"message": "", 
		"details": {} // Optional additional information 
	} 
}
```

## Improvement
1. Add an index to the `score` field in the `user` table to enhance query performance, especially as the number of users increases rapidly.
2. Integrate Redis cache to boost the server's leaderboard query performance and temporarily store user access tokens.
3. Implement an auto-scaling mechanism to evenly distribute client requests across API and WebSocket servers. (AWS Auto-scaling group)