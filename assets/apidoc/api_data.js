define({ "api": [
  {
    "type": "Post",
    "url": "/api/v1/app/hotel-booking",
    "title": "Hotel Booking",
    "version": "1.0.0",
    "name": "Hotel_Booking",
    "group": "Hotel",
    "parameter": {
      "examples": [
        {
          "title": "Request",
          "content": "{\"data\":{\"offerId\":\"37N5IHV2S5\",\"guests\":[{\"name\":{\"title\":\"MR\",\"firstName\":\"BOB\",\"lastName\":\"SMITH\"},\"contact\":{\"phone\":\"+33679278416\",\"email\":\"bob.smith@email.com\"}}],\"payments\":[{\"method\":\"creditCard\",\"card\":{\"vendorCode\":\"VI\",\"cardNumber\":\"4111111111111111\",\"expiryDate\":\"2023-01\"}}]}}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response",
          "content": "{\"status\":400,\"statusText\":\"VALIDATION_FAILED\",\"message\":\"Validation Failed!\",\"data\":{\"error\":[\"\\\"data.payments[0].method\\\" is required\"]}}",
          "type": "json"
        },
        {
          "title": "Error-Response",
          "content": "{\"status\":400,\"statusText\":\"VALIDATION_FAILED\",\"message\":\"Validation Failed!\",\"data\":{\"error\":[\"\\\"data.guests\\\" is required\"]}}",
          "type": "json"
        },
        {
          "title": "Error-Response",
          "content": "{\"status\":400,\"statusText\":\"NOT_ACCEPTABLE\",\"message\":\"OFFERID HAS EXPIRED. PLEASE GET A NEW OFFERID AND TRY AGAIN\",\"data\":{}}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response",
          "content": "{\"status\":200,\"statusText\":\"SUCCESS\",\"message\":\"Hotel Booked Successfully!\",\"data\":{\"type\":\"hotel-booking\",\"booking_id\":\"RT_5302WGJ506\",\"providerConfirmationId\":\"5302WGJ506\",\"time_stamp\":\"1658324271036\",\"_id\":\"62d8057617b28f1031fefec0\",\"associatedRecords\":[{\"reference\":\"J9VTY3\",\"originSystemCode\":\"GDS\",\"_id\":\"62d8057617b28f1031fefec1\"}],\"user_id\":\"62d79e8e16b1c36b308c607c\",\"created_at\":\"2022-07-20T13:39:02.592Z\",\"updatedAt\":\"2022-07-20T13:39:02.592Z\",\"__v\":0,\"id\":\"62d8057617b28f1031fefec0\"}}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/app/v1/HotelController.ts",
    "groupTitle": "Hotel"
  },
  {
    "type": "PUT",
    "url": "/api/v1/app/user/password-change",
    "title": "Change Password",
    "version": "1.0.0",
    "name": "Change_Password",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmRlNjE2OGYyMWRmNjljNTJkYTdiMjgiLCJmaXJzdF9uYW1lIjpudWxsLCJjcmVhdGVkX2F0IjoiMjAyMi0wNy0yNVQwOToyNDo1Ni45MzdaIiwiYWNjb3VudF9sb2NrZWQiOmZhbHNlLCJpYXQiOjE2NTg3NDExMjUsImV4cCI6MTY1ODg0MTEyNX0.PnqQqcEQQlOgqZj5MK_rMwCkQb0TZKM3yjv2K521ep0</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "old_password",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "new_password",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\"status\":400,\"statusText\":\"VALIDATION_FAILED\",\"message\":\"Validation Failed!\",\"data\":{\"error\":[\"\\\"old_password\\\" is required\"]}}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "{\"status\":400,\"statusText\":\"VALIDATION_FAILED\",\"message\":\"Validation Failed!\",\"data\":{\"error\":[\"\\\"new_password\\\" is required\"]}}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "{\"status\":406,\"statusText\":\"PASSWORD_NOT_MATCH\",\"message\":\"Invalid Old Password\",\"data\":{}}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\"status\":200,\"statusText\":\"SUCCESS\",\"message\":\"Password changed Successfully!\",\"data\":{\"user\":{\"otp\":{\"otp\":null,\"is_expired\":true,\"expiration_time\":1658984349771,\"is_verified\":true},\"email\":\"piyush15aug1997@gmail.com\",\"username\":\"lakshit15aug\",\"profile_verified\":true,\"ssid\":null,\"login_by\":\"manual\",\"first_name\":\"lakshittyagi\",\"middle_name\":\"dbrl\",\"profile_image\":\"profile_pictures/image_1658904496193.png\",\"is_profile_completed\":true,\"preferences\":[{\"_id\":\"62c7d1794b3b741658d74c2c\",\"name\":\"Outdoor\",\"id\":\"62c7d1794b3b741658d74c2c\"},{\"_id\":\"62c7d1964b3b741658d74c2f\",\"name\":\"Shopping\",\"id\":\"62c7d1964b3b741658d74c2f\"},{\"_id\":\"62c7d1a14b3b741658d74c32\",\"name\":\"Road Trip\",\"id\":\"62c7d1a14b3b741658d74c32\"}],\"last_name\":\"Tyagi\",\"phone\":3212345678,\"date_of_birth\":\"2000-12-12T00:00:00.000Z\",\"is_deleted\":true,\"delete_at\":1659781686596,\"last_login\":\"2022-08-01T11:20:56.464Z\",\"is_locked\":false,\"_id\":\"62de6168f21df69c52da7b28\",\"created_at\":\"2022-07-25T09:24:56.937Z\",\"updated_at\":\"2022-08-01T11:20:56.470Z\",\"__v\":6,\"id\":\"62de6168f21df69c52da7b28\"},\"token\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmRlNjE2OGYyMWRmNjljNTJkYTdiMjgiLCJmaXJzdF9uYW1lIjoibGFrc2hpdHR5YWdpIiwiY3JlYXRlZF9hdCI6IjIwMjItMDctMjVUMDk6MjQ6NTYuOTM3WiIsImFjY291bnRfbG9ja2VkIjpmYWxzZSwiaWF0IjoxNjU5MzUyODU2LCJleHAiOjE2NTk0NTI4NTZ9.XCfJ2HheGfvuNROg7rYsAX6fatPh4MCvnmfXMO8XtDA\"}}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/app/v1/UserController.ts",
    "groupTitle": "User"
  },
  {
    "type": "DELETE",
    "url": "/api/v1/app/user",
    "title": "DELETE ACCOUNT",
    "version": "1.0.0",
    "name": "DELETE_ACCOUNT",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Password",
            "description": ""
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmRlNjE2OGYyMWRmNjljNTJkYTdiMjgiLCJmaXJzdF9uYW1lIjpudWxsLCJjcmVhdGVkX2F0IjoiMjAyMi0wNy0yNVQwOToyNDo1Ni45MzdaIiwiYWNjb3VudF9sb2NrZWQiOmZhbHNlLCJpYXQiOjE2NTg3NDExMjUsImV4cCI6MTY1ODg0MTEyNX0.PnqQqcEQQlOgqZj5MK_rMwCkQb0TZKM3yjv2K521ep0</p>"
          }
        ]
      }
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\"status\":401,\"statusText\":\"JWT_NEEDED\",\"message\":\"User Not Authorized\",\"data\":{}}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "{\"status\":400,\"statusText\":\"VALIDATION_FAILED\",\"message\":\"Validation Failed!\",\"data\":{\"error\":[\"\\\"username\\\" is required\"]}}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "{\"status\":400,\"statusText\":\"VALIDATION_FAILED\",\"message\":\"Validation Failed!\",\"data\":{\"error\":[\"\\\"password\\\" is required\"]}}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "{\"status\":406,\"statusText\":\"FAILED\",\"message\":\"User Not Found\",\"data\":{}}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "{\"status\":406,\"statusText\":\"FAILED\",\"message\":\"Invalid Password\",\"data\":{}}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\"status\":200,\"statusText\":\"SUCCESS\",\"message\":\"Account will be deleted on Sat Aug 06 2022 12:58:36 GMT+0530 (India Standard Time)\",\"data\":{\"date\":\"2022-08-06T07:28:36.019Z\"}}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/app/v1/UserController.ts",
    "groupTitle": "User"
  },
  {
    "type": "GET",
    "url": "/api/v1/app/user/search/users",
    "title": "SEARCH USERS",
    "version": "1.0.0",
    "name": "SEARCH_USERS",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmRlNjE2OGYyMWRmNjljNTJkYTdiMjgiLCJmaXJzdF9uYW1lIjpudWxsLCJjcmVhdGVkX2F0IjoiMjAyMi0wNy0yNVQwOToyNDo1Ni45MzdaIiwiYWNjb3VudF9sb2NrZWQiOmZhbHNlLCJpYXQiOjE2NTg3NDExMjUsImV4cCI6MTY1ODg0MTEyNX0.PnqQqcEQQlOgqZj5MK_rMwCkQb0TZKM3yjv2K521ep0</p>"
          }
        ]
      }
    },
    "query": [
      {
        "group": "Query",
        "type": "String",
        "optional": false,
        "field": "search",
        "description": "<p>lakshit</p>"
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": false,
        "field": "page",
        "description": "<p>1</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\"status\":200,\"statusText\":\"Users\",\"message\":\"SUCCESS\",\"data\":{\"docs\":[{\"_id\":\"62da313a224b94872c790634\",\"email\":\"saikumar9@yopmail.com\",\"first_name\":\"sai\",\"middle_name\":\"\",\"profile_image\":null,\"last_name\":\"kumar\",\"phone\":123123123},{\"_id\":\"62da387b224b94872c790654\",\"email\":\"saikumar124@yopmail.com\",\"first_name\":\"sai\",\"middle_name\":\"\",\"last_name\":\"kumar\",\"phone\":123123123,\"profile_image\":\"https://buddypass-projects.s3.ap-south-1.amazonaws.com/profile_pictures/image_1658741096962.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT4D3K5TKBBTOVAY5%2F20220802%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20220802T123036Z&X-Amz-Expires=900&X-Amz-Signature=30c09bce07a50b4e1bff77a2b06aedc2d75eedbae9a18e53ffd3ee153c457bbd&X-Amz-SignedHeaders=host\"},{\"_id\":\"62de35576b862dfa04a3deaa\",\"email\":\"saikumar4@yopmail.com\",\"first_name\":\"sai\",\"middle_name\":\"\",\"profile_image\":null,\"last_name\":\"lunar\",\"phone\":123123123},{\"_id\":\"62e3739c7ecabc3975506420\",\"email\":\"saikumar12@yopmail.com\",\"first_name\":\"sai\",\"middle_name\":\"\",\"profile_image\":null,\"last_name\":\"kumar\",\"phone\":123123123}],\"totalDocs\":4,\"limit\":10,\"page\":1,\"totalPages\":1,\"pagingCounter\":1,\"hasPrevPage\":false,\"hasNextPage\":false,\"prevPage\":null,\"nextPage\":null}}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/app/v1/UserController.ts",
    "groupTitle": "User"
  },
  {
    "type": "GET",
    "url": "/api/v1/app/user/:62da387b224b94872c790654",
    "title": "User Details",
    "version": "1.0.0",
    "name": "User_Details",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmRlNjE2OGYyMWRmNjljNTJkYTdiMjgiLCJmaXJzdF9uYW1lIjpudWxsLCJjcmVhdGVkX2F0IjoiMjAyMi0wNy0yNVQwOToyNDo1Ni45MzdaIiwiYWNjb3VudF9sb2NrZWQiOmZhbHNlLCJpYXQiOjE2NTg3NDExMjUsImV4cCI6MTY1ODg0MTEyNX0.PnqQqcEQQlOgqZj5MK_rMwCkQb0TZKM3yjv2K521ep0</p>"
          }
        ]
      }
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\"status\":401,\"statusText\":\"JWT_NEEDED\",\"message\":\"User Not Authorized\",\"data\":{}}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\"status\":200,\"statusText\":\"SUCCESS\",\"message\":\"success!\",\"data\":{\"user\":{\"otp\":{\"otp\":null,\"is_expired\":false,\"expiration_time\":null,\"is_verified\":true},\"email\":\"piyush15aug1997@gmail.com\",\"username\":\"lakshit15aug\",\"profile_verified\":true,\"ssid\":null,\"login_by\":\"manual\",\"first_name\":\"Himans\",\"middle_name\":\"dbrl\",\"profile_image\":\"https://buddypass-projects.s3.ap-south-1.amazonaws.com/profile_pictures/image_1658741096962.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT4D3K5TKBBTOVAY5%2F20220725%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20220725T122748Z&X-Amz-Expires=900&X-Amz-Signature=62b72af3bc736206c9781a0a2e6767a68163691370d2a6820026fe9aec157bfe&X-Amz-SignedHeaders=host\",\"is_profile_completed\":true,\"preferences\":[{\"_id\":\"62c7d1794b3b741658d74c2c\",\"name\":\"Outdoor\",\"id\":\"62c7d1794b3b741658d74c2c\"},{\"_id\":\"62c7d1964b3b741658d74c2f\",\"name\":\"Shopping\",\"id\":\"62c7d1964b3b741658d74c2f\"},{\"_id\":\"62c7d1a14b3b741658d74c32\",\"name\":\"Road Trip\",\"id\":\"62c7d1a14b3b741658d74c32\"}],\"last_name\":\"dbrl\",\"phone\":1234567890,\"date_of_birth\":\"2000-12-12T00:00:00.000Z\",\"is_deleted\":false,\"last_login\":null,\"is_locked\":false,\"_id\":\"62de6168f21df69c52da7b28\",\"created_at\":\"2022-07-25T09:24:56.937Z\",\"updated_at\":\"2022-07-25T09:30:08.329Z\",\"__v\":1,\"id\":\"62de6168f21df69c52da7b28\"},\"meta\":{\"followersCount\":2,\"followingCount\":4,\"likes\":0,\"trips\":0}}}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/app/v1/UserController.ts",
    "groupTitle": "User"
  },
  {
    "type": "GET",
    "url": "/api/v1/app/user/followers",
    "title": "Get User Followers",
    "version": "1.0.0",
    "name": "User_Followers",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmRlNjE2OGYyMWRmNjljNTJkYTdiMjgiLCJmaXJzdF9uYW1lIjpudWxsLCJjcmVhdGVkX2F0IjoiMjAyMi0wNy0yNVQwOToyNDo1Ni45MzdaIiwiYWNjb3VudF9sb2NrZWQiOmZhbHNlLCJpYXQiOjE2NTg3NDExMjUsImV4cCI6MTY1ODg0MTEyNX0.PnqQqcEQQlOgqZj5MK_rMwCkQb0TZKM3yjv2K521ep0</p>"
          }
        ]
      }
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\"status\":401,\"statusText\":\"JWT_NEEDED\",\"message\":\"User Not Authorized\",\"data\":{}}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\"status\":200,\"statusText\":\"SUCCESS\",\"message\":\"Follower List!\",\"data\":{\"docs\":[{\"_id\":\"62de7551311174c78281fa82\",\"first_name\":\"sai\",\"middle_name\":\"\",\"last_name\":\"kumar\",\"profile_image\":\"https://buddypass-projects.s3.ap-south-1.amazonaws.com/profile_pictures/image_1658741096962.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT4D3K5TKBBTOVAY5%2F20220725%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20220725T123054Z&X-Amz-Expires=900&X-Amz-Signature=dc4b0ccf73c368a5ce083ea7c1adc5fb3aceb7ce2e41386b0f3091ba12ef27fb&X-Amz-SignedHeaders=host\",\"email\":\"saikumar124@yopmail.com\",\"follower_id\":\"62da387b224b94872c790654\"}],\"totalDocs\":1,\"limit\":10,\"page\":1,\"totalPages\":1,\"pagingCounter\":1,\"hasPrevPage\":false,\"hasNextPage\":false,\"prevPage\":null,\"nextPage\":null}}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/app/v1/UserController.ts",
    "groupTitle": "User"
  },
  {
    "type": "GET",
    "url": "/api/v1/app/user/followings",
    "title": "Get User Followings",
    "version": "1.0.0",
    "name": "User_Followings",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmRlNjE2OGYyMWRmNjljNTJkYTdiMjgiLCJmaXJzdF9uYW1lIjpudWxsLCJjcmVhdGVkX2F0IjoiMjAyMi0wNy0yNVQwOToyNDo1Ni45MzdaIiwiYWNjb3VudF9sb2NrZWQiOmZhbHNlLCJpYXQiOjE2NTg3NDExMjUsImV4cCI6MTY1ODg0MTEyNX0.PnqQqcEQQlOgqZj5MK_rMwCkQb0TZKM3yjv2K521ep0</p>"
          }
        ]
      }
    },
    "group": "User",
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\"status\":401,\"statusText\":\"JWT_NEEDED\",\"message\":\"User Not Authorized\",\"data\":{}}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\"status\":200,\"statusText\":\"SUCCESS\",\"message\":\"Following List!\",\"data\":{\"docs\":[{\"_id\":\"62de753e311174c78281fa81\",\"first_name\":\"sai\",\"middle_name\":\"\",\"last_name\":\"kumar\",\"profile_image\":\"https://buddypass-projects.s3.ap-south-1.amazonaws.com/profile_pictures/image_1658741096962.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT4D3K5TKBBTOVAY5%2F20220725%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20220725T123148Z&X-Amz-Expires=900&X-Amz-Signature=cd8ee67a14b2d934353e78236bad5b8579572e77f902785a9cd5ca1b483062cd&X-Amz-SignedHeaders=host\",\"email\":\"saikumar124@yopmail.com\",\"followee_id\":\"62da387b224b94872c790654\"}],\"totalDocs\":1,\"limit\":10,\"page\":1,\"totalPages\":1,\"pagingCounter\":1,\"hasPrevPage\":false,\"hasNextPage\":false,\"prevPage\":null,\"nextPage\":null}}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/app/v1/UserController.ts",
    "groupTitle": "User"
  },
  {
    "type": "GET",
    "url": "/api/v1/app/user",
    "title": "User Profile",
    "version": "1.0.0",
    "name": "User_Profile",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmRlNjE2OGYyMWRmNjljNTJkYTdiMjgiLCJmaXJzdF9uYW1lIjpudWxsLCJjcmVhdGVkX2F0IjoiMjAyMi0wNy0yNVQwOToyNDo1Ni45MzdaIiwiYWNjb3VudF9sb2NrZWQiOmZhbHNlLCJpYXQiOjE2NTg3NDExMjUsImV4cCI6MTY1ODg0MTEyNX0.PnqQqcEQQlOgqZj5MK_rMwCkQb0TZKM3yjv2K521ep0</p>"
          }
        ]
      }
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\"status\":401,\"statusText\":\"JWT_NEEDED\",\"message\":\"User Not Authorized\",\"data\":{}}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\"status\":200,\"statusText\":\"SUCCESS\",\"message\":\"success!\",\"data\":{\"user\":{\"otp\":{\"otp\":null,\"is_expired\":false,\"expiration_time\":null,\"is_verified\":true},\"email\":\"piyush15aug1997@gmail.com\",\"username\":\"lakshit15aug\",\"profile_verified\":true,\"ssid\":null,\"login_by\":\"manual\",\"first_name\":\"Himans\",\"middle_name\":\"dbrl\",\"profile_image\":\"https://buddypass-projects.s3.ap-south-1.amazonaws.com/profile_pictures/image_1658741096962.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT4D3K5TKBBTOVAY5%2F20220725%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20220725T122748Z&X-Amz-Expires=900&X-Amz-Signature=62b72af3bc736206c9781a0a2e6767a68163691370d2a6820026fe9aec157bfe&X-Amz-SignedHeaders=host\",\"is_profile_completed\":true,\"preferences\":[{\"_id\":\"62c7d1794b3b741658d74c2c\",\"name\":\"Outdoor\",\"id\":\"62c7d1794b3b741658d74c2c\"},{\"_id\":\"62c7d1964b3b741658d74c2f\",\"name\":\"Shopping\",\"id\":\"62c7d1964b3b741658d74c2f\"},{\"_id\":\"62c7d1a14b3b741658d74c32\",\"name\":\"Road Trip\",\"id\":\"62c7d1a14b3b741658d74c32\"}],\"last_name\":\"dbrl\",\"phone\":1234567890,\"date_of_birth\":\"2000-12-12T00:00:00.000Z\",\"is_deleted\":false,\"last_login\":null,\"is_locked\":false,\"_id\":\"62de6168f21df69c52da7b28\",\"created_at\":\"2022-07-25T09:24:56.937Z\",\"updated_at\":\"2022-07-25T09:30:08.329Z\",\"__v\":1,\"id\":\"62de6168f21df69c52da7b28\"},\"meta\":{\"followersCount\":2,\"followingCount\":4,\"likes\":0,\"trips\":0}}}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/app/v1/UserController.ts",
    "groupTitle": "User"
  },
  {
    "type": "POST",
    "url": "/api/v1/app/auth/contact",
    "title": "CONTACT US",
    "version": "1.0.0",
    "name": "CONATCT_US",
    "group": "User_Auth",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmRlNjE2OGYyMWRmNjljNTJkYTdiMjgiLCJmaXJzdF9uYW1lIjpudWxsLCJjcmVhdGVkX2F0IjoiMjAyMi0wNy0yNVQwOToyNDo1Ni45MzdaIiwiYWNjb3VudF9sb2NrZWQiOmZhbHNlLCJpYXQiOjE2NTg3NDExMjUsImV4cCI6MTY1ODg0MTEyNX0.PnqQqcEQQlOgqZj5MK_rMwCkQb0TZKM3yjv2K521ep0</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>lakshit.tyagi@mobilecoderz.com</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "subject",
            "description": "<p>Contact us email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "text",
            "description": "<p>This is the body of the email.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\"status\":200,\"statusText\":\"FAILED\",\"message\":\"Message not sent!\",\"data\":{}}",
          "type": "json"
        },
        {
          "title": "Success-Response:",
          "content": "{\"status\":200,\"statusText\":\"SUCCESS\",\"message\":\"Message sent!\",\"data\":{}}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\"status\":400,\"statusText\":\"VALIDATION_FAILED\",\"message\":\"Validation Failed!\",\"data\":{\"error\":[\"\\\"subject\\\" is required\"]}}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "{\"status\":400,\"statusText\":\"VALIDATION_FAILED\",\"message\":\"Validation Failed!\",\"data\":{\"error\":[\"\\\"email\\\" is required\"]}}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "{\"status\":400,\"statusText\":\"VALIDATION_FAILED\",\"message\":\"Validation Failed!\",\"data\":{\"error\":[\"\\\"text\\\" is required\"]}}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/app/v1/AuthController.ts",
    "groupTitle": "User_Auth"
  },
  {
    "type": "post",
    "url": "/api/v1/app/auth/complete-profile",
    "title": "Complete Profile",
    "version": "1.0.0",
    "name": "Complete_Profile",
    "group": "User_Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "first_name",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "middle_name",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "last_name",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "date_of_birth",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Request",
          "content": "{\"first_name\":\"Himans\",\"middle_name\":\"dbrl\",\"last_name\":\"dbrl\",\"phone\":\"1234567890\",\"date_of_birth\":\"2000-12-12\",\"preferences\":[\"62c7d1794b3b741658d74c2c\",\"62c7d1964b3b741658d74c2f\",\"62c7d1a14b3b741658d74c32\"]}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\"status\":400,\"statusText\":\"VALIDATION_FAILED\",\"message\":\"Validation Failed!\",\"data\":{\"error\":[\"\\\"date_of_birth\\\" is required\"]}}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\"status\":200,\"statusText\":\"SUCCESS\",\"message\":\"Successfully completed!\",\"data\":{\"user\":{\"otp\":{\"otp\":\"8252\",\"is_expired\":false,\"expiration_time\":1658120794819,\"is_verified\":true},\"email\":\"lakshit15aug@gmail.com\",\"username\":\"lakshit333\",\"ssid\":null,\"login_by\":\"manual\",\"first_name\":\"Himans\",\"middle_name\":\"dbrl\",\"profile_image\":null,\"is_profile_completed\":true,\"preferences\":[{\"_id\":\"62c7d1794b3b741658d74c2c\",\"name\":\"Outdoor\",\"id\":\"62c7d1794b3b741658d74c2c\"},{\"_id\":\"62c7d1964b3b741658d74c2f\",\"name\":\"Shopping\",\"id\":\"62c7d1964b3b741658d74c2f\"},{\"_id\":\"62c7d1a14b3b741658d74c32\",\"name\":\"Road Trip\",\"id\":\"62c7d1a14b3b741658d74c32\"}],\"last_name\":\"dbrl\",\"phone\":1234567890,\"date_of_birth\":\"2000-12-12T00:00:00.000Z\",\"is_deleted\":false,\"last_login\":null,\"is_locked\":false,\"_id\":\"62ce5a0a178669b9746f139a\",\"created_at\":\"2022-07-13T05:37:14.306Z\",\"updated_at\":\"2022-07-18T05:05:34.820Z\",\"__v\":1,\"loginBy\":\"manual\",\"id\":\"62ce5a0a178669b9746f139a\"}}}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/app/v1/AuthController.ts",
    "groupTitle": "User_Auth"
  },
  {
    "type": "PUT",
    "url": "/api/v1/app/auth/update-profile",
    "title": "EDIT USER PROFILE",
    "version": "1.0.0",
    "name": "EDIT_USER_PROFILE",
    "group": "User_Auth",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmRlNjE2OGYyMWRmNjljNTJkYTdiMjgiLCJmaXJzdF9uYW1lIjpudWxsLCJjcmVhdGVkX2F0IjoiMjAyMi0wNy0yNVQwOToyNDo1Ni45MzdaIiwiYWNjb3VudF9sb2NrZWQiOmZhbHNlLCJpYXQiOjE2NTg3NDExMjUsImV4cCI6MTY1ODg0MTEyNX0.PnqQqcEQQlOgqZj5MK_rMwCkQb0TZKM3yjv2K521ep0</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>lakshit2021</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>lakshit.tyagi@mobilecoderz.com</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "first_name",
            "description": "<p>Lakshit</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "last_name",
            "description": "<p>Tyagi</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>1234567890</p>"
          },
          {
            "group": "Parameter",
            "type": "File",
            "optional": false,
            "field": "profile_image",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\"status\":200,\"statusText\":\"SUCCESS\",\"message\":\"You have updated your profile successfully!\",\"data\":{\"user\":{\"otp\":{\"otp\":\"3322\",\"is_expired\":false,\"expiration_time\":1659604761089,\"is_verified\":true},\"email\":\"piyush15aug1997@gmail.com\",\"username\":\"lakshit15aug\",\"profile_verified\":true,\"ssid\":null,\"login_by\":\"manual\",\"first_name\":\"lakshittyagi\",\"middle_name\":\"dbrl\",\"profile_image\":\"https://buddypass-projects.s3.ap-south-1.amazonaws.com/profile_pictures/image_1658904496193.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT4D3K5TKBBTOVAY5%2F20220804%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20220804T123213Z&X-Amz-Expires=900&X-Amz-Signature=11c364f582d1efebd1082c1b7f2cdbae694091bcdd916a5e20d711c065de61a9&X-Amz-SignedHeaders=host\",\"is_profile_completed\":true,\"preferences\":[{\"_id\":\"62c7d1794b3b741658d74c2c\",\"name\":\"Outdoor\",\"id\":\"62c7d1794b3b741658d74c2c\"},{\"_id\":\"62c7d1964b3b741658d74c2f\",\"name\":\"Shopping\",\"id\":\"62c7d1964b3b741658d74c2f\"},{\"_id\":\"62c7d1a14b3b741658d74c32\",\"name\":\"Road Trip\",\"id\":\"62c7d1a14b3b741658d74c32\"}],\"last_name\":\"Tyagi\",\"phone\":3212345678,\"date_of_birth\":\"2000-12-12T00:00:00.000Z\",\"is_deleted\":true,\"delete_at\":1660042025914,\"last_login\":\"2022-08-04T10:46:43.805Z\",\"is_locked\":false,\"_id\":\"62de6168f21df69c52da7b28\",\"created_at\":\"2022-07-25T09:24:56.937Z\",\"updated_at\":\"2022-08-04T12:32:13.666Z\",\"__v\":7,\"id\":\"62de6168f21df69c52da7b28\"}}}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\"status\":409,\"statusText\":\"CONFLICT\",\"message\":\"Username not available!\",\"data\":{}}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "{\"status\":409,\"statusText\":\"CONFLICT\",\"message\":\"email not available!\",\"data\":{}}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/app/v1/AuthController.ts",
    "groupTitle": "User_Auth"
  },
  {
    "type": "Post",
    "url": "/api/v1/app/preferences/mass-follow",
    "title": "Follow Multiple Users",
    "version": "1.0.0",
    "name": "Follow_Multiple_Users",
    "group": "User_Auth",
    "parameter": {
      "examples": [
        {
          "title": "Request",
          "content": "{\"interests\": [\"62c811dfa791fa3e38038702\",\"62c81a7b5eb840839c0938a7\",\"62cbacd55eb840839c0938ac\"]}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Error-Response",
          "content": "{\"status\":200,\"statusText\":\"SUCCESS\",\"message\":\"User un-followed successfully!\",\"data\":{}}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/app/v1/PreferenceController.ts",
    "groupTitle": "User_Auth"
  },
  {
    "type": "Post",
    "url": "/api/v1/app/preferences/follow-users",
    "title": "Follow User",
    "version": "1.0.0",
    "name": "Follow_Preferred_User",
    "group": "User_Auth",
    "parameter": {
      "examples": [
        {
          "title": "Request",
          "content": "{\"interests\": \"62c574c5c6bc13245c35c037\"}",
          "type": "json"
        }
      ],
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "interests",
            "description": "<p>62c574c5c6bc13245c35c037</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Error-Response",
          "content": "{\"status\":200,\"statusText\":\"SUCCESS\",\"message\":\"Followed user successfully!\",\"data\":{\"_id\":\"62cc287464dc1923a0695abc\",\"followee\":\"62c574c5c6bc13245c35c037\",\"follower\":\"62c811dfa791fa3e38038702\",\"created_at\":\"2022-07-11T13:41:08.385Z\",\"updated_at\":\"2022-07-11T13:41:08.385Z\",\"__v\":0}}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/app/v1/PreferenceController.ts",
    "groupTitle": "User_Auth"
  },
  {
    "type": "put",
    "url": "/api/v1/app/auth/password/forget",
    "title": "Forget Password",
    "version": "1.0.0",
    "name": "Forget_Password",
    "group": "User_Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "email",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Request",
          "content": "{\"email\": \"something@something.com\"}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\"status\":400,\"statusText\":\"VALIDATION_FAILED\",\"message\":\"Validation Failed!\",\"data\":{\"error\":[\"\\\"email\\\" must be a valid email\"]}}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "{\"status\":400,\"statusText\":\"VALIDATION_FAILED\",\"message\":\"Validation Failed!\",\"data\":{\"error\":[\"\\\"email\\\" is required\"]}}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "{\"status\":400,\"statusText\":\"NOT_FOUND\",\"message\":\"User not found!\",\"data\":{}}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\"status\":200,\"statusText\":\"SUCCESS\",\"message\":\"Otp send to email address successfully!\",\"data\":{\"data\":{\"otp\":6018,\"is_expired\":false,\"expiration_time\":1657705752291,\"is_verified\":true}}}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/app/v1/AuthController.ts",
    "groupTitle": "User_Auth"
  },
  {
    "type": "put",
    "url": "/api/v1/app/auth/password/verify-otp",
    "title": "Forget Password Verify Otp",
    "version": "1.0.0",
    "name": "Forget_Password_Verify_Otp",
    "group": "User_Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "email",
            "description": ""
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "otp",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Request",
          "content": "{\"email\": \"something@something.com\", \"otp\": \"6018\"}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\"status\":400,\"statusText\":\"VALIDATION_FAILED\",\"message\":\"Validation Failed!\",\"data\":{\"error\":[\"\\\"email\\\" is required\"]}}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "{\"status\":400,\"statusText\":\"VALIDATION_FAILED\",\"message\":\"Validation Failed!\",\"data\":{\"error\":[\"\\\"otp\\\" is required\"]}}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "{\"status\":400,\"statusText\":\"NOT_FOUND\",\"message\":\"User not found!\",\"data\":{}}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "{\"status\":400,\"statusText\":\"INVALID_OTP\",\"message\":\"Invalid Otp!\",\"data\":{}}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "{\"status\":400,\"statusText\":\"INVALID_OTP\",\"message\":\"Invalid Otp!\",\"data\":{}}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "{\"status\":400,\"statusText\":\"EXPIRED_OTP\",\"message\":\"Expired Otp\",\"data\":{}}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\"status\":200,\"statusText\":\"SUCCESS\",\"message\":\"OTP verified successfully!\",\"data\":{}}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/app/v1/AuthController.ts",
    "groupTitle": "User_Auth"
  },
  {
    "type": "put",
    "url": "/api/v1/app/auth/username/forget",
    "title": "Forget Username",
    "version": "1.0.0",
    "name": "Forget_Username",
    "group": "User_Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "email",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Request",
          "content": "{\"email\": \"something@something.com\"}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\"status\":400,\"statusText\":\"VALIDATION_FAILED\",\"message\":\"Validation Failed!\",\"data\":{\"error\":[\"\\\"email\\\" is required\"]}}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "{\"status\":400,\"statusText\":\"VALIDATION_FAILED\",\"message\":\"Validation Failed!\",\"data\":{\"error\":[\"\\\"email\\\" must be a valid email\"]}}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "{\"status\":400,\"statusText\":\"NOT_FOUND\",\"message\":\"User not found!\",\"data\":{}}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\"status\":200,\"statusText\":\"SUCCESS\",\"message\":\"Otp send to email address successfully!\",\"data\":{\"data\":{\"otp\":6568,\"is_expired\":false,\"expiration_time\":1657794940405,\"is_verified\":true}}}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/app/v1/AuthController.ts",
    "groupTitle": "User_Auth"
  },
  {
    "type": "get",
    "url": "/api/v1/app/preferences/",
    "title": "Preferences",
    "version": "1.0.0",
    "name": "GET_Preferences",
    "group": "User_Auth",
    "success": {
      "examples": [
        {
          "title": "Error-Response",
          "content": "{\"status\":200,\"statusText\":\"SUCCESS\",\"message\":\"Preferences List\",\"data\":{\"preferences\":[{\"_id\":\"62c7d1794b3b741658d74c2c\",\"name\":\"Outdoor\",\"created_at\":\"2022-07-08T06:40:57.561Z\",\"updated_at\":\"2022-07-08T06:40:57.561Z\",\"__v\":0,\"id\":\"62c7d1794b3b741658d74c2c\"},{\"_id\":\"62c7d1964b3b741658d74c2f\",\"name\":\"Shopping\",\"created_at\":\"2022-07-08T06:41:26.372Z\",\"updated_at\":\"2022-07-08T06:41:26.372Z\",\"__v\":0,\"id\":\"62c7d1964b3b741658d74c2f\"},{\"_id\":\"62c7d1a14b3b741658d74c32\",\"name\":\"Road Trip\",\"created_at\":\"2022-07-08T06:41:37.500Z\",\"updated_at\":\"2022-07-08T06:41:37.500Z\",\"__v\":0,\"id\":\"62c7d1a14b3b741658d74c32\"},{\"_id\":\"62c7d1b14b3b741658d74c35\",\"name\":\"Kids and Family\",\"created_at\":\"2022-07-08T06:41:53.305Z\",\"updated_at\":\"2022-07-08T06:41:53.305Z\",\"__v\":0,\"id\":\"62c7d1b14b3b741658d74c35\"},{\"_id\":\"62c7d1cd4b3b741658d74c38\",\"name\":\"Socially Distant\",\"created_at\":\"2022-07-08T06:42:21.574Z\",\"updated_at\":\"2022-07-08T06:42:21.574Z\",\"__v\":0,\"id\":\"62c7d1cd4b3b741658d74c38\"},{\"_id\":\"62c7d1e34b3b741658d74c3b\",\"name\":\"Off the beaten path\",\"created_at\":\"2022-07-08T06:42:43.814Z\",\"updated_at\":\"2022-07-08T06:42:43.814Z\",\"__v\":0,\"id\":\"62c7d1e34b3b741658d74c3b\"},{\"_id\":\"62c7d1f64b3b741658d74c3e\",\"name\":\"Staycation\",\"created_at\":\"2022-07-08T06:43:02.767Z\",\"updated_at\":\"2022-07-08T06:43:02.767Z\",\"__v\":0,\"id\":\"62c7d1f64b3b741658d74c3e\"},{\"_id\":\"62c7d2024b3b741658d74c41\",\"name\":\"Solo Trevel\",\"created_at\":\"2022-07-08T06:43:14.272Z\",\"updated_at\":\"2022-07-08T06:43:14.272Z\",\"__v\":0,\"id\":\"62c7d2024b3b741658d74c41\"},{\"_id\":\"62c7d20d4b3b741658d74c44\",\"name\":\"Girls Trip\",\"created_at\":\"2022-07-08T06:43:25.788Z\",\"updated_at\":\"2022-07-08T06:43:25.788Z\",\"__v\":0,\"id\":\"62c7d20d4b3b741658d74c44\"},{\"_id\":\"62c7d2174b3b741658d74c47\",\"name\":\"Guys Trip\",\"created_at\":\"2022-07-08T06:43:35.020Z\",\"updated_at\":\"2022-07-08T06:43:35.020Z\",\"__v\":0,\"id\":\"62c7d2174b3b741658d74c47\"},{\"_id\":\"62c7d2234b3b741658d74c4a\",\"name\":\"Culture\",\"created_at\":\"2022-07-08T06:43:47.038Z\",\"updated_at\":\"2022-07-08T06:43:47.038Z\",\"__v\":0,\"id\":\"62c7d2234b3b741658d74c4a\"},{\"_id\":\"62c7d2314b3b741658d74c4d\",\"name\":\"Senior Trevel\",\"created_at\":\"2022-07-08T06:44:01.389Z\",\"updated_at\":\"2022-07-08T06:44:01.389Z\",\"__v\":0,\"id\":\"62c7d2314b3b741658d74c4d\"},{\"_id\":\"62c7d2444b3b741658d74c50\",\"name\":\"Foodie\",\"created_at\":\"2022-07-08T06:44:20.225Z\",\"updated_at\":\"2022-07-08T06:44:20.225Z\",\"__v\":0,\"id\":\"62c7d2444b3b741658d74c50\"},{\"_id\":\"62c7d2504b3b741658d74c53\",\"name\":\"Convention\",\"created_at\":\"2022-07-08T06:44:32.797Z\",\"updated_at\":\"2022-07-08T06:44:32.797Z\",\"__v\":0,\"id\":\"62c7d2504b3b741658d74c53\"},{\"_id\":\"62c7d2744b3b741658d74c56\",\"name\":\"Collage & University\",\"created_at\":\"2022-07-08T06:45:08.444Z\",\"updated_at\":\"2022-07-08T06:45:08.444Z\",\"__v\":0,\"id\":\"62c7d2744b3b741658d74c56\"},{\"_id\":\"62c7d2804b3b741658d74c59\",\"name\":\"Luxury\",\"created_at\":\"2022-07-08T06:45:20.391Z\",\"updated_at\":\"2022-07-08T06:45:20.391Z\",\"__v\":0,\"id\":\"62c7d2804b3b741658d74c59\"},{\"_id\":\"62c7d2954b3b741658d74c5c\",\"name\":\"Music & Theater\",\"created_at\":\"2022-07-08T06:45:41.182Z\",\"updated_at\":\"2022-07-08T06:45:41.182Z\",\"__v\":0,\"id\":\"62c7d2954b3b741658d74c5c\"},{\"_id\":\"62c7d2bd4b3b741658d74c5f\",\"name\":\"Sports\",\"created_at\":\"2022-07-08T06:46:21.346Z\",\"updated_at\":\"2022-07-08T06:46:21.346Z\",\"__v\":0,\"id\":\"62c7d2bd4b3b741658d74c5f\"}]}}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/app/v1/PreferenceController.ts",
    "groupTitle": "User_Auth"
  },
  {
    "type": "post",
    "url": "/api/v1/app/auth/verify-otp",
    "title": "OTP VERIFICATION",
    "version": "1.0.0",
    "name": "OTP_VERIFICATION",
    "group": "User_Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "email",
            "description": ""
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "otp",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Request",
          "content": "{\"email\":\"lakshit1012@yopmal.com\",\"otp\":3397}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\"status\":200,\"statusText\":\"SUCCESS\",\"message\":\"Logged in successfully\",\"data\":{\"user\":{\"otp\":{\"otp\":null,\"is_expired\":false,\"expiration_time\":null,\"is_verified\":true},\"email\":\"lakshit1012@yopmal.com\",\"username\":\"lakshit1012\",\"first_name\":null,\"middle_name\":null,\"profile_image\":null,\"is_profile_completed\":false,\"last_name\":null,\"phone\":null,\"date_of_birth\":null,\"is_deleted\":false,\"is_locked\":false,\"_id\":\"62c51f9dd9f7c73adce23799\",\"created_at\":\"2022-07-06T05:37:33.034Z\",\"updated_at\":\"2022-07-06T08:08:10.550Z\",\"__v\":0,\"id\":\"62c51f9dd9f7c73adce23799\"},\"token\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmM1MWY5ZGQ5ZjdjNzNhZGNlMjM3OTkiLCJmaXJzdF9uYW1lIjpudWxsLCJjcmVhdGVkX2F0IjoiMjAyMi0wNy0wNlQwNTozNzozMy4wMzRaIiwiYWNjb3VudF9sb2NrZWQiOmZhbHNlLCJpYXQiOjE2NTcwOTQ5MTYsImV4cCI6MTY1NzE5NDkxNn0.e3W0r7nOh_iANR5ZX3ZPm9DuMNdqdk4STb8RB827wgM\"}}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\"status\":400,\"statusText\":\"BAD_REQUEST\",\"message\":\"Invalid Otp Provided!\",\"data\":{}}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "{\"status\":400,\"statusText\":\"BAD_REQUEST\",\"message\":\"User not found!\",\"data\":{}}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "{\"status\":400,\"statusText\":\"BAD_REQUEST\",\"message\":\"Provided Otp has been expired!\",\"data\":{}}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/app/v1/AuthController.ts",
    "groupTitle": "User_Auth"
  },
  {
    "type": "Get",
    "url": "/api/v1/app/preferences/users",
    "title": "Preferred Users",
    "version": "1.0.0",
    "name": "Preferred_Users",
    "group": "User_Auth",
    "success": {
      "examples": [
        {
          "title": "Error-Response",
          "content": "{\"status\":200,\"statusText\":\"SUCCESS\",\"message\":\"Success\",\"data\":{\"docs\":[{\"_id\":\"62c7c58677b86b2a6428d1dd\",\"first_name\":\"Lakshit\",\"last_name\":\"Tyagi\",\"email\":\"lakshit001@yopmal.com\",\"profile_image\":null},{\"_id\":\"62c811dfa791fa3e38038702\",\"first_name\":\"shubahm\",\"last_name\":\"dbrl\",\"email\":\"lakshit002@yopmal.com\",\"profile_image\":null}],\"totalDocs\":2,\"limit\":10,\"page\":1,\"totalPages\":1,\"pagingCounter\":1,\"hasPrevPage\":false,\"hasNextPage\":false,\"prevPage\":null,\"nextPage\":null}}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/app/v1/PreferenceController.ts",
    "groupTitle": "User_Auth"
  },
  {
    "type": "PUT",
    "url": "/api/v1/app/auth/resend-otp",
    "title": "RESEND OTP",
    "version": "1.0.0",
    "name": "Resend_OTP",
    "group": "User_Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "type",
            "description": "<p>FORGET_PASSWORD, FORGET_USERNAME, USER_REGISTER,&quot;ACCOUNT_UNLOCK&quot;</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request",
          "content": "{  \"email\":\"lakshit15aug@gmail.com\",\"type\": \"FORGET_PASSWORD\"}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\"status\":400,\"statusText\":\"VALIDATION_FAILED\",\"message\":\"Validation Failed!\",\"data\":{\"error\":[\"\\\"type\\\" must be one of [FORGET_PASSWORD, FORGET_USERNAME, USER_REGISTER]\"]}}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\"status\":200,\"statusText\":\"SUCCESS\",\"message\":\"Otp send to email successfully!\",\"data\":{\"data\":{\"otp\":\"7848\",\"is_expired\":false,\"expiration_time\":1658213376973,\"is_verified\":true}}}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/app/v1/AuthController.ts",
    "groupTitle": "User_Auth"
  },
  {
    "type": "Post",
    "url": "/api/v1/app/auth/password/reset",
    "title": "Password Reset",
    "version": "1.0.0",
    "name": "Reset_Password",
    "group": "User_Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "email",
            "description": ""
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "password",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Request",
          "content": "{\"email\": \"something@something.com\", \"password\": \"6018\"}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\"status\":400,\"statusText\":\"VALIDATION_FAILED\",\"message\":\"Validation Failed!\",\"data\":{\"error\":[\"\\\"email\\\" is required\"]}}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "{\"status\":400,\"statusText\":\"VALIDATION_FAILED\",\"message\":\"Validation Failed!\",\"data\":{\"error\":[\"\\\"email\\\" must be a valid email\"]}}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "{\"status\":400,\"statusText\":\"VALIDATION_FAILED\",\"message\":\"Validation Failed!\",\"data\":{\"error\":[\"\\\"password\\\" is required\"]}}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "{\"status\":400,\"statusText\":\"NOT_FOUND\",\"message\":\"No User found!\",\"data\":{}}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\"status\":200,\"statusText\":\"SUCCESS\",\"message\":\"Password changed successfully!\",\"data\":{}}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/app/v1/AuthController.ts",
    "groupTitle": "User_Auth"
  },
  {
    "type": "put",
    "url": "/api/v1/app/auth/username/reset",
    "title": "Username Reset",
    "version": "1.0.0",
    "name": "Reset_Username",
    "group": "User_Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "username",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Request",
          "content": "{\"email\": \"something@something.com\", \"username\": \"lakshit6018\"}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\"status\":400,\"statusText\":\"VALIDATION_FAILED\",\"message\":\"Validation Failed!\",\"data\":{\"error\":[\"\\\"email\\\" is required\"]}}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "{\"status\":400,\"statusText\":\"VALIDATION_FAILED\",\"message\":\"Validation Failed!\",\"data\":{\"error\":[\"\\\"email\\\" must be a valid email\"]}}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "{\"status\":400,\"statusText\":\"VALIDATION_FAILED\",\"message\":\"Validation Failed!\",\"data\":{\"error\":[\"\\\"username\\\" is required\"]}}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "{\"status\":409,\"statusText\":\"CONFLICT\",\"message\":\"Username not available\",\"data\":{}}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\"status\":200,\"statusText\":\"SUCCESS\",\"message\":\"Username Added Successfully!\",\"data\":{}}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/app/v1/AuthController.ts",
    "groupTitle": "User_Auth"
  },
  {
    "type": "post",
    "url": "api/v1/app/auth/social/login",
    "title": "Social Login",
    "version": "1.0.0",
    "name": "Social_Login",
    "group": "User_Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "ssid",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "login_by",
            "description": "<p>google,apple</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request",
          "content": "{\"ssid\": \"shsgdh\",\"login_by\": \"google\"}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\"status\":205,\"statusText\":\"NO_USER_AVAILABLE\",\"message\":\"No User available!\",\"data\":{}}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\"status\":200,\"statusText\":\"SUCCESS\",\"message\":\"Logged in successfully\",\"data\":{\"user\":{\"otp\":{\"otp\":null,\"is_expired\":false,\"expiration_time\":null,\"is_verified\":false},\"email\":\"shunham@hhh.com\",\"username\":\"shubham123\",\"ssid\":\"shubham123\",\"login_by\":\"google\",\"first_name\":null,\"middle_name\":null,\"profile_image\":null,\"is_profile_completed\":false,\"preferences\":[],\"last_name\":null,\"phone\":null,\"date_of_birth\":null,\"is_deleted\":false,\"last_login\":null,\"is_locked\":false,\"_id\":\"62d14a40c7d9d000c03d859b\",\"created_at\":\"2022-07-15T11:06:40.420Z\",\"updated_at\":\"2022-07-15T11:06:40.420Z\",\"__v\":0,\"id\":\"62d14a40c7d9d000c03d859b\"},\"token\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmQxNGE0MGM3ZDlkMDAwYzAzZDg1OWIiLCJmaXJzdF9uYW1lIjpudWxsLCJjcmVhdGVkX2F0IjoiMjAyMi0wNy0xNVQxMTowNjo0MC40MjBaIiwiYWNjb3VudF9sb2NrZWQiOmZhbHNlLCJpYXQiOjE2NTc4ODQxODEsImV4cCI6MTY1Nzk4NDE4MX0.5XB4aKeXQ5XOCbU0x-yxBKwB7MO4OJ6ny1ZKl34H2M0\"}}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/app/v1/AuthController.ts",
    "groupTitle": "User_Auth"
  },
  {
    "type": "post",
    "url": "/api/v1/app/auth/social/register",
    "title": "Social Register",
    "version": "1.0.0",
    "name": "Social_Register",
    "group": "User_Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "username",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "ssid",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "login_by",
            "description": "<p>google,apple</p>"
          }
        ]
      }
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\"status\":400,\"statusText\":\"VALIDATION_FAILED\",\"message\":\"Validation Failed!\",\"data\":{\"error\":[\"\\\"login_by\\\" is required\"]}}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "{\"status\":400,\"statusText\":\"VALIDATION_FAILED\",\"message\":\"Validation Failed!\",\"data\":{\"error\":[\"\\\"ssid\\\" is required\"]}}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "{\"status\":400,\"statusText\":\"VALIDATION_FAILED\",\"message\":\"Validation Failed!\",\"data\":{\"error\":[\"\\\"username\\\" is required\"]}}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "{\"status\":409,\"statusText\":\"CONFLICT\",\"message\":\"Username not available\",\"data\":{}}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\"status\":200,\"statusText\":\"SUCCESS\",\"message\":\"Logged in successfully\",\"data\":{\"user\":{\"otp\":{\"otp\":null,\"is_expired\":false,\"expiration_time\":null,\"is_verified\":false},\"email\":\"shunham@hhh.com\",\"username\":\"shubham123\",\"ssid\":\"shubham123\",\"login_by\":\"google\",\"first_name\":null,\"middle_name\":null,\"profile_image\":null,\"is_profile_completed\":false,\"preferences\":[],\"last_name\":null,\"phone\":null,\"date_of_birth\":null,\"is_deleted\":false,\"last_login\":null,\"is_locked\":false,\"_id\":\"62d14a40c7d9d000c03d859b\",\"created_at\":\"2022-07-15T11:06:40.420Z\",\"updated_at\":\"2022-07-15T11:06:40.420Z\",\"__v\":0,\"id\":\"62d14a40c7d9d000c03d859b\"},\"token\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmQxNGE0MGM3ZDlkMDAwYzAzZDg1OWIiLCJmaXJzdF9uYW1lIjpudWxsLCJjcmVhdGVkX2F0IjoiMjAyMi0wNy0xNVQxMTowNjo0MC40MjBaIiwiYWNjb3VudF9sb2NrZWQiOmZhbHNlLCJpYXQiOjE2NTc4ODM5OTEsImV4cCI6MTY1Nzk4Mzk5MX0.GqPST_WDwFTBPjDK_JYh7srE_XJc95du7jtGaNgha9U\"}}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/app/v1/AuthController.ts",
    "groupTitle": "User_Auth"
  },
  {
    "type": "Post",
    "url": "/api/v1/app/preferences/",
    "title": "Preferences",
    "version": "1.0.0",
    "name": "Store_Preferences",
    "group": "User_Auth",
    "success": {
      "examples": [
        {
          "title": "Error-Response",
          "content": "{\"status\":201,\"statusText\":\"CREATED\",\"message\":\"Created\",\"data\":{\"preferences\":[{\"_id\":\"62c7d1794b3b741658d74c2c\",\"name\":\"Outdoor\",\"created_at\":\"2022-07-08T06:40:57.561Z\",\"updated_at\":\"2022-07-08T06:40:57.561Z\",\"__v\":0,\"id\":\"62c7d1794b3b741658d74c2c\"},{\"_id\":\"62c7d1964b3b741658d74c2f\",\"name\":\"Shopping\",\"created_at\":\"2022-07-08T06:41:26.372Z\",\"updated_at\":\"2022-07-08T06:41:26.372Z\",\"__v\":0,\"id\":\"62c7d1964b3b741658d74c2f\"},{\"_id\":\"62c7d1a14b3b741658d74c32\",\"name\":\"Road Trip\",\"created_at\":\"2022-07-08T06:41:37.500Z\",\"updated_at\":\"2022-07-08T06:41:37.500Z\",\"__v\":0,\"id\":\"62c7d1a14b3b741658d74c32\"},{\"_id\":\"62c7d1b14b3b741658d74c35\",\"name\":\"Kids and Family\",\"created_at\":\"2022-07-08T06:41:53.305Z\",\"updated_at\":\"2022-07-08T06:41:53.305Z\",\"__v\":0,\"id\":\"62c7d1b14b3b741658d74c35\"},{\"_id\":\"62c7d1cd4b3b741658d74c38\",\"name\":\"Socially Distant\",\"created_at\":\"2022-07-08T06:42:21.574Z\",\"updated_at\":\"2022-07-08T06:42:21.574Z\",\"__v\":0,\"id\":\"62c7d1cd4b3b741658d74c38\"},{\"_id\":\"62c7d1e34b3b741658d74c3b\",\"name\":\"Off the beaten path\",\"created_at\":\"2022-07-08T06:42:43.814Z\",\"updated_at\":\"2022-07-08T06:42:43.814Z\",\"__v\":0,\"id\":\"62c7d1e34b3b741658d74c3b\"},{\"_id\":\"62c7d1f64b3b741658d74c3e\",\"name\":\"Staycation\",\"created_at\":\"2022-07-08T06:43:02.767Z\",\"updated_at\":\"2022-07-08T06:43:02.767Z\",\"__v\":0,\"id\":\"62c7d1f64b3b741658d74c3e\"},{\"_id\":\"62c7d2024b3b741658d74c41\",\"name\":\"Solo Trevel\",\"created_at\":\"2022-07-08T06:43:14.272Z\",\"updated_at\":\"2022-07-08T06:43:14.272Z\",\"__v\":0,\"id\":\"62c7d2024b3b741658d74c41\"},{\"_id\":\"62c7d20d4b3b741658d74c44\",\"name\":\"Girls Trip\",\"created_at\":\"2022-07-08T06:43:25.788Z\",\"updated_at\":\"2022-07-08T06:43:25.788Z\",\"__v\":0,\"id\":\"62c7d20d4b3b741658d74c44\"},{\"_id\":\"62c7d2174b3b741658d74c47\",\"name\":\"Guys Trip\",\"created_at\":\"2022-07-08T06:43:35.020Z\",\"updated_at\":\"2022-07-08T06:43:35.020Z\",\"__v\":0,\"id\":\"62c7d2174b3b741658d74c47\"},{\"_id\":\"62c7d2234b3b741658d74c4a\",\"name\":\"Culture\",\"created_at\":\"2022-07-08T06:43:47.038Z\",\"updated_at\":\"2022-07-08T06:43:47.038Z\",\"__v\":0,\"id\":\"62c7d2234b3b741658d74c4a\"},{\"_id\":\"62c7d2314b3b741658d74c4d\",\"name\":\"Senior Trevel\",\"created_at\":\"2022-07-08T06:44:01.389Z\",\"updated_at\":\"2022-07-08T06:44:01.389Z\",\"__v\":0,\"id\":\"62c7d2314b3b741658d74c4d\"},{\"_id\":\"62c7d2444b3b741658d74c50\",\"name\":\"Foodie\",\"created_at\":\"2022-07-08T06:44:20.225Z\",\"updated_at\":\"2022-07-08T06:44:20.225Z\",\"__v\":0,\"id\":\"62c7d2444b3b741658d74c50\"},{\"_id\":\"62c7d2504b3b741658d74c53\",\"name\":\"Convention\",\"created_at\":\"2022-07-08T06:44:32.797Z\",\"updated_at\":\"2022-07-08T06:44:32.797Z\",\"__v\":0,\"id\":\"62c7d2504b3b741658d74c53\"},{\"_id\":\"62c7d2744b3b741658d74c56\",\"name\":\"Collage & University\",\"created_at\":\"2022-07-08T06:45:08.444Z\",\"updated_at\":\"2022-07-08T06:45:08.444Z\",\"__v\":0,\"id\":\"62c7d2744b3b741658d74c56\"},{\"_id\":\"62c7d2804b3b741658d74c59\",\"name\":\"Luxury\",\"created_at\":\"2022-07-08T06:45:20.391Z\",\"updated_at\":\"2022-07-08T06:45:20.391Z\",\"__v\":0,\"id\":\"62c7d2804b3b741658d74c59\"},{\"_id\":\"62c7d2954b3b741658d74c5c\",\"name\":\"Music & Theater\",\"created_at\":\"2022-07-08T06:45:41.182Z\",\"updated_at\":\"2022-07-08T06:45:41.182Z\",\"__v\":0,\"id\":\"62c7d2954b3b741658d74c5c\"},{\"_id\":\"62c7d2bd4b3b741658d74c5f\",\"name\":\"Sports\",\"created_at\":\"2022-07-08T06:46:21.346Z\",\"updated_at\":\"2022-07-08T06:46:21.346Z\",\"__v\":0,\"id\":\"62c7d2bd4b3b741658d74c5f\"}]}}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/app/v1/PreferenceController.ts",
    "groupTitle": "User_Auth"
  },
  {
    "type": "post",
    "url": "/api/v1/app/auth/login",
    "title": "USER LOGIN",
    "version": "1.0.0",
    "name": "USER_Login",
    "group": "User_Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Request",
          "content": "{\"username\":\"lakshit1012\",\"password\":\"\"}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\"status\":200,\"statusText\":\"SUCCESS\",\"message\":\"Logged in successfully\",\"data\":{\"user\":{\"otp\":{\"otp\":null,\"is_expired\":false,\"expiration_time\":null,\"is_verified\":true},\"email\":\"lakshit003@yopmal.com\",\"username\":\"lakshit003\",\"first_name\":\"Himans\",\"middle_name\":\"dbrl\",\"profile_image\":null,\"is_profile_completed\":true,\"preferences\":[{\"_id\":\"62c7d1794b3b741658d74c2c\",\"name\":\"Outdoor\",\"id\":\"62c7d1794b3b741658d74c2c\"},{\"_id\":\"62c7d1964b3b741658d74c2f\",\"name\":\"Shopping\",\"id\":\"62c7d1964b3b741658d74c2f\"},{\"_id\":\"62c7d1a14b3b741658d74c32\",\"name\":\"Road Trip\",\"id\":\"62c7d1a14b3b741658d74c32\"}],\"last_name\":\"dbrl\",\"phone\":1234567890,\"date_of_birth\":\"2000-12-12T00:00:00.000Z\",\"is_deleted\":false,\"last_login\":null,\"is_locked\":false,\"_id\":\"62ce5a0a178669b9746f139a\",\"created_at\":\"2022-07-13T05:37:14.306Z\",\"updated_at\":\"2022-07-13T05:40:43.102Z\",\"__v\":1,\"id\":\"62ce5a0a178669b9746f139a\"},\"token\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmNlNWEwYTE3ODY2OWI5NzQ2ZjEzOWEiLCJjcmVhdGVkX2F0IjoiMjAyMi0wNy0xM1QwNTozNzoxNC4zMDZaIiwiYWNjb3VudF9sb2NrZWQiOmZhbHNlLCJpYXQiOjE2NTc2OTEyMjQsImV4cCI6MTY1Nzc5MTIyNH0.wL1v5B1BLhhhy6WkW7KbMGO-qeuU58UUWLuqHwt7RkU\"}}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\"status\":400,\"statusText\":\"VALIDATION_FAILED\",\"message\":\"Validation Failed!\",\"data\":{\"error\":[\"\\\"email\\\" must be a valid email\"]}}",
          "type": "json"
        },
        {
          "title": "Error-Response",
          "content": "{\"status\":400,\"statusText\":\"VALIDATION_FAILED\",\"message\":\"Validation Failed!\",\"data\":{\"error\":[\"\\\"username\\\" is required\"]}}",
          "type": "json"
        },
        {
          "title": "Error-Response",
          "content": "{\"status\":400,\"statusText\":\"BAD_REQUEST\",\"message\":\"You are not a registered user!\",\"data\":{}}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/app/v1/AuthController.ts",
    "groupTitle": "User_Auth"
  },
  {
    "type": "post",
    "url": "/api/v1/app/auth/register",
    "title": "USER REGISTRATION",
    "version": "1.0.0",
    "name": "USER_REGISTRATION",
    "group": "User_Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>lakshit2021</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>lakshit.tyagi@mobilecoderz.com</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<hr>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\"status\":200,\"statusText\":\"SUCCESS\",\"message\":\"Successfully Registered!\",\"data\":{\"otp\":{\"otp\":686,\"is_expired\":false,\"expiration_time\":1657093914240,\"is_verified\":false},\"email\":\"lakshit1012@yopmal.com\",\"username\":\"lakshit1012\",\"first_name\":null,\"middle_name\":null,\"profile_image\":null,\"is_profile_completed\":false,\"last_name\":null,\"phone\":null,\"date_of_birth\":null,\"is_deleted\":false,\"is_locked\":false,\"_id\":\"62c51f9dd9f7c73adce23799\",\"created_at\":\"2022-07-06T05:37:33.034Z\",\"updated_at\":\"2022-07-06T07:50:54.342Z\",\"__v\":0,\"id\":\"62c51f9dd9f7c73adce23799\"}}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\"status\":400,\"statusText\":\"VALIDATION_FAILED\",\"message\":\"Validation Failed!\",\"data\":{\"error\":[\"\\\"username\\\" is required\"]}}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "{\"status\":400,\"statusText\":\"VALIDATION_FAILED\",\"message\":\"Validation Failed!\",\"data\":{\"error\":[\"\\\"email\\\" is required\"]}}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "{\"status\":409,\"statusText\":\"CONFLICT\",\"message\":\"Username not available!\",\"data\":{}}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "{\"status\":409,\"statusText\":\"CONFLICT\",\"message\":\"Username not available!\",\"data\":{}}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/app/v1/AuthController.ts",
    "groupTitle": "User_Auth"
  },
  {
    "type": "Post",
    "url": "/api/v1/app/preferences/unfollow-users",
    "title": "Un Follow User",
    "version": "1.0.0",
    "name": "Un_Follow_Preferred_User",
    "group": "User_Auth",
    "parameter": {
      "examples": [
        {
          "title": "Request",
          "content": "{\"interests\": \"62c574c5c6bc13245c35c037\"}",
          "type": "json"
        }
      ],
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "interests",
            "description": "<p>62c574c5c6bc13245c35c037</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Error-Response",
          "content": "{\"status\":200,\"statusText\":\"SUCCESS\",\"message\":\"User un-followed successfully!\",\"data\":{}}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/app/v1/PreferenceController.ts",
    "groupTitle": "User_Auth"
  },
  {
    "type": "post",
    "url": "/api/v1/app/auth/unlock-account",
    "title": "Unlock Account",
    "version": "1.0.0",
    "name": "Unlock_Account",
    "group": "User_Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "otp",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Request",
          "content": "{\"otp\": \"0000\", \"email\":\"Something@something.com\"}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer token</p>"
          }
        ]
      }
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\"status\":400,\"statusText\":\"INVALID_OTP\",\"message\":\"Invalid Otp!\",\"data\":{}}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "{\"status\":400,\"statusText\":\"EXPIRED_OTP\",\"message\":\" Otp Expired!\",\"data\":{}}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\"status\":200,\"statusText\":\"SUCCESS\",\"message\":\"OTP verified successfully!\",\"data\":{}}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/app/v1/AuthController.ts",
    "groupTitle": "User_Auth"
  },
  {
    "type": "post",
    "url": "/api/v1/app/auth/unlock-account-email",
    "title": "Unlock Account Email",
    "version": "1.0.0",
    "name": "Unlock_Account_Email",
    "group": "User_Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "email",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Request",
          "content": "{\"email\": \"lakshit003@yopmal.com\"}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer token</p>"
          }
        ]
      }
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\"status\":400,\"statusText\":\"VALIDATION_FAILED\",\"message\":\"Validation Failed!\",\"data\":{\"error\":[\"\\\"email\\\" must be a valid email\"]}}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\"status\":200,\"statusText\":\"SUCCESS\",\"message\":\"Otp sent to the email address!\",\"data\":{\"data\":{\"otp\":2988,\"is_expired\":false,\"expiration_time\":1657696029812,\"is_verified\":false}}}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/app/v1/AuthController.ts",
    "groupTitle": "User_Auth"
  }
] });
