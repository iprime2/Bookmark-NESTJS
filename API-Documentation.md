# API Documentation

## Auth Controller

### Signup
- Endpoint: /auth/signup
- Method: POST
- Description: Create a new user account.
- Request Body:
- dto: AuthDto object containing the user's signup information.
- Response: Access token.

### Signin
- Endpoint: /auth/signin
- Method: POST
- Description: Authenticate a user and generate an access token.
- Request Body:
- dto: AuthSignInDto object containing the user's signin credentials.
- Response: Access token.

## User
### User Service
Edit User
- Endpoint: /users
- Method: PATCH
- Description: Edit user information.
- Request Body:
- dto: EditUserDto object containing the updated user information.
- Response: Updated user object.

### Get Me
- Endpoint: /users/me
- Method: GET
- Description: Get the currently authenticated user.
- Response: User object.

## Bookmark

### Create Bookmark
- Endpoint: /bookmarks
- Method: POST
- Description: Create a new bookmark.
- Request Body:
- dto: CreateBookmarkDto object containing the bookmark details.
- Response: Created bookmark object.

### Get Bookmarks
- Endpoint: /bookmarks
- Method: GET
- Description: Get all bookmarks for a user.
- Request Parameters:
- userId: User ID.
- Response: Array of bookmark objects.

### Get Bookmark by ID
- Endpoint: /bookmarks/:id
- Method: GET
- Description: Get a bookmark by its ID.
- Request Parameters:
- userId: User ID.
- bookmarkId: Bookmark ID.
- Response: Bookmark object.

### Edit Bookmark by ID
- Endpoint: /bookmarks/:id
- Method: PATCH
- Description: Edit a bookmark by its ID.
- Request Parameters:
- userId: User ID.
- bookmarkId: Bookmark ID.
- Request Body:
- dto: EditBookmarkDto object containing the updated bookmark information.
- Response: Updated bookmark object.

### Delete Bookmark by ID
- Endpoint: /bookmarks/:id
- Method: DELETE
- Description: Delete a bookmark by its ID.
- Request Parameters:
- userId: User ID.
- bookmarkId: Bookmark ID.
- Response: No content.


